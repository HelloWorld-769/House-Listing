import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import houseReducer from './reducers/houseReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer=combineReducers({
    house:houseReducer
});

export default createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
