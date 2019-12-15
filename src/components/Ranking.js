import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchUsersData}  from '../actions/index';
import {fetchChalenges}  from '../actions/index';
import _ from 'lodash';

class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginPopUp : false, 
            challenges : '', 
            renderView: '',
            currentPage: 1,
            itemsPerPage: 20,
            initialItemsPerPage: 20,
            sortedUsers: [],
            usersData: [],
            currentUser: null,
            type: ''
        };
    }

    componentDidMount() {
        this.props.fetchUsersData();
        this.props.fetchChalenges();
        this.interval = setInterval(() => {
            this.props.fetchChalenges();
        }, 10000000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({challenges: nextProps.challenges, renderView: nextProps.renderView, usersData: Object.values(nextProps.usersData)});

        if (!localStorage['userId'] && this.state.currentUser) {
            this.setState({
                currentUser: null
            });
        }
        var sortedUsers = _.sortBy(nextProps.usersData, 'seed', function(n) {
            return Math.sin(n);
        });
        if (sortedUsers && sortedUsers.length > 0) {
            this.setState({sortedUsers});
        }

        let currentUser = this.state.currentUser;
        if (localStorage['userId']) {
            if (!this.state.currentUser || (currentUser && currentUser.user_id !== localStorage['userId'])) {
                // if the current logged in user is not set in the state
                // or a new user is being logged in
                currentUser = sortedUsers.find((user) => {
                    return user.user_id === localStorage['userId'];
                })
                this.setState({currentUser});
            } else if (currentUser.user_id === localStorage['userId']) {
                // the current user is the actual user, so update the ranking if it is changed
                const newUser = sortedUsers.find((user) => {
                    return user.user_id === localStorage['userId'];
                });
                if (newUser.rank !== currentUser.rank) {
                    this.setState({
                        currentUser: newUser
                    });
                }
            }
        }
        
        if (this.state.currentUser && sortedUsers && sortedUsers.length > 0) {
            const indexOfCurrentUser = sortedUsers.indexOf(user => user.user_id === currentUser.user_id);
            const currentPage = parseInt(indexOfCurrentUser / (this.state.itemsPerPage + 1), 10) + 1;
            this.setState({currentPage});
        }
    }

    renderUsers = () => {
        const {usersData} = this.state;


        return usersData.map((user, i) => {
            let challengeUser = false;
            const userDataToShow = user.rank + '. ' + user.firstName + ' ' + user.lastName;
            return(
                <li key={i}>
                    <div className={challengeUser ? 'trim-name' : ''}>{userDataToShow}</div>
                </li>
            );
        });

    }

    renderPlayers = (team) => {
        return team.map((player, i) => {
            return (
                <li key={i}>
                    {player.firstName + " " + player.lastName}
                </li>
            );

        });
    }

    renderTeams = () => {
        const {sortedUsers} = this.state;
        var groups = _.groupBy(sortedUsers,  'team');

        var arr_groups = Object.entries(groups)
        if (arr_groups.length > 0) {
            return arr_groups.map((team, i) => {
                    return (
                        <ul key={i}>
                            <li>Team {team[0]}</li>
                            {this.renderPlayers(team[1])}
                        </ul>
                    );

                });
        }

    }

    render() {
        return (
            <div>
                {this.props.type === 'teams' && <div className="ranking">
                    {this.renderTeams()}
                </div> }
                {this.props.type === 'participants' && <div className="ranking">
                    {this.renderUsers()}
                </div> }
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


