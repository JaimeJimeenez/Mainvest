import pandas as pd  # type: ignore
import numpy as np # type: ignore
import tensorflow as tf # type: ignore
from sklearn.model_selection import train_test_split # type: ignore
from sklearn.preprocessing import MinMaxScaler # type: ignore
from tensorflow.keras.models import Sequential # type: ignore
from tensorflow.keras.layers import BatchNormalization # type: ignore
from tensorflow.keras.layers import Dense, LSTM, Dropout # type: ignore
from tensorflow.keras.regularizers import l2 # type: ignore
from finta import TA # type: ignore

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
    data['SSMA'] = TA.SSMA(data)
    data['TEMA'] = TA.TEMA(data)
    data['DEMA'] = TA.DEMA(data)
    data['TRIMA'] = TA.TRIMA(data)
    data['VAMA'] = TA.VAMA(data)
    data['ER'] = TA.ER(data)
    data['STC'] = TA.STC(data)
    data['MSD'] = TA.MSD(data)
    data['VFI'] = TA.VFI(data)
    data['FVE'] = TA.FVE(data)
    data['VPT'] = TA.VPT(data)
    data['APZ_UPPER'] = TA.APZ(data)['UPPER']
    data['APZ_LOWER'] = TA.APZ(data)['LOWER']
    data['CHANDELIER_SHORT'] = TA.CHANDELIER(data)['Short.']
    data['CHANDELIER_LONG'] = TA.CHANDELIER(data)['Long.']
    data['CMO'] = TA.CMO(data)
    data['BASPN_Buy.'] = TA.BASPN(data)['Buy.']
    data['BASPN_Sell.'] = TA.BASPN(data)['Sell.']
    data['BASP_Buy.'] = TA.BASP(data)['Buy.']
    data['BASP_Sell.'] = TA.BASP(data)['Sell.']
    data['COPP'] = TA.COPP(data)
    data['EMV'] = TA.EMV(data)
    data['EBBP_BULL.'] = TA.EBBP(data)['Bull.']
    data['EBBP_BEAR.'] = TA.EBBP(data)['Bear.']
    data['EFI'] = TA.EFI(data)
    data['PZO'] = TA.PZO(data)
    data['VZO'] = TA.VZO(data)
    data['WOBV'] = TA.WOBV(data)
    data['OBV'] = TA.OBV(data)
    data['CHAIKIN'] = TA.CHAIKIN(data)
    data['ADL'] = TA.ADL(data)
    data['TP'] = TA.TP(data)
    data['TSI_TSI'] = TA.TSI(data)['TSI']
    data['TSI_SIGNAL'] = TA.TSI(data)['signal']
    data['KST_KST'] = TA.KST(data)['KST']
    data['KST_SIGNAL'] = TA.KST(data)['signal']
    data['VORTEX_VIM'] = TA.VORTEX(data)['VIm']
    data['VORTEX_VIP'] = TA.VORTEX(data)['VIp']
    data['MI'] = TA.MI(data)
    data['AO'] = TA.AO(data)
    data['UO'] = TA.UO(data)
    data['WILLIAMS'] = TA.WILLIAMS(data)
    return data

def predictAssetValues(data):
    data = get_additional_features(data)
    data = data.dropna()
    features = list(data.columns)
    print(features)
    dataset = data[features].values
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(dataset)
    
    x, y = [], []

    for i in range(400, len(scaled_data)):
        x.append(scaled_data[i - 90: i, :])
        y.append(scaled_data[i, [0, 1, 2, 3]])

    x, y = np.array(x), np.array(y)

    X_train, X_test, Y_train, Y_test = train_test_split(x, y, test_size=0.2, random_state=42)
    
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
    model.add(BatchNormalization())
    model.add(Dropout(0.2))
    model.add(LSTM(units=50, return_sequences=True))
    model.add(BatchNormalization())
    model.add(Dropout(0.2))
    model.add(LSTM(units=50, return_sequences=False)) 
    model.add(BatchNormalization())
    model.add(Dropout(0.2))
    model.add(Dense(units=4, kernel_regularizer=l2(0.01)))
    
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X_train, Y_train, epochs=150, batch_size=64, validation_data=(X_test, Y_test))
    
    test_dates = data.iloc[len(data) - len(X_test):].index
    test_dates_plus_one_year = test_dates + pd.DateOffset(years=1)
    
    predictions = model.predict(X_test)    
    predictions = scaler.inverse_transform(np.concatenate((predictions, np.zeros((predictions.shape[0], len(features) - 4))), axis=1))[:, :4]

    predicted = pd.DataFrame({
        'time': test_dates_plus_one_year,
        'open': predictions[:, 0],
        'high': predictions[:, 1],
        'low': predictions[:, 2],
        'close': predictions[:, 3]
    })
    predicted['time'] = predicted['time'].apply(lambda x: x.strftime('%Y-%m-%d'))
    
    dict_values : dict = predicted.to_dict('records')
    
    data_predicted_dict = {
        'data': dict_values
    }
    
    return data_predicted_dict