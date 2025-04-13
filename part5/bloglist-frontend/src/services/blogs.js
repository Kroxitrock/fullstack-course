import axios from 'axios'

const baseUrl = '/api/blogs'

const setToken = (newToken) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
}

const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
        return user
    }
    return null
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    if (response.status !== 201) {
        throw new Error('Failed to create blog')
    }
    return response.data
}

const incrementLikes = async (blog) => {
    const response = await axios.put(`${baseUrl}/${blog.id}`, {
        user: blog.user.id,
        likes: blog.likes + 1,
        title: blog.title,
        author: blog.author,
        url: blog.url
    })

    return response.data
}

const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    if (response.status !== 204) {
        throw new Error('Failed to delete blog')
    }
}


const login = async (credentials) => {
    const response = await axios.post('/api/users/login', credentials)
    return response.data
}

export default { setToken, getUser, getAll, create, incrementLikes, remove, login }