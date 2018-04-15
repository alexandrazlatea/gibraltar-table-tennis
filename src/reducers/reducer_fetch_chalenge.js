export default function (state = '', action) {
    switch(action.type) {
        case 'FETCH_CHALENGE':
            return action.payload;
        default:
            return state;
    }

}