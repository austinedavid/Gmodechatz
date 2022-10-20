import { configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from '../slice/userslice'
import friendReducer from '../slice/selected'




import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
 } from 'redux-persist'
 import storage from 'redux-persist/lib/storage'
 

 const persistConfig = {
   key: 'root',
   version: 1,
   storage,
 }

 const rootReducer = combineReducers({currentUser: userReducer, friend: friendReducer})
  
  
 const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
   
})

export const persistor = persistStore(store)