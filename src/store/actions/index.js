export const SET_KBBI = 'SET_KBBI'
export const FETCH_KBBI = 'FETCH_KBBI'


export function setKbbi (payload) {
  return { type: SET_KBBI, payload }
}

export function fetchKBBI() {
  return { type: FETCH_KBBI }
}

export function setLoadingTrue() {
  return { type: "SET_LOADING_TRUE" }
}