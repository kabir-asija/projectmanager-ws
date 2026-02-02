import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

export const getTasks = () => api.get('/tasks')
export const getCategories = () => api.get('/meta/categories')
export const getTags = () => api.get('/meta/tags')
export const createTask = (data: unknown) => api.post('/tasks', data)

export default api
