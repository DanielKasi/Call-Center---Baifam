import { combineReducers } from "@reduxjs/toolkit";

export function createReducerManager(initialReducers: any) {
    const reducers = { ...initialReducers };
    let combinedReducer = combineReducers(reducers);

    function updateCombinedReducer() {
        combinedReducer = combineReducers(reducers);
    }

    return {
        getReducerMap: () => reducers,
        reduce: (state: any, action: any) => combinedReducer(state, action),
        add: (key: string, reducer: any) => {
            if (!reducers[key]) {
                reducers[key] = reducer;
                updateCombinedReducer();
            }
        },
        remove: (key: string) => {
            // Only remove if not a core/static reducer
            if (reducers[key] && !initialReducers[key]) {
                delete reducers[key];
                updateCombinedReducer();
            }
        },
    };
}
