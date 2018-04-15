import React, {Component} from 'react';
import {renderView, fetchPlayedGames} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class GamesPlayed extends Component {
    constructor(props) {
        super(props);
        this.state = ({playedGames: '', users: ''});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({playedGames: nextProps.playedGames, users: nextProps.usersData});
    }

    componentDidMount() {
        this.props.fetchPlayedGames();

    }

    getUsername = (id) => {
        const user = Object.values(this.state.users).find((user) => {
            return (user.user_id === id);
        })
        return user.firstName + ' ' + user.lastName;
    }
    renderPlayerGames = () => {
        let {playedGames} = this.state;
        if (playedGames) {
            return Object.values(playedGames).map((game, index) => {
                return (
                    <div className="game" key={index + game.user_id}>
                        <span> {index + 1}. </span>
                        <span className="first-user">{this.getUsername(game.challengedUser)}</span>
                        <span> {game.first_score} - {game.second_score} </span>
                        <span className="second-user">{this.getUsername(game.user_id)}</span>
                    </div>
                )
            });
        } else {
            return (
                <div className="game">
                    No games played yet.
                </div>
            );
        }
    }

    render() {
        return (
            <div className="played-games">
                {this.renderPlayerGames()}
            </div>
        )
    }


}

function mapStateToProps(state) {
    return {
        usersData: state.usersData,
        challenges: state.challenges,
        renderView: state.renderView,
        playedGames: state.playedGames
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({renderView, fetchPlayedGames}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(GamesPlayed);