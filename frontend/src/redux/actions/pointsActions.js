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
                console.log(`Point successfully saved`);
            }
        } catch (error) {
            console.error('Error sending point:', error);
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
                console.log('Points successfully retrieved:', response.data);
            }
        } catch (error) {
            console.log("Error getting points")
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
                console.log('Points successfully retrieved:', response.data);
            }
        } catch (error) {
            console.log("Error getting points for the table")
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
            console.log('Points successfully reset');
        }
    } catch (error) {
        console.error('Error resetting points:', error);
    }}
};
