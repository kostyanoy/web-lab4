import {URL} from '../../services/config';
import axios from 'axios';

export const setX = (x) => ({ type: 'SET_X', payload: x });
export const setY = (y) => ({ type: 'SET_Y', payload: y });
export const setR = (r) => ({ type: 'SET_R', payload: r });
export const sendPointRequest = () => ({ type: 'SEND_POINT_REQUEST' });
export const sendPointSuccess = () => ({ type: 'SEND_POINT_SUCCESS' });
export const sendPointFailure = (error) => ({ type: 'SEND_POINT_FAILURE', payload: error });

export const sendPoint = (x, y, r) => {
    return async (dispatch) => {
        dispatch(sendPointRequest());

        try {
            const response = await axios.post(
                `${URL}/points`,
                { x, y, r },
                { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.success) {
                dispatch(sendPointSuccess());
            } else {
                dispatch(sendPointFailure(response.data.error || 'Не удалось отправить точку'));
            }
        } catch (error) {
            dispatch(sendPointFailure('Не удалось отправить точку. Пожалуйста, повторите попытку.'));
        }
    };
};

// export const resetPoints = () => {
//     return async (dispatch) => {
//         dispatch(resetPointsRequest());
//         try {
//             const response = await axios.post(`${URL}/points/reset`, null, { withCredentials: true });
//
//             if (response.data.success) {
//                 dispatch(resetPointsSuccess());
//             } else {
//                 dispatch(resetPointsFailure(response.data.error || 'Не удалось сбросить точки'));
//             }
//         } catch (error) {
//             dispatch(resetPointsFailure('Не удалось сбросить точки. Пожалуйста, повторите попытку.'));
//         }
//     };
// };
// export const getPoints = (r) => ({ type: 'GET_POINTS', payload: r }); // Поправлено название и добавлен payload
// export const resetPoints = () => ({ type: 'RESET_POINTS' });


// export const fetchPoints = (r) => {
//     return async (dispatch) => {
//         dispatch(getPointsRequest());
//
//         try {
//             const response = await axios.get(`${URL}/points?r=${r}`, { withCredentials: true });
//
//             if (response.data.success) {
//                 dispatch(getPointsSuccess(response.data.points));
//             } else {
//                 dispatch(getPointsFailure(response.data.error || 'Не удалось получить точки'));
//             }
//         } catch (error) {
//             dispatch(getPointsFailure('Не удалось получить точки. Пожалуйста, повторите попытку.'));
//         }
//     };
// };
