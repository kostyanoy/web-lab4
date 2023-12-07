import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pointReducer from "./reducer/pointsReducer";
export const store = createStore(pointReducer, applyMiddleware(thunk));
