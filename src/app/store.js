import { configureStore } from "@reduxjs/toolkit";
import assessmentAttemptReducer from "../features/assessmentAttemptSlice";
import assessmentQuestionReducer from "../features/assessmentQuestionSlice";
import assessmentReducer from "../features/assessmentSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    assessmentQuestion: assessmentQuestionReducer,
    assessmentAttempt: assessmentAttemptReducer,
    assessments: assessmentReducer,
    // other reducers...
  },
});

export default store;
