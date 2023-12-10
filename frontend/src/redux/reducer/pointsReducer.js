const initialState = {
    x: null,
    y: null,
    r: '0',
    points: [],
    pointsForTable: [],
};

const pointReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_X':
            return {...state, x: action.payload.x};
        case 'SET_Y':
            return {...state, y: action.payload.y};
        case 'SET_R':
            return {...state, r: action.payload.r};
        case 'ADD_POINTS':
            return {
                ...state,
                points: state.points.concat({x: action.payload.x, y: action.payload.y, r: action.payload.r})
            };
        case 'GET_POINTS_SUCCESS':
            return { ...state, points: action.payload.points };
        case 'GET_POINTS_FOR_TABLE_SUCCESS':
            return { ...state, pointsForTable: action.payload.points };
        case 'RESET_ALL_POINTS':
            return {...state};
        default:
            return state;
    }
};
export default pointReducer;
