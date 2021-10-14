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
    .get(`/api/mangel/findall/${username}`, headers(token))
    .then(response => response.data)

export const getMangelListDue = (token, username) =>
  axios
    .get(`/api/mangel/finddue/${username}`, headers(token))
    .then(response => response.data)

export const postMangel = (token, username, mangel) =>
  axios
    .post(`/api/mangel/new/${username}`, mangel, headers(token))
    .then(response => response.data)

export const postNewUser = credentials =>
  axios.post(`/api/user/register`, credentials).then(response => response.data)

export const putEditUsername = (token, newusername) =>
  axios
    .put(`/api/user/username/edit`, { username: newusername }, headers(token))
    .then(response => response.data)

export const putMangel = (token, mangelId, mangel) =>
  axios
    .put(`/api/mangel/update/${mangelId}`, mangel, headers(token))
    .then(response => response.data)

export const getMangelById = (token, mangelId) =>
  axios
    .get(`/api/mangel/find/${mangelId}`, headers(token))
    .then(response => response.data)

export const postContactLog = (token, mangelId, contactLogger) =>
  axios
    .post(`/api/mangel/contact/add/${mangelId}`, contactLogger, headers(token))
    .then(response => response.data)

export const putContactLog = (token, mangelId, contactLogger) =>
  axios
    .put(`/api/mangel/contact/edit/${mangelId}`, contactLogger, headers(token))
    .then(response => response.data)

export const deleteContactLog = (token, mangelId, contactId) =>
  axios
    .delete(
      `/api/mangel/contact/delete/${mangelId}/${contactId}`,
      headers(token)
    )
    .then(response => response.data)

export const deleteMangel = (token, mangelId) =>
  axios
    .delete(`/api/mangel/delete/${mangelId}`, headers(token))
    .then(response => response.data)

export const exportMangelAsCSV = token =>
  axios.get(`/api/mangel/export/csv/all`, {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const addNewAddress = (token, username, address) =>
  axios
    .post(`/api/user/address/new/${username}`, address, headers(token))
    .then(response => response.data)

export const getUserAddressList = (token, username) =>
  axios
    .get(`/api/user/address/find/${username}`, headers(token))
    .then(response => response.data)

export const getUserAddressById = (token, username, addressId) =>
  axios
    .get(`/api/user/address/find/${username}/${addressId}`, headers(token))
    .then(response => response.data)

export const updateUserAddress = (token, addressId, address) =>
  axios
    .put(`/api/user/address/edit/${addressId}`, address, headers(token))
    .then(response => response.data)

export const deleteUserAddress = (token, addressId) =>
  axios
    .delete(`/api/user/address/delete/${addressId}`, headers(token))
    .then(response => response.data)

export const getMangelStatisticsAll = token =>
  axios
    .get(`/api/mangel/statistics/all`, headers(token))
    .then(response => response.data)
