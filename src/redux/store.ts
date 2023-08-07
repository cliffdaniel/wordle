import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './themeSlice';
import wordsReducer from './wordsSlice';
import instructionsReducer from './instructionsSlice';
import intervalReducer from './intervalSlice';

const themePersistConfig = {
  key: 'theme',
  storage,
};

const wordsPersistConfig = {
  key: 'words',
  storage,
};

const instructionsPersistConfig = {
  key: 'modalInstructions',
  storage,
}

const intervalPersistConfig = {
  key: 'interval',
  storage,
}

const rootReducer = {
  theme: persistReducer(themePersistConfig, themeReducer),
  words: persistReducer(wordsPersistConfig, wordsReducer),
  instructions: persistReducer(instructionsPersistConfig, instructionsReducer),
  interval: persistReducer(intervalPersistConfig, intervalReducer),
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;
