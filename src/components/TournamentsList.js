import React, {Component} from 'react';
import {fetchTournaments}  from '../actions/index';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fire} from "../fire";

class TournamentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournaments : "",
            currentUser: null,
            renderView: "",
            currentUser: ""
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

    renderTournaments = () => {
        const {tournaments, currentUser} = this.state;
        return Object.values(tournaments).map((tournament, index) => {
            console.log(tournament, 'tournament');
            return (
                <div class="tournament">
                    <li className="tournament-name">{tournament.name} </li>
                    <div className="startDate"><span>{tournament.start_date} - </span></div>
                    <div className="endDate"><span> {tournament.end_date}</span></div>
            { currentUser && <button onClick={this.handleClick} >Join</button> }
            { !currentUser && <button onClick={this.handleClick} >Login to join</button> }
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



