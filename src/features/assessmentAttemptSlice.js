import {
  COMPLETE_ASSESSMENT,
  createDynamicSlice,
  GET_ASSESSMENT_ANALYTICS,
  GET_ATTEMPT_DETAILS,
  GET_USER_ATTEMPTS,
  START_ASSESSMENT,
  SUBMIT_ANSWER,
  TIMEOUT_ASSESSMENT,
  TOGGLE_BOOKMARK,
  TOGGLE_FLAG,
  UPDATE_TIME,
} from "@constants";

const assessmentAttemptSlice = {
  name: "assessmentAttempt",
  initialState: {
    currentAttempt: null,
    userAttempts: [],
    attemptDetails: null,
    assessmentAnalytics: null,
    loading: false,
    submitLoading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    stats: {
      totalAttempts: 0,
      averageScore: 0,
      completionRate: 0,
    },
  },
  asyncThunks: [
    {
      name: "startAssessment",
      method: "post",
      url: START_ASSESSMENT,
      storeKey: "currentAttempt",
    },
    {
      name: "submitAnswer",
      method: "post",
      url: SUBMIT_ANSWER,
      loadingKey:"submitLoading",
      storeKey: "currentAttempt",
    },
    {
      name: "completeAssessment",
      method: "post",
      url: COMPLETE_ASSESSMENT,
      storeKey: "currentAttempt",
    },
    {
      name: "timeoutAssessment",
      method: "post",
      url: TIMEOUT_ASSESSMENT,
      storeKey: "currentAttempt",
    },
    {
      name: "updateTimeSpent",
      method: "post",
      url: UPDATE_TIME,
      storeKey: "currentAttempt",
    },
    {
      name: "toggleBookmark",
      method: "post",
      url: TOGGLE_BOOKMARK,
      storeKey: "currentAttempt",
    },
    {
      name: "toggleFlag",
      method: "post",
      url: TOGGLE_FLAG,
      storeKey: "currentAttempt",
    },
    {
      name: "getUserAttempts",
      method: "get",
      url: GET_USER_ATTEMPTS,
      storeKey: "userAttempts",
      paginated: true,
    },
    {
      name: "getAttemptDetails",
      method: "get",
      url: GET_ATTEMPT_DETAILS,
      storeKey: "attemptDetails",
    },
    {
      name: "getAssessmentAnalytics",
      method: "get",
      url: GET_ASSESSMENT_ANALYTICS,
      storeKey: "assessmentAnalytics",
    },
  ],
  reducers: {
    clearCurrentAttempt: (state) => {
      state.currentAttempt = null;
    },
    clearAttemptDetails: (state) => {
      state.attemptDetails = null;
    },
    clearAnalytics: (state) => {
      state.assessmentAnalytics = null;
    },
    setAttemptPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    updateLocalAnswer: (state, action) => {
      if (state.currentAttempt) {
        const { questionId, answer } = action.payload;
        const existingAnswerIndex = state.currentAttempt.answers?.findIndex(
          (a) => a.questionId === questionId,
        );

        if (existingAnswerIndex >= 0) {
          state.currentAttempt.answers[existingAnswerIndex].userAnswer = answer;
        } else {
          state.currentAttempt.answers = [
            ...(state.currentAttempt.answers || []),
            { questionId, userAnswer: answer, isCorrect: false },
          ];
        }
      }
    },
    updateLocalBookmark: (state, action) => {
      if (state.currentAttempt) {
        const { questionId, bookmarked } = action.payload;
        if (bookmarked) {
          state.currentAttempt.bookmarkedQuestions = [
            ...(state.currentAttempt.bookmarkedQuestions || []),
            questionId,
          ];
        } else {
          state.currentAttempt.bookmarkedQuestions =
            state.currentAttempt.bookmarkedQuestions?.filter(
              (id) => id !== questionId,
            );
        }
      }
    },
    updateLocalFlag: (state, action) => {
      if (state.currentAttempt) {
        const { questionId, flagged } = action.payload;
        if (flagged) {
          state.currentAttempt.flaggedQuestions = [
            ...(state.currentAttempt.flaggedQuestions || []),
            questionId,
          ];
        } else {
          state.currentAttempt.flaggedQuestions =
            state.currentAttempt.flaggedQuestions?.filter(
              (id) => id !== questionId,
            );
        }
      }
    },
    updateLocalTimeSpent: (state, action) => {
      if (state.currentAttempt) {
        state.currentAttempt.timeSpent = action.payload;
      }
    },
  },
  extraReducers: (builder, thunks) => {},
};

const { reducer, thunks, actions } = createDynamicSlice(assessmentAttemptSlice);

export const {
  startAssessment,
  submitAnswer,
  completeAssessment,
  timeoutAssessment,
  updateTimeSpent,
  toggleBookmark,
  toggleFlag,
  getUserAttempts,
  getAttemptDetails,
  getAssessmentAnalytics,
} = thunks;

export const {
  clearCurrentAttempt,
  clearAttemptDetails,
  clearAnalytics,
  setAttemptPagination,
  updateLocalAnswer,
  updateLocalBookmark,
  updateLocalFlag,
  updateLocalTimeSpent,
} = actions;

export default reducer;
