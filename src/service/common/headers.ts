/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'

export default function getAxios() {
  const jwt = localStorage.getItem('token')

  const instance: any = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
    withCredentials: false,
  })

  // set common headers
  instance.defaults.headers.common.Authorization = `Token ${jwt}`
  instance.defaults.headers.common['Content-Type'] = 'application/json'

  return instance
}
