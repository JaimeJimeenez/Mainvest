import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Dropout
from finta import TA

def get_additional_features(data):
    data['RSI'] = TA.RSI(data)
    data['MACD'] = TA.MACD(data)['MACD']
    data['STOCHD'] = TA.STOCHD(data)
    data['ADX'] = TA.ADX(data)
    data['ATR'] = TA.ATR(data)
    data['BB_UPPER'] = TA.BBANDS(data)['BB_UPPER']
    data['BB_MIDDLE'] = TA.BBANDS(data)['BB_MIDDLE']
    data['BB_LOWER'] = TA.BBANDS(data)['BB_LOWER']
    data['MFI'] = TA.MFI(data)
    data['ROC'] = TA.ROC(data)
    data['CCI'] = TA.CCI(data)
    data['CMO'] = TA.CMO(data)
    data['TRIX'] = TA.TRIX(data)
    data['EMA'] = TA.EMA(data)
    data['SMA'] = TA.SMA(data)
    
    print(data)

    return data


def predictAssetValues(data):
    data = get_additional_features(data)
    data = data.dropna()
    print(data.columns)
    features = ['Open', 'Adj Close', 'High', 'Volume', 'RSI', 'MACD', 'STOCHD', 'ADX', 'ATR', 'BB_UPPER', 'BB_MIDDLE', 'BB_LOWER','MFI', 'ROC', 'CCI', 'CMO', 'TRIX', 'EMA', 'SMA']
    
    dataset = data[features].values
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(dataset)
    
    x, y = [], []

    for i in range(60, len(scaled_data)):
        x.append(scaled_data[i - 60: i, :])
        y.append(scaled_data[i, [0, 1]])

    x, y = np.array(x), np.array(y)

    X_train, X_test, Y_train, Y_test = train_test_split(x, y, test_size=0.2, random_state=42)
    
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50, return_sequences=False))
    model.add(Dropout(0.2))
    model.add(Dense(units=2)) 
    
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X_train, Y_train, epochs=15, batch_size=32, validation_data=(X_test, Y_test))
    
    test_dates = data.iloc[len(data) - len(X_test):].index
    test_dates_plus_one_year = test_dates + pd.DateOffset(years=1)
    
    predictions = model.predict(X_test)    
    predictions = scaler.inverse_transform(np.concatenate((predictions, np.zeros((predictions.shape[0], len(features) - 2))), axis=1))[:, :2]

    Y_test_inverse = scaler.inverse_transform(np.concatenate((Y_test, np.zeros((Y_test.shape[0], len(features) - 2))), axis=1))[:, :2]

    comparison = pd.DataFrame({
        'Date': test_dates_plus_one_year,
        'Actual_Open': Y_test_inverse[:, 0],
        'Predicted_Open': predictions[:, 0],
        'Actual_Adj_Close': Y_test_inverse[:, 1],
        'Predicted_Adj_Close': predictions[:, 1]
    })

    data_predicted_dict = {
        'columns': comparison.columns.tolist(),
        'index': comparison.index.tolist(),
        'data': comparison.values.tolist()
    }
    
    return data_predicted_dict
