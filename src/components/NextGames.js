import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {fire} from "../fire";
import {renderView, updateChallenge, SwapRanks} from "../actions/index";
import {bindActionCreators} from "redux";

class NextGames extends Component {
    constructor(props) {
        super(props);
        this.state = ({challenges: '', users: '', renderView: '', secondScore: '', firstScore: ''});

    }

    componentWillReceiveProps(nextProps) {
        this.setState({challenges : nextProps.challenges});
        this.setState({users : nextProps.usersData, renderView: nextProps.renderView});
    }

    handleChangeFirstName = (event) => {
        this.setState({ firstScore: event.target.value });
    }

    handleChangeSecondName = (event) => {
        this.setState({ secondScore: event.target.value });
    }

    handleSubmit = (challenge) => {
        const firstScore = this.state.firstScore;
        const secondScore = this.state.secondScore;
        fire.database().ref('games').push({
            user_id: challenge.user_id,
            challengedUser: challenge.challengedUser,
            current_date: new Date().getTime(),
            first_score: firstScore,
            second_score: secondScore,
        });
        this.props.updateChallenge(challenge.user_id, 'handle');
        this.props.SwapRanks(challenge.user_id, challenge.challengedUser, firstScore, secondScore);

    }

    renderNextGames = () => {
        let currentUser = '';
        if (localStorage['userId']) {
            const sortedUsers = _.sortBy(this.state.users, 'rank', function (n) {
                return Math.sin(n);
            });
            currentUser = sortedUsers.find((user) => {
                return (user.user_id === localStorage['userId']);
            })
        }
        let challenges = this.state.challenges;

        if (challenges) {
            challenges = Object.values(challenges).filter((challenge) => {
                return (challenge.active === 1);
            });
            return challenges.map((challenge, index) => {
                return (
                    <div className="next-game" key={index + challenge.user_id}>
                        <span> {index + 1}. </span>
                        <span className="first-user">{challenge.userName}</span>
                        {(currentUser && (currentUser.user_id === challenge.user_id || currentUser.user_id === challenge.challengedUser)) &&
                        <input onChange={this.handleChangeFirstName} name="first_score" type="number" className="quantity"></input>}
                        <span> - </span>
                        {(currentUser && (currentUser.user_id === challenge.user_id || currentUser.user_id === challenge.challengedUser)) &&
                        <input onChange={this.handleChangeSecondName} name="last_score" type="number" className="quantity"></input>}
                        <span className="second-user">{challenge.userChallengedName}</span>
                        {(currentUser && (currentUser.user_id === challenge.user_id || currentUser.user_id === challenge.challengedUser)) &&
                        <button onClick={() => this.handleSubmit(challenge)}>Save</button>}
                    </div>
                )
            });
        } else {
            return (
                <div className="next-game">
                </div>
            )
        }
    }
    render () {

        return (
            <div className="next-games">
                {this.renderNextGames()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        usersData: state.usersData,
        challenges: state.challenges,
        renderView: state.renderView
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({renderView, updateChallenge, SwapRanks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(NextGames);

