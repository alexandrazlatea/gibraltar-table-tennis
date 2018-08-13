import React, {Component} from 'react';
import {renderView, fetchTournamentsPlayer} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Timestamp from 'react-timestamp';
import * as classnames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

class TournamentPlayers extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            players: '',
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            players: nextProps.players ? Object.values(nextProps.players) : [],
        });
    }

    componentDidMount() {
        this.props.fetchTournamentsPlayer();
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

    }


    render() {
        return (
            <div>
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
    return bindActionCreators({renderView, fetchTournamentsPlayer}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(TournamentPlayers);