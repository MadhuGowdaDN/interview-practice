import { createDynamicSlice, GET_WELCOME_DATA } from "@constants";

const welcomeSliceConfig = {
  name: "welcome",
  initialState: {},
  asyncThunks: [
    {
      name: "fetchWelcomeData",
      method: "get",
      url: GET_WELCOME_DATA,
      storeKey: "welcomeData",
      loadingKey: "fetchWelcomeData",
      errorKey: "fetchWelcomeData",
      transformResponse: (response) => response.data || response,
    },
  ],
  reducers: {
    clearWelcomeData: (state) => {
      if (state.data?.welcomeData) {
        delete state.data.welcomeData;
      }
    },
  },
};

const { reducer, thunks, actions } = createDynamicSlice(welcomeSliceConfig);

export const { fetchWelcomeData } = thunks;
export const { clearWelcomeData } = actions;
export default reducer;
