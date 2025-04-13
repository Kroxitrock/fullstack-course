import axios from 'axios'

const baseUrl = '/api/blogs'

const setToken = (newToken) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const login = async (credentials) => {
  const response = await axios.post('/api/users/login', credentials)
  return response.data
}

export default { setToken, getAll, create, login }