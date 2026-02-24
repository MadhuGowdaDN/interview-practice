import {
  createDynamicSlice,
  DELETE_QUESTION,
  GENERATE_ASSESSMENT_QUESTIONS,
  GET_QUESTIONS_BY_ASSESSMENT,
  REORDER_QUESTIONS,
  SAVE_QUESTIONS_TO_ASSESSMENT,
  UPDATE_QUESTION,
} from "@constants";

const assessmentQuestionSliceConfig = {
  name: "assessmentQuestion",
  initialState: {
    generateQuestionsData: [],
    assessmentQuestions: [],
    currentQuestion: null,
    filters: {
      skill: null,
      difficulty: null,
      type: null,
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
    loading: false,
    error: null,
  },
  asyncThunks: [
    {
      name: "generateAssessmentQuestions",
      method: "post",
      url: GENERATE_ASSESSMENT_QUESTIONS,
      storeKey: "generateQuestionsData",
    },
    {
      name: "saveQuestionsToAssessment",
      method: "post",
      url: SAVE_QUESTIONS_TO_ASSESSMENT,
      storeKey: "assessmentQuestions",
    },
    {
      name: "getQuestionsByAssessment",
      method: "get",
      url: GET_QUESTIONS_BY_ASSESSMENT,
      storeKey: "assessmentQuestions",
    },
    {
      name: "updateQuestion",
      method: "patch",
      url: UPDATE_QUESTION,
      storeKey: "currentQuestion",
    },
    {
      name: "deleteQuestion",
      method: "delete",
      url: DELETE_QUESTION,
      storeKey: null,
    },
    {
      name: "reorderQuestions",
      method: "post",
      url: REORDER_QUESTIONS,
      storeKey: "assessmentQuestions",
    },
  ],
  reducers: {
    // setFilters: (state, action) => {
    //   state.filters = { ...state.filters, ...action.payload };
    // },
    // resetFilters: (state) => {
    //   state.filters = {
    //     skill: null,
    //     difficulty: null,
    //     type: null,
    //   };
    // },
    // setPagination: (state, action) => {
    //   state.pagination = { ...state.pagination, ...action.payload };
    // },
    clearGeneratedQuestions: (state) => {
      state.generateQuestionsData = [];
    },
    clearAssessmentQuestions: (state) => {
      state.assessmentQuestions = [];
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    updateLocalQuestion: (state, action) => {
      const updatedQuestion = action.payload;
      state.assessmentQuestions = state.assessmentQuestions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q,
      );
    },
    addLocalQuestion: (state, action) => {
      state.assessmentQuestions = [
        ...state.assessmentQuestions,
        action.payload,
      ];
    },
    removeLocalQuestion: (state, action) => {
      state.assessmentQuestions = state.assessmentQuestions.filter(
        (q) => q.id !== action.payload,
      );
    },
  },
  extraReducers: (builder, thunks) => {},
};

const { reducer, thunks, actions } = createDynamicSlice(
  assessmentQuestionSliceConfig,
);

export const {
  generateAssessmentQuestions,
  saveQuestionsToAssessment,
  getQuestionsByAssessment,
  updateQuestion,
  deleteQuestion,
  reorderQuestions,
} = thunks;

export const {
  // setFilters,
  // resetFilters,
  // setPagination,
  clearGeneratedQuestions,
  clearAssessmentQuestions,
  setCurrentQuestion,
  updateLocalQuestion,
  addLocalQuestion,
  removeLocalQuestion,
} = actions;

export default reducer;
