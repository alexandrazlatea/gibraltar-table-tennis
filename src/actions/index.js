import {fire} from '../fire';
import axios from 'axios';
import ConstantsList from '../constants';

export const API_URL = "https://api-gibraltar-league.herokuapp.com";
export function fetchUsersData() {


    let messagesRef = fire.database().ref('users').orderByChild('seed');
    return dispatch => {
        messagesRef.on('value', snapshot => {
            dispatch({
                type: 'FETCH_USERS_DATA',
                payload: snapshot.val()
            })
        })
    }
}

export function sendEmail(data) {
    return dispatch => {
        axios({
            method: 'post',
            url: 'https://pingpong-email.herokuapp.com/index.php',
            data: {action : data['action'], to: data['to'], subject: data['subject'], body: data['body'] } ,
            headers: {
                'accept': 'application/json',
                'accept-language': 'en_US',
                'content-type': 'application/x-www-form-urlencoded'
            },
        }).then(response => {
            dispatch({
                type: 'test',
                payload: response.data
            });
        })
    }

}

export function fetchSchedule(data) {
    return dispatch => {
        axios({
            method: 'get',
            url: ConstantsList.API_URL+'/schedule/getSchedule.php',
            data
        }).then(response => {
            dispatch({
                type: 'FETCH_SCHEDULE',
                payload: response.data
            });
        })
    }

}

export function fetchResults(teamA, teamB, round) {
    return dispatch => {
        axios({
            method: 'get',
            url: ConstantsList.API_URL+'/schedule/results.php?teamA='+teamA+'&teamB='+teamB+'&round='+round,
        }).then(response => {
            dispatch({
                type: 'FETCH_RESULTS',
                payload: response.data
            });
        })
    }

}



export function fetchChalenges() {
    let messagesRef = fire.database().ref('chalenge');
    return dispatch => {
        messagesRef.on('value', snapshot => {
            dispatch({
                type: 'FETCH_CHALENGE',
                payload: snapshot.val()
            })
        })
    }
}
export function fetchPlayedGames() {
    let messagesRef = fire.database().ref('games');
    return dispatch => {
        messagesRef.on('value', snapshot => {
            dispatch({
                type: 'FETCH_PLAYED_GAMES',
                payload: snapshot.val()
            })
        })
    }
}

export function fetchTournamentsPlayer() {
    let query  = fire.database().ref('tournament_user').orderByChild("tournament_id").equalTo(1);
    query.once("value").then(res => {
        let results = res.val();
        let users = [];
        Object.values(results).forEach((result) => {
            let messagesRef = fire.database().ref('users').orderByChild("user_id").equalTo(result.user_id);
                messagesRef.once('value').then(snapshot => {
                    users.push(snapshot.val());
                })
        })
    });
}

export function updateChallenge(value, action, challenge = {}) {
    let query  = fire.database().ref('chalenge').orderByChild("user_id").equalTo(value);
    if (action === 'expired') {
        fire.database().ref('games').push({
            user_id: challenge.user_id,
            challengedUser: challenge.challengedUser,
            current_date: Math.floor(Date.now() / 1000),
            first_score: 0,
            second_score: 0,
        });
    }
    var flag = false;
    return dispatch => {
        query.on("child_added",(snapshot) => {
            if (!flag) {
                snapshot.ref.update({active: 0})
                flag = true;
            }
             dispatch({
                type: 'RENDER_VIEW',
                payload: (Math.floor(Math.random() * 90 + 10))
            })
        });
    }
}

export function renderView(value) {
    return {
        type: 'RENDER_VIEW',
        payload: value
    };
}



