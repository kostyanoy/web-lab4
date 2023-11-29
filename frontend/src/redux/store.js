import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pointsReducer from "./reducer/pointsReducer";
export const store = createStore(pointsReducer, applyMiddleware(thunk));
