import React, {Component} from 'react';
import {fetchTournaments}  from '../actions/index';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class TournamentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournaments : "",
            currentUser: null
        };
    }

    componentDidMount = () => {
        this.props.fetchTournaments();
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
        const {tournaments} = this.state;
        return Object.values(tournaments).map((tournament, index) => {
            console.log(tournament);
            return (
                <div className="tournament-name">{tournament.name} </div>
            )
        });

    }

    render() {

        return (
            <div className="tournaments-list">
                <h1>Tournaments</h1>
                {this.renderTournaments()}
            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log(state, '');
    return {
        tournaments: state.tournaments,
        renderView: state.renderView
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({fetchTournaments}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(TournamentsList);



