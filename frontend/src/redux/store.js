import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pointReducer from "./reducer/pointsReducer";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("reduxState");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};
const store = createStore(pointReducer, loadState(), applyMiddleware(thunk));
store.subscribe(() => {
    try {
        const stateToSave = store.getState();
        localStorage.setItem("reduxState", JSON.stringify(stateToSave));
    } catch (err) {
        console.error("Ошибка сохранения состояния в localStorage:", err);
    }
});

export default store;
