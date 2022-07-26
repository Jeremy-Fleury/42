import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
	key: "root",
	storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools());

export const persistor = persistStore(store);
