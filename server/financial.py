import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
from datetime import datetime
from pandas_datareader import data as pdr
from prediction import predictAssetValues

app = Flask(__name__)
os.environ['FLASK_RUN_EXTRA_FILES'] = ''

cors = CORS(app, resources={r"/financial_assets": {"origins": "http://localhost:4200"}})
CORS(app, supports_credentials=True, methods=["GET", "POST", "PUT", "DELETE"], allow_headers=["*"])

@app.route('/financial_assets', methods=['GET'])
def getFinancialAsset():
    yf.pdr_override()
    asset = request.args.getlist('asset')
    start_date = request.args.get('start')
    end_date = request.args.get('end')

    asset = asset[0].split(',')

    try:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')

        data = pdr.get_data_yahoo(asset, start_date, end_date)
        data = data.dropna()

        data_dict = {
            'columns': data.columns.tolist(),
            'index': data.index.tolist(),
            'data': data.values.tolist(),
        }

        return jsonify({'data': data_dict})

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/prediction', methods=['GET'])
def getPrediction():
    yf.pdr_override()
    asset = request.args.getlist('asset')
    start_date = request.args.get('start')
    end_date = request.args.get('end')

    asset = asset[0].split(',')

    try:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')

        data = pdr.get_data_yahoo(asset, start_date, end_date)
        data = data.dropna()
        data_predicted_dict = predictAssetValues(data)

        return jsonify({'data': data_predicted_dict})

    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(debug=False)
