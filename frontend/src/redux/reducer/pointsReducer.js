const initialState = {
    x: null,
    y: null,
    r: '0',
    loading: false,
};

const pointReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_X':
            return { ...state, x: action.payload };
        case 'SET_Y':
            return { ...state, y: action.payload };
        case 'SET_R':
            return { ...state, r: action.payload };
        case 'SEND_POINT_REQUEST':
            return { ...state, loading: true };
        case 'SEND_POINT_SUCCESS':
        case 'SEND_POINT_FAILURE':
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default pointReducer;