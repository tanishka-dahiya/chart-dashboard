import { combineReducers } from 'redux';
import createtodoReducer from './components/tododucks';


const rootReducer = combineReducers({
    createtodoReducer
});

export default rootReducer;