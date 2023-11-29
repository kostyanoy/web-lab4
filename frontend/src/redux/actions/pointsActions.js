import {URL} from '../../services/config';

export const fetchPointsRequest = () => ({ type: 'FETCH_POINTS_REQUEST' });
export const fetchPointsSuccess = (points) => ({ type: 'FETCH_POINTS_SUCCESS', payload: points });
export const fetchPointsFailure = (error) => ({ type: 'FETCH_POINTS_FAILURE', payload: error });

export const postPointRequest = () => ({ type: 'POST_POINT_REQUEST' });
export const postPointSuccess = () => ({ type: 'POST_POINT_SUCCESS' });
export const postPointFailure = (error) => ({ type: 'POST_POINT_FAILURE', payload: error });

export const resetPointsRequest = () => ({ type: 'RESET_POINTS_REQUEST' });
export const resetPointsSuccess = () => ({ type: 'RESET_POINTS_SUCCESS' });
export const resetPointsFailure = (error) => ({ type: 'RESET_POINTS_FAILURE', payload: error });

export const fetchPoints = (r) => {
    return async (dispatch) => {
        dispatch(fetchPointsRequest());

        try {
            const response = await $.ajax({
                url: `/points?r=${r}`,
                method: 'GET',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
            });

            if (response.success) {
                dispatch(fetchPointsSuccess(response.points));
            } else {
                dispatch(fetchPointsFailure(response.error || 'Не удалось получить точки'));
            }
        } catch (error) {
            dispatch(fetchPointsFailure('Не удалось получить точки. Пожалуйста, повторите попытку.'));
        }
    };
};
export const postPoint = (x, y, r) => {
    return async (dispatch) => {
        dispatch(postPointRequest());

        try {
            const response = await $.ajax({
                url: `${URL}/points`,
                method: 'POST',
                contentType: 'application/json',
                data: {
                    x:x,
                    y:y,
                    r:r },
                xhrFields: { withCredentials: true },
            });

            if (response.success) {
                dispatch(postPointSuccess());
            } else {
                dispatch(postPointFailure(response.error || 'Не удалось отправить точку'));
            }
        } catch (error) {
            dispatch(postPointFailure('Не удалось отправить точку. Пожалуйста, повторите попытку.'));
        }
    };
};
export const resetPoints = () => {
    return async (dispatch) => {
        dispatch(resetPointsRequest());
        try {
            const response = await $.ajax({
                url: `${URL}/points/reset`,
                method: 'POST',
                xhrFields: { withCredentials: true },
            });

            if (response.success) {
                dispatch(resetPointsSuccess());
            } else {
                dispatch(resetPointsFailure(response.error || 'Не удалось сбросить точки'));
            }
        } catch (error) {
            dispatch(resetPointsFailure('Не удалось сбросить точки. Пожалуйста, повторите попытку.'));
        }
    };
};

