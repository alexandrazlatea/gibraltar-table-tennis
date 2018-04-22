import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchUsersData}  from '../actions/index';
import {fetchChalenges}  from '../actions/index';
import _ from 'lodash';
import ChallengeUser from './ChallengeUser';
import * as classnames from 'classnames';

class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginPopUp : false, 
            challenges : '', 
            renderView: '',
            currentPage: 1,
            itemsPerPage: 10,
            initialItemsPerPage: 10,
            sortedUsers: [],
            currentUser: null
        };
    }

    componentDidMount() {
        this.props.fetchUsersData();
        this.props.fetchChalenges();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({challenges: nextProps.challenges, renderView: nextProps.renderView});

        var sortedUsers = _.sortBy(nextProps.usersData, 'rank', function(n) {
            return Math.sin(n);
        });
        if (sortedUsers && sortedUsers.length > 0) {
            this.setState({sortedUsers});
        }

        let currentUser = this.state.currentUser;
        if ((localStorage['userId'] && !this.state.currentUser) || (localStorage['userId'] && this.state.currentUser && this.state.currentUser.user_id !== localStorage['userId'])) {
            currentUser = sortedUsers.find((user) => {
                return user.user_id === localStorage['userId'];
            })
            this.setState({currentUser});
        }
        
        if (this.state.currentUser && sortedUsers && sortedUsers.length > 0) {
            const indexOfCurrentUser = sortedUsers.indexOf(user => user.user_id === currentUser.user_id);
            const currentPage = parseInt(indexOfCurrentUser / (this.state.itemsPerPage + 1), 10) + 1;
            this.setState({currentPage});
        }
    }

    onPageChange = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
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
        const {sortedUsers, currentPage, itemsPerPage, currentUser} = this.state;

        let challengeMade = '';
        let challengesReceived = '';
        if (currentUser) {
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

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentSortedUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

        return currentSortedUsers.map((user, i) => {
            let challengeUser = false;
            let buttonText = 'Challenge';
            let currentUserClass = '';
            if (currentUser) {
                if (Math.abs(parseInt(currentUser.rank, 10) - parseInt(user.rank, 10)) <= 2 && Math.abs(parseInt(currentUser.rank, 10) - parseInt(user.rank,10)) > 0) {
                    userIsChallenged = this.isUserChallenged(user, challenges);
                    challengeUser = true;
                }
                if ( currentUser.user_id === user.user_id ) {
                    currentUserClass = 'currentUser';
                }
            }
            if (challengeMade || challengesReceived) {
                if ((challengeMade && user.user_id === challengeMade.challengedUser) || ((challengesReceived && user.user_id === challengesReceived.user_id)  && userIsChallenged)) {
                    buttonText = 'To be played';
                    userIsChallenged = true;
                } else if (userIsChallenged || challengeMade || challengesReceived) {
                    buttonText = '';
                }
            } else if (userIsChallenged) {
                buttonText = '';
            }
            const userDataToShow = user.rank + '. ' + user.firstName + ' ' + user.lastName;
            return(
                <li key={i} className={currentUserClass}>
                    <div className={challengeUser ? 'trim-name' : ''}>{userDataToShow}</div>
                    {challengeUser && <ChallengeUser buttonText={buttonText} challengeMade = {challengeMade} challengesReceived = {challengesReceived}   user={user} currentUser={currentUser} /> } 
                </li>
            );
        });

    }

    onViewAllUsersClick = () => {
        this.setState({
            itemsPerPage: this.state.sortedUsers.length,
            currentPage: 1
        });
    }

    onCollapseUsersClick = () => {
        this.setState({
            itemsPerPage: this.state.initialItemsPerPage,
            currentPage: 1
        });
    }

    render() {
        // Logic for displaying page numbers
        const {itemsPerPage, sortedUsers, currentPage, initialItemsPerPage} = this.state; 

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(sortedUsers.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            const pageNumberClassnames = classnames({
                'page-number-selected': number === currentPage
            });
            return (
                <li key={number} id={number} className={pageNumberClassnames} onClick={this.onPageChange} >
                    {number}
                </li>
                );
        });

        return (
            <div>
                <div className="ranking">
                    {this.renderUsers()}
                </div>
                {itemsPerPage === initialItemsPerPage && sortedUsers.length > itemsPerPage && <ul className="page-numbers">
                    {renderPageNumbers}
                </ul>}
                <div className='page-numbers-view-all'>
                    {sortedUsers.length > itemsPerPage && <span onClick={this.onViewAllUsersClick}>View All</span>}
                    {itemsPerPage > initialItemsPerPage && <span onClick={this.onCollapseUsersClick}>Collapse</span>}
                </div>
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


