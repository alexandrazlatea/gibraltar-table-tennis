import React, {Component} from 'react';
import {fetchTournaments, renderView}  from '../actions/index';
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
        this.setState({
            renderView: nextProps.renderView
        });
    }

    componentDidUpdate(prevProps) {
        const {tournaments} = this.props;
        const {tournaments: prevTournaments} = prevProps;

        if (Object.keys(tournaments).length !== Object.keys(prevTournaments).length) {
            this.setState({tournaments});
        } else if (tournaments && prevTournaments) {
            if (JSON.stringify(tournaments) !== JSON.stringify(prevTournaments)) {
                this.setState({tournaments});
            }
        }

        if (!localStorage['userId'] && this.state.currentUser) {
            this.setState({
                currentUser: null,
                exist: false,
            });
        }
    }

    checkUserAttendTournament = (tournamentId) => {
            const value = localStorage['userId'];
            if (value) {
                let query = fire.database().ref('tournament_user').orderByChild("user_id").equalTo(value);
                query.once("value").then(res => {
                    if (!this.state.exist && res && res.val()) {
                        this.setState({exist: true});
                    }
                });
            }
    }

    handleClickJoin = (tournamentId) => {
        fire.database().ref('tournament_user').push({
            tournament_id : tournamentId,
            user_id : localStorage['userId'],
        }).then(res => {
            this.props.renderView(Math.floor(Math.random() * 90 + 10));
        });
    }

    renderTournaments = () => {
        const {tournaments, currentUser} = this.state;
        return Object.values(tournaments).map((tournament, index) => {
            this.checkUserAttendTournament(tournament.tournament_id);
            return (
                <li key={index} className="tournament">
                    <div className="tournament-name">{tournament.name}</div>
                    <div className="startDate"><span>{tournament.start_date} - </span></div>
                    <div className="endDate"><span> {tournament.end_date}</span></div>
            { localStorage['userId'] && !this.state.exist && <button className="btn-join" onClick={() => this.handleClickJoin(tournament.tournament_id)} >Join</button> }
            { !localStorage['userId'] && <button className="btn-login" onClick={this.Login} >Login to join</button> }
                 </li>
            )
        });

    }

    render() {
        const loggedInUserId = localStorage['userId'];
        return (
            <div className="tournaments-list">
                <h1>Tournaments</h1>
                <ul>
                    {this.renderTournaments()}
                    <TournamentPlayers loggedInUserId={loggedInUserId}/>
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
    return bindActionCreators({fetchTournaments, renderView}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(TournamentsList);



