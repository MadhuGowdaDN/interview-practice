import {
  CHECK_IS_USER_ACTIVE,
  createDynamicSlice,
  CURD_USER,
  REGISTER_USER,
  USER_LOGIN,
} from "@constants";

const userSliceConfig = {
  name: "user",
  initialState: {
    filters: {},
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
  },
  asyncThunks: [
    {
      name: "fetchUsers",
      method: "get",
      url: `${CURD_USER}/users`,
      storeKey: "users",
      loadingKey: "fetchUsers",
      errorKey: "fetchUsers",
      transformResponse: (response) => response.users || response,
    },
    {
      name: "fetchUserById",
      method: "get",
      url: `${CURD_USER}/users/:id`,
      storeKey: "currentUser",
      loadingKey: "fetchUser",
      errorKey: "fetchUser",
      transformResponse: (response) => response.user || response,
    },
    {
      name: "loginUser",
      method: "post",
      url: USER_LOGIN,
    },
    {
      name: "createUser",
      method: "post",
      url: REGISTER_USER,
    },
    {
      name: "updateUser",
      method: "put",
      url: `${CURD_USER}/users/:id`,
      loadingKey: "updateUser",
      errorKey: "updateUser",
      successKey: "updateUser",
    },
    {
      name: "deleteUser",
      method: "delete",
      url: `${CURD_USER}/users/:id`,
      loadingKey: "deleteUser",
      errorKey: "deleteUser",
      successKey: "deleteUser",
    },
    {
      name: "chekIsUserActive",
      method: "get",
      url: CHECK_IS_USER_ACTIVE,
    },
  ],
  reducers: {
    // setFilters: (state, action) => {
    //   state.filters = { ...state.filters, ...action.payload };
    // },
    // setPagination: (state, action) => {
    //   state.pagination = { ...state.pagination, ...action.payload };
    // },
    clearCurrentUser: (state) => {
      delete state.data.currentUser;
    },
  },
};

const { reducer, thunks, actions } = createDynamicSlice(userSliceConfig);

export const {
  fetchUsers,
  fetchUserById,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
  chekIsUserActive,
} = thunks;
export const { clearCurrentUser } = actions;
export default reducer;
