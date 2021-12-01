import { all } from "redux-saga/effects";
import { ChartDataSaga } from "./components/tododucks";

export default function* rootSaga() {
    yield all([ChartDataSaga()]);
}