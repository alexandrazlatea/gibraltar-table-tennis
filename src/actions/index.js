import {fire} from '../fire';

export function fetchUsersData() {
    let messagesRef = fire.database().ref('users');
    return dispatch => {
        messagesRef.on('value', snapshot => {
            dispatch({
                type: 'FETCH_USERS_DATA',
                payload: snapshot.val()
            })
        })
    }
}

export function fetchResults() {
    console.log('intra aici');
    let messagesRef = fire.database().ref('vote');
    return dispatch => {
        messagesRef.on('value', snapshot => {
            dispatch({
                type: 'FETCH_RESULTS',
                payload: snapshot.val()
            })
        })
    }
}



