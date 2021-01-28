import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import favPlacesReducer from './reducers/favPlaces';

const configPersist = {
  key: 'root',
  storage: AsyncStorage,
};

const reducerPersist = persistReducer(configPersist, favPlacesReducer);

export const Store = createStore(reducerPersist);
export const Persistor = persistStore(Store);