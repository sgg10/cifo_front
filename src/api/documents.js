import { post, get } from "axios";
import getFormData from "../utils/objToFormData";

const BASE_URL = "https://cifo.comparteridesgg10.club";

function getFiles({ id, access_token, search = null }) {
  let URL = `${BASE_URL}/users/${id}/documents/`;
  if (search) {
    URL = `${URL}?search=${search}`;
  }
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
