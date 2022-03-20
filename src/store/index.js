import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "@redux-saga/core"
import { reducer } from "./reducers/"
import { watchSaga } from "./sagas"

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(watchSaga)

export default store