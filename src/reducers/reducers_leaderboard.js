export default function (state = '', action) {
    switch(action.type) {
        case 'FETCH_LEADERBOARD':
            return action.payload;
        default:
            return state;
    }

}