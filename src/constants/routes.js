import { AUTH_API_BASE_URL } from "@constants";

export const CURD_USER = `${AUTH_API_BASE_URL}/register`;
export const REGISTER_USER = `${AUTH_API_BASE_URL}/users/register`;

export const USER_LOGIN = `${AUTH_API_BASE_URL}/auth/login`;
export const CHECK_IS_USER_ACTIVE = `${AUTH_API_BASE_URL}/auth/isactive`;

export const GENERATE_ASSESSMENT_QUESTIONS = `${AUTH_API_BASE_URL}/api/questions/generate`;

// Assessment endpoints
export const GET_ASSESSMENTS = `${AUTH_API_BASE_URL}/assessments`;
export const GET_ASSESSMENT_BY_ID = `${AUTH_API_BASE_URL}/assessments/id`;
export const CREATE_ASSESSMENT = `${AUTH_API_BASE_URL}/assessments`;
export const UPDATE_ASSESSMENT = `${AUTH_API_BASE_URL}/assessments/:id`;
export const DELETE_ASSESSMENT = `${AUTH_API_BASE_URL}/assessments/:id`;
export const SEARCH_ASSESSMENTS = `${AUTH_API_BASE_URL}/assessments/search`;
export const GET_POPULAR_ASSESSMENTS = `${AUTH_API_BASE_URL}/assessments/popular`;
export const GET_ASSESSMENTS_BY_SKILLS = `${AUTH_API_BASE_URL}/assessments/skills`;

// Assessment Attempt endpoints
export const START_ASSESSMENT = `${AUTH_API_BASE_URL}/assessment-attempts/start`;
export const SUBMIT_ANSWER = `${AUTH_API_BASE_URL}/assessment-attempts/attempt/answer`;
export const COMPLETE_ASSESSMENT = `${AUTH_API_BASE_URL}/assessment-attempts/complete`;
export const TIMEOUT_ASSESSMENT = `${AUTH_API_BASE_URL}/assessment-attempts/:attemptId/timeout`;
export const UPDATE_TIME = `${AUTH_API_BASE_URL}/assessment-attempts/time`;
export const TOGGLE_BOOKMARK = `${AUTH_API_BASE_URL}/assessment-attempts/:attemptId/bookmark/:questionId`;
export const TOGGLE_FLAG = `${AUTH_API_BASE_URL}/assessment-attempts/:attemptId/flag/:questionId`;
export const GET_USER_ATTEMPTS = `${AUTH_API_BASE_URL}/assessment-attempts/user/:userId`;
export const GET_ATTEMPT_DETAILS = `${AUTH_API_BASE_URL}/assessment-attempts/:attemptId`;
export const GET_ASSESSMENT_ANALYTICS = `${AUTH_API_BASE_URL}/assessment-attempts/analytics/assessment/:assessmentId`;

// Question endpoints
export const SAVE_QUESTIONS_TO_ASSESSMENT = `${AUTH_API_BASE_URL}/assessments`;
export const GET_QUESTIONS_BY_ASSESSMENT = `${AUTH_API_BASE_URL}/questions/assessment/:assessmentId`;
export const UPDATE_QUESTION = `${AUTH_API_BASE_URL}/questions/:questionId`;
export const DELETE_QUESTION = `${AUTH_API_BASE_URL}/questions/:questionId`;
export const REORDER_QUESTIONS = `${AUTH_API_BASE_URL}/questions/assessment/:assessmentId/reorder`;

// Welcome API
export const GET_WELCOME_DATA = `${AUTH_API_BASE_URL}/welcome`;
