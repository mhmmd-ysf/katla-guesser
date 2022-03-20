import { put, call, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { setKbbi, setLoadingTrue } from './actions'

export function* fetchKbbi(action) {
  try {
    yield put(setLoadingTrue())
    const { data } = yield call(axios, {
      method: 'get',
      url: 'https://kbbi.vercel.app/'
    })
    let { entries } = data
    entries = entries
      .filter(entry => !entry.includes("/cari"))
      .filter(entry => !entry.includes("%"))
      .filter(entry => !entry.includes("-"))
      .map(entry => entry.slice(35))
      .filter(entry => entry.length === 5)

    // console.log("mengambil data kbbi", entries.length)

    // yield put({ type: 'SET_KBBI', payload: entries })
    yield put(setKbbi(entries))

  } catch (error) {
    console.log(error)
  }
}

export function* watchSaga () {
  yield takeLatest('FETCH_KBBI', fetchKbbi)
}