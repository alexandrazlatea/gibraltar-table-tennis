export default function (state = '', action) {
    switch(action.type) {
        case 'RENDER_VIEW':
            return action.payload;
    }
    return state;

}