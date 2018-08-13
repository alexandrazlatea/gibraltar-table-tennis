export default function (state = '', action) {
    console.log(action.payload, 'action payload')
    switch(action.type) {
        case 'FETCH_TOURNAMENTS':
            return action.payload;
        default:
            return state;
    }

}