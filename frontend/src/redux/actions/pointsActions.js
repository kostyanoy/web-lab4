import axios from 'axios';
export const setX = (x) => ({ type: 'SET_X', payload: x });
export const setY = (y) => ({ type: 'SET_Y', payload: y });
export const setR = (r) => ({ type: 'SET_R', payload: r });
export  const logout = () => ({type:'LOGOUT'})
export const sendPoints = (x, y, r) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(
                `http://localhost:8080/points`,
                { x, y, r },
                { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.success) {
                dispatch({
                    type: 'ADD_POINTS',
                    payload: { x, y, r }
                });
                console.log(`Точка успешно сохранена`);
            } else {
                console.error(`Не удалось сохранить точку. Ошибка: ${response.data.error}`);
            }
        } catch (error) {

            console.error('Произошла ошибка при отправке точки:', error);
        }
    };
};

export const getPoints = (r) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(
                `http://localhost:8080/points?r=${r}`,
                { withCredentials: true }
            );

            if (response.data.success) {
                dispatch({
                    type: 'GET_POINTS_SUCCESS',
                    payload: response.data
                });
                console.log('Точки успешно получены:', response.data);
            }
        } catch (error) {
            console.log("Ошибка при получении точек")
        }
    };
};
export const getPointsForTable = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(
                `http://localhost:8080/points?r=${0}`,
                { withCredentials: true }
            );

            if (response.data.success) {
                dispatch({
                    type: 'GET_POINTS_FOR_TABLE_SUCCESS',
                    payload: response.data
                });
                console.log('Точки успешно получены:', response.data);
            }
        } catch (error) {
            console.log("Произошла ошибка при получении точек для таблциы")
        }
    };
};
export const resetPoints = () =>{
return async function (dispatch) {
    try {
        const response = await axios.post(
            `http://localhost:8080/points/reset`,
            null,
            { withCredentials: true }
        );
        if (response.data.success) {
            dispatch({
                type: 'RESET_ALL_POINTS'
            })
            console.log('Точки успешно сброшены');
        } else {
            console.error(`Не удалось сбросить точки. Ошибка: ${response.data.error}`);
        }
    } catch (error) {
        console.error('Произошла ошибка при сбросе точек:', error);
    }}
};
