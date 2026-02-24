import {
  CREATE_ASSESSMENT,
  createDynamicSlice,
  DELETE_ASSESSMENT,
  GET_ASSESSMENT_BY_ID,
  GET_ASSESSMENTS,
  GET_POPULAR_ASSESSMENTS,
  SEARCH_ASSESSMENTS,
  UPDATE_ASSESSMENT,
} from "@constants";

const assessmentSliceConfig = {
  name: "assessments",
  initialState: {
    assessmentsData: [],
    currentAssessment: [],
    popularAssessments: [],
    currentAssessmentId: [],
    searchResults: [],
    filters: {
      status: null,
      difficulty: [],
      skills: [],
      questionTypes: [],
      duration: [0],
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    loading: false,
    error: null,
  },
  asyncThunks: [
    {
      name: "getAssessments",
      method: "get",
      url: GET_ASSESSMENTS,
      storeKey: "assessmentsData",
      paginated: true,
    },
    {
      name: "getAssessmentById",
      method: "get",
      url: GET_ASSESSMENT_BY_ID,
      storeKey: "currentAssessmentId",
    },
    {
      name: "createAssessment",
      method: "post",
      url: CREATE_ASSESSMENT,
      storeKey: "currentAssessment",
    },
    {
      name: "updateAssessment",
      method: "patch",
      url: UPDATE_ASSESSMENT,
      storeKey: "currentAssessment",
    },
    {
      name: "deleteAssessment",
      method: "delete",
      url: DELETE_ASSESSMENT,
      storeKey: null,
    },
    {
      name: "searchAssessments",
      method: "get",
      url: SEARCH_ASSESSMENTS,
      storeKey: "searchResults",
    },
    {
      name: "getPopularAssessments",
      method: "get",
      url: GET_POPULAR_ASSESSMENTS,
      storeKey: "popularAssessments",
    },
  ],
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        status: null,
        difficulty: null,
        skills: [],
        questionTypes: [],
      };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearCurrentAssessment: (state) => {
      state.currentAssessment = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder, thunks) => {},
};

const { reducer, thunks, actions } = createDynamicSlice(assessmentSliceConfig);

export const {
  getAssessments,
  getAssessmentById,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  searchAssessments,
  getPopularAssessments,
} = thunks;

export const {
  setFilters,
  resetFilters,
  setPagination,
  clearCurrentAssessment,
  clearSearchResults,
  setLoading,
  setError,
} = actions;

export default reducer;
