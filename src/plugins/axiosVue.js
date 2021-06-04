import Axios from 'axios'

const config = {
  apiUrl: 'http://localhost:8000/'
}

Axios.defaults.baseUrl = config.apiUrl
