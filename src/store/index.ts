import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  candlestickChartReducer,
  converterReducer,
  exchangeRatesReducer,
  themeReducer,
} from './slices';

const rootReducer = combineReducers({
  exchangeRates: exchangeRatesReducer,
  theme: themeReducer,
  converter: converterReducer,
  candlestickChart: candlestickChartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['exchangeRates', 'converter'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
