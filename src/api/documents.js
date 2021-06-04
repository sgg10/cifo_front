import { post, get } from "axios";
import getFormData from "../utils/objToFormData";

const BASE_URL = "http://localhost:8000";

function getFiles(id, access_token) {
  const URL = `${BASE_URL}/users/${id}/documents/`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    }
  };
  return get(URL, config);
}

function authenticateFile(data, access_token) {
  const URL = `${BASE_URL}/documents/authenticate/`;
  const body = getFormData(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    }
  };
  return post(URL, body, config);
}

function uploadFile(data, access_token) {
  const URL = `${BASE_URL}/documents/upload/`;
  const body = getFormData(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    }
  };
  return post(URL, body, config);
}

export { getFiles, authenticateFile, uploadFile };
