import { post } from "axios";
import getFormData from "../utils/objToFormData";

const BASE_URL = "https://cifo.comparteridesgg10.club/users";

function login(email, password) {
  const URL = `${BASE_URL}/login/`;
  const body = new FormData();
  body.append("email", email);
  body.append("password", password);

  const config = {
    headers: { "Content-Type": "application/json" }
  };

  return post(URL, body, config);
}

function signup(data) {
  const URL = `${BASE_URL}/signup/`;
  const body = getFormData(data);
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  return post(URL, body, config);
}

function verify(token) {
  const URL = `${BASE_URL}/verify/`;
  const body = new FormData();
  body.append("token", token);
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  return post(URL, body, config);
}

function refreshToken(token) {
  const URL = `${BASE_URL}/refresh/`;
  const body = new FormData();
  body.append("refresh", token);
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  return post(URL, body, config);
}

export { login, signup, verify, refreshToken };
