import { combineReducers, Reducer } from 'redux';
import selectedPath from './selectedPath';

const rootReducer: Reducer = combineReducers({ selectedPath });

export default rootReducer;
