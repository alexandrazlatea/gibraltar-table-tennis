export default function (state = '', action) {
    switch(action.type) {
        case 'FETCH_CHALENGE':
            return action.payload;
    }
    return state;

}