export default function (state = '', action) {
    switch(action.type) {
        case 'FETCH_USERS_DATA':
            console.log('fdf');
            return action.payload;
    }
    return state;

}