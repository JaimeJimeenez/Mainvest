import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM

def predictAssetValues(data):
    dataset = data['Adj Close'].values.reshape(-1, 1)
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(dataset)
    x, y = [], []

    for i in range(60, len(scaled_data)):
        x.append(scaled_data[i - 60: i, 0])
        y.append(scaled_data[i, 0])
    x, y = np.array(x), np.array(y)

    X_train, X_test, Y_train, Y_test = train_test_split(x, y, test_size=0.2, random_state=42)
    X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))
    X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
    
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], 1)))
    model.add(LSTM(units=50, return_sequences=False))
    model.add(Dense(units=25))
    model.add(Dense(units=1))
    
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X_train, Y_train, epochs=10, batch_size=32, validation_data=(X_test, Y_test))
    
    # Obtener fechas correspondientes al conjunto de prueba
    test_dates = data.iloc[len(data) - len(X_test):].index
    
    # Sumar un año a cada fecha en la columna 'Date'
    test_dates_plus_one_year = test_dates + pd.DateOffset(years=1)
    
    predictions = model.predict(X_test)
    predictions = scaler.inverse_transform(predictions)
    
    # Crear DataFrame comparison con las columnas 'Date', 'Actual', y 'Predicted'
    comparison = pd.DataFrame({'Date': test_dates_plus_one_year,
                               'Actual': scaler.inverse_transform(Y_test.reshape(-1, 1)).flatten(),
                               'Predicted': predictions.flatten()})
    
    data_predicted_dict = {        
        'columns': comparison.columns.tolist(),
        'index': comparison.index.tolist(),
        'data': comparison.values.tolist()
    }
    
    return data_predicted_dict
