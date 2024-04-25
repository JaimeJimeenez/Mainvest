import os
from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore

import yfinance as yf # type: ignore
from pandas_datareader import data as pdr # type: ignore

from datetime import datetime


app = Flask(__name__)
os.environ['FLASK_RUN_EXTRA_FILES'] = ''

cors = CORS(app, resources={r"/financial_assets": {"origins": "http://localhost:4200"}})
CORS(app, supports_credentials=True, methods=["GET", "POST", "PUT", "DELETE"], allow_headers=["*"])

@app.route('/financial/assets', methods=['GET'])
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
    
if __name__ == '__main__':
    app.run(debug=False)