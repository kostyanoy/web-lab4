const initialState = {
    loading: false,
    points: [],
    error: null,
};

const pointsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHECK_AUTHORIZATION_REQUEST':
        case 'FETCH_POINTS_REQUEST':
        case 'POST_POINT_REQUEST':
        case 'RESET_POINTS_REQUEST':
        case 'LOGOUT_REQUEST':
            return { ...state, loading: true, error: null };

        case 'CHECK_AUTHORIZATION_SUCCESS':
            return { ...state, loading: false, isAuthorized: action.payload, error: null };

        case 'CHECK_AUTHORIZATION_FAILURE':
        case 'FETCH_POINTS_FAILURE':
        case 'POST_POINT_FAILURE':
        case 'RESET_POINTS_FAILURE':
        case 'LOGOUT_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case 'FETCH_POINTS_SUCCESS':
            return { ...state, loading: false, points: action.payload, error: null };

        case 'POST_POINT_SUCCESS':
        case 'RESET_POINTS_SUCCESS':
        case 'LOGOUT_SUCCESS':
            return { ...state, loading: false, error: null };

        default:
            return state;
    }
};

export default pointsReducer;
