// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware, { Task } from "redux-saga";
import { Store } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { createWrapper, MakeStore, Context } from "next-redux-wrapper";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import rootReducer, { RootState } from "@/store/rootReducer";
import rootSaga from "@/store/rootSaga";
import { createReducerManager } from "@/store/reducerManager";
import { authReducer } from "./auth/reducer";
import { miscReducer } from "./miscellaneous/reducer";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig: PersistConfig<RootState | Record<string, any>> = {
  key: "root",
  storage,
  version: 1,
  blacklist: [], // We can define the slices to blacklist here,
  migrate: async (state, currentVersion) => {
    if (!state || state._persist.version !== currentVersion) {
      return undefined
    }
    return state
  }
};

// Extend Redux Store to include sagaTask for SSR
export interface AppStore extends Store<RootState> {
  sagaTask?: Task;
}

// Define type for dispatch
export type AppDispatch = ReturnType<typeof configureAppStore>["dispatch"];

// Configure the store
export const configureAppStore = () => {
  // Create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  const staticReducers = {
    auth: authReducer,
    miscellaneous: miscReducer
  };

  const reducerManager = createReducerManager(staticReducers);

  const persistedReducer = persistReducer(persistConfig, reducerManager.reduce);

  // Configure the store
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            REHYDRATE,
          ],
        },
      }).concat(sagaMiddleware),
  });

  // Attach reducerManager to store for dynamic injection
  (store as any).reducerManager = reducerManager;

  // Run the root saga
  (store as unknown as AppStore).sagaTask = sagaMiddleware.run(rootSaga);

  store.subscribe(() => {
    const state = store.getState();
    console.log("\n\n Current state : ", state)
  })

  return store;
};

// MakeStore function for next-redux-wrapper
const makeStore: MakeStore<ReturnType<typeof configureAppStore>> = (_: Context) =>
  configureAppStore();

// Export the Next.js wrapper
export const wrapper = createWrapper<ReturnType<typeof configureAppStore>>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export const store = configureAppStore();
export const persistor = persistStore(store);
