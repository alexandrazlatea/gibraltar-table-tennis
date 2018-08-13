import React, {Component} from 'react';
import {fetchTournaments}  from '../actions/index';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fire} from "../fire";
import TournamentPlayers from '../components/TournamentPlayers';

class TournamentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournaments : "",
            currentUser: null,
            renderView: "",
            currentUser: "",
            exist: false
        };
    }

    componentDidMount = () => {
        this.props.fetchTournaments();
        if (localStorage['userId']) {
            this.checkLoginState();
        }
    }

    checkLoginState = () => {
        fire.auth().onAuthStateChanged(user => {
            if (!user || (user && user.uid !== localStorage['userId'])) {
                localStorage.removeItem('userId');
                this.setState({renderHeader: Math.floor(Math.random() * 90 + 10)})
                this.props.renderView(Math.floor(Math.random() * 90 + 10));
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({tournaments: nextProps.tournaments});
        if (!localStorage['userId'] && this.state.currentUser) {
            this.setState({
                currentUser: null
            });
        }
    }

    checkUserAttendTournament = (tournamentId) => {
        const value = localStorage['userId'];
        let exist = false;
        let query  = fire.database().ref('tournament_user').orderByChild("user_id").equalTo(value);
            query.once("value").then(res => {
                this.setState({exist: true});
            });
    }

    handleClickJoin = (tournamentId) => {
        fire.database().ref('tournament_user').push({
            tournament_id : tournamentId,
            user_id : localStorage['userId'],
        });
    }

    renderTournaments = () => {
        const {tournaments, currentUser} = this.state;
        return Object.values(tournaments).map((tournament, index) => {
            this.checkUserAttendTournament(tournament.tournament_id);
            return (
                <div class="tournament">
                    <li className="tournament-name">{tournament.name} </li>
                    <div className="startDate"><span>{tournament.start_date} - </span></div>
                    <div className="endDate"><span> {tournament.end_date}</span></div>
            { localStorage['userId'] && !this.state.exist && <button onClick={this.handleClickJoin(tournament.tournament_id)} >Join</button> }
            { localStorage['userId'] && this.state.exist && <button>Registered</button> }
            { !localStorage['userId'] && <button onClick={this.Login} >Login to join</button> }
                </div>
            )
        });

    }

    render() {

        return (
            <div className="tournaments-list">
                <h1>Tournaments</h1>
                <ul>
                    {this.renderTournaments()}
                    <TournamentPlayers />
                </ul>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        tournaments: state.tournaments,
        renderView: state.renderView
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({fetchTournaments}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(TournamentsList);



