import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchUsersData}  from '../actions/index';
import {fetchChalenges}  from '../actions/index';
import _ from 'lodash';
import ChalelngeUser from './ChallengeUser';


class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state = {users: '', showLoginPopUp : false, challenges : '', renderView: ''};

    }

    componentDidMount() {
        this.props.fetchUsersData();
        this.props.fetchChalenges();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({users: nextProps.usersData});
        this.setState({challenges: nextProps.challenges, renderView: nextProps.renderView});
    }
    isUserChallenged = (user, challenges)=> {
        if (challenges !== '') {
            challenges = _.sortBy(challenges, 'user_id', function(n) {
                return Math.sin(n);
            });
            const found = challenges.find((challenge) => {
                return (challenge.challengedUser === user.user_id || challenge.user_id === user.user_id);
            });
            if (found) {
                return true;
            }
        }
        return false;
    }

    renderUsers = () => {
        let { challenges } = this.props;

        var sortedUsers = _.sortBy(this.state.users, 'rank', function(n) {
            return Math.sin(n);
        });


        let currentUser = '';
        let challengeMade = '';
        let challengesReceived = '';
        if (localStorage['userId']) {
            currentUser = sortedUsers.find((user) => {
                return user.user_id === localStorage['userId'];
            })
            if (challenges) {
                challenges = Object.values(challenges).filter((challenge) => {
                    return (challenge.active === 1);
                });
                challengesReceived = challenges.find((challenge) => {
                    return challenge.challengedUser === localStorage['userId'];
                })
                if (currentUser) {
                    challengeMade = challenges.find((challenge) => {
                        return challenge.user_id === localStorage['userId'];
                    })
                }
            }
        }

        // create your components
        let userIsChallenged = false;
        return sortedUsers.map((user, i) => {
            let challengeUser = false;
            let isUserChallendedValue = false;
            let buttonText = 'Challenge';
            let currentUserClass = '';
            if (currentUser) {
                if (Math.abs(parseInt(currentUser.rank, 10) - parseInt(user.rank, 10)) <= 2 && Math.abs(parseInt(currentUser.rank, 10) - parseInt(user.rank,10)) > 0) {
                    isUserChallendedValue = this.isUserChallenged(user, challenges);
                    challengeUser = true;
                }
                if ( currentUser.user_id === user.user_id ) {
                    currentUserClass = 'currentUser';
                }
            }
            if (challengeMade || challengesReceived) {
                if ((challengeMade && user.user_id === challengeMade.challengedUser) || ((challengesReceived && user.user_id === challengesReceived.user_id)  && !userIsChallenged && !isUserChallendedValue)) {
                    buttonText = 'To be played';
                    userIsChallenged = true;
                } else if (userIsChallenged === true || challengeMade || challengesReceived || isUserChallendedValue) {
                    buttonText = '';
                }
            } else if (isUserChallendedValue) {
                buttonText = '';
            }
            return(
                <li key={i} className={currentUserClass}><span>{user.rank} {user.email}</span>   {challengeUser && <ChalelngeUser buttonText={buttonText} challengeMade = {challengeMade} challengesReceived = {challengesReceived}   user={user} currentUser={currentUser} /> } </li>
            );
        });

    }

    render() {
        return (
            <div className="ranking">
                {this.renderUsers()}
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
    return bindActionCreators({fetchUsersData, fetchChalenges}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(Ranking);


