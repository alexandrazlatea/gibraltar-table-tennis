import React, {Component} from 'react';
import {renderView} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Timestamp from 'react-timestamp';
import * as classnames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import {fire} from "../fire";

class TournamentPlayers extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            players: [],
        });
    }

    getPlayerIdList = (playerList, sortOrder = 'ascending') => {
        if (playerList) {
            return playerList.map(player => {
                return player.user_id;
            }).sort((a,b) => {
                if (a > b) { return sortOrder === 'ascending' ? 1 : -1;}
                if (a < b) { return sortOrder === 'ascending' ? -1 : 1;}
                if (a === b) { return 0;}
            });
        }
        return [];
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            renderView: nextProps.renderView
        });
        this.fetchTournamentsPlayer(this.receivePlayer);
    }

    componentDidUpdate(prevProps) {
        const {players: prevPlayers} = prevProps;
        const {players: players} = this.props;

        if (players) {
            if (prevPlayers.length !== players.length) {
                this.setState({
                    players
                });
            } else {
                // fetch all player ids
                const prevPlayerIds = this.getPlayerIdList(prevPlayers);
                const playerIds = this.getPlayerIdList(players);

                if (prevPlayerIds.join(',') !==  playerIds.join(',')) {
                    this.setState({
                        players
                    });
                }
            }
        }

    }

    fetchTournamentsPlayer =(callback) => {
        let query  = fire.database().ref('tournament_user').orderByChild("tournament_id").equalTo(1);
        query.once("value").then(res => {
            let results = res.val();
            if (results) {
                return Object.values(results).forEach((result) => {
                    let messagesRef = fire.database().ref('users').orderByChild("user_id").equalTo(result.user_id);
                    messagesRef.once('value').then(snapshot => {
                        callback(snapshot.val());
                    })
                })
            }
        });
    }

    receivePlayer = (player = {}) => {
        if (player) {
            const objectProps = Object.values(player);
            if (objectProps && objectProps.length === 1) {
                const {players} = this.state;
                const newPlayer = objectProps[0];
                if (players.findIndex(player => player.user_id === newPlayer.user_id) === -1) {
                    let newPlayers = players;
                    newPlayers.push(newPlayer);
                    this.setState({
                        players: newPlayers
                    });
                }
            }
        }
    }

    componentDidMount() {
        this.fetchTournamentsPlayer(this.receivePlayer);
    }

    getUsername = (id) => {
        const user = Object.values(this.state.users).find((user) => {
            return (user.user_id === id);
        });
        if (user) {
            return user.firstName + ' ' + user.lastName;
        }
        return '';
    }

    renderPlayers = () => {
        const {players} = this.state;
        const {loggedInUserId} = this.props;
        if (players && players.length > 0) {
            return <ul>{players.map((player, index) => {
                const playerIsLoggedIn = player.user_id === loggedInUserId;
                const playerDetailsClassnames = classnames({
                    "tournament-player-details": true,
                    "tournament-player-details-joined": playerIsLoggedIn
                })
                return <li key={index + player.user_id}>
                    <span className={playerDetailsClassnames}>{index + 1}&nbsp;&nbsp;&nbsp;&nbsp;{player.firstName} {player.lastName}</span>
                    {playerIsLoggedIn && <span className="tournament-player-joined">Registered</span>}
                </li>;
            })}</ul>
        }
        return <span>Nobody joined yet</span>;
    }

    render() {
        return (
            <div>
                <div>
                    Joined Players:
                </div>
                <div className="tournament-players">
                    {this.renderPlayers()}
                </div>

            </div>
        )
    }


}

function mapStateToProps(state) {
    return {
        renderView: state.renderView,
        players: state.players
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({renderView}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(TournamentPlayers);