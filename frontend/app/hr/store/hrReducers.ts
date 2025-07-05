

import { authReducer } from "./auth/reducer";
import { miscReducer } from "./miscellaneous/reducer";

const hrReducers = {
    hrAuth: authReducer,
    hrMiscellaneous: miscReducer,
};

export default hrReducers;
