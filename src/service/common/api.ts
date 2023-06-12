/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */

import getAxios from './headers'

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL

export async function getApi(path: string) {
  try {
    const response = await getAxios().get(`${baseURL + path}`)
    return response
  } catch (err: any) {
    return err.response
  }
}

export async function postApi(path: string, payload: any) {
  try {
    const response = await (payload
      ? getAxios().post(`${baseURL + path}`, payload)
      : getAxios().post(`${baseURL + path}`))
    return response
  } catch (error: any) {
    return error.response
  }
}

export async function putApi(path: string, payload: any) {
  try {
    const response = await getAxios().put(`${baseURL + path}`, payload)
    return response
  } catch (err) {
    return err
  }
}

export async function deleteApi(path: string, payload: any) {
  try {
    const response = await (payload
      ? getAxios().delete(`${baseURL + path}`, {
          data: payload,
        })
      : getAxios().delete(`${baseURL + path}`))
    return response
  } catch (err) {
    return err
  }
}
