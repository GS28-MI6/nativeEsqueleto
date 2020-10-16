import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './reducers/mainReducer';

const rootReducer = combineReducers({
  mainReducer: mainReducer
})

const configureStore = () => createStore(rootReducer,applyMiddleware(thunk));

const store = configureStore()

export default store;