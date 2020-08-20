import axios from "axios";

export const LOGIN_URL = "/user/login";
export const REGISTER_URL = "/user/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "/user/getUser";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(values) {
  return axios.post(REGISTER_URL, values);
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
