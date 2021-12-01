import {handlersDefaultCase} from './helpers';
import { getChartData } from "../services/chart.service";
import { put,takeLatest, call } from "redux-saga/effects";

const PREFIX = 'CREATE_CHART';
const SET_DATA = `${PREFIX}//SET_DATA`;
const SET_LOADING = `${PREFIX}//SET_LOADING`;
const SET_ERRORS = `${PREFIX}//SET_ERRORS`;
const GET_DATA = `${PREFIX}//GET_DATA`;
const UPDATE_DATA = `${PREFIX}//UPDATE_DATA`;


const initState = {
    chartData:[],
    loading: false,
    error:''
};

export const createtodoReducer = (state = initState, action = {}) => {
    const handlers = {
        [SET_DATA]: () => ({ ...state, chartData: action.payload }),
        [SET_LOADING]: () => ({ ...state, loading: action.payload }),
        [SET_ERRORS]: () => ({ ...state, error: action.payload }),

    };
    return handlersDefaultCase(handlers, action, state);
   
};

export function* ChartDataSaga() {
    yield takeLatest(GET_DATA, getChartDataSaga);
    yield takeLatest(UPDATE_DATA, updateChartDataSaga);


}

function* getChartDataSaga(action) {
    yield put({ type: SET_LOADING, payload: true });
    try {
        const result = yield call(getChartData);
        yield put({ type: SET_DATA, payload: result});
        yield put({ type: SET_LOADING, payload: false });
    } catch (e) {
        yield put({ type: SET_ERRORS, payload: e });
        yield put({ type: SET_LOADING, payload: false });
    }
}
function* updateChartDataSaga(action) {
    yield put({ type: SET_LOADING, payload: true });
    try {
        const result = action.payload.data;
        result[action.payload.index].elements =action.payload.values;
        yield put({ type: SET_DATA, payload: result});
        yield put({ type: SET_LOADING, payload: false });
        console.log(initState.chartData)
    } catch (e) {
        yield put({ type: SET_ERRORS, payload: e });
        yield put({ type: SET_LOADING, payload: false });
    }
}
const addTodo = (task) => ({ type: GET_DATA ,payload: { task }});
const updateChartData = (values,index, data) => ({ type: UPDATE_DATA ,payload: { index: index,values:values,data:data}});


export const getTasks = state => state.createtodoReducer.chartData;

export const creatTodoActions = {
    addTodo,
    updateChartData
};

export default createtodoReducer;