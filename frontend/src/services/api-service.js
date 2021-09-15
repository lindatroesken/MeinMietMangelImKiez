import axios from 'axios'

export const getToken = credentials =>
  axios
    .post('/api/auth/access_token', credentials)
    .then(response => response.data)
    .then(dto => dto.token)

const headers = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const getMangelList = (token, username) =>
  axios
    .get(`/api/mangel/all/${username}`, headers(token))
    .then(response => response.data)

export const postMangel = (token, username, mangel) =>
  axios
    .post(`/api/mangel/${username}`, mangel, headers(token))
    .then(response => response.data)

export const getMangelById = (token, id) =>
  axios.get(`/api/mangel/${id}`, headers(token)).then(response => response.data)
