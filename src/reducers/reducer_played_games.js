export default function (state = '', action) {
    switch(action.type) {
        case 'FETCH_PLAYED_GAMES':
            return action.payload;
    }
    return state;

}