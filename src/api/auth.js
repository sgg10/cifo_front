import { post } from 'axios'
import getFormData from '../utils/objToFormData'

function login (email, password) {
  const URL = 'users/login/'
  const body = new FormData()
  body.append('email', email)
  body.append('password', password)

  return post(URL, body)
}

function signup (data) {
  const URL = 'users/signup/'
  const body = getFormData(data)
  return post(URL, body)
}

function verify (token) {
  const URL = 'users/verify/'
  const body = new FormData()
  body.append('token', token)
  return post(URL, body)
}

function refreshToken (token) {
  const URL = 'users/refresh/'
  const body = new FormData()
  body.append('refresh', token)
  return post(URL, body)
}

export { login, signup, verify, refreshToken }
