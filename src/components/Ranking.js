import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchUsersData}  from '../actions/index';
import {fetchChalenges}  from '../actions/index';
import _ from 'lodash';
import * as classnames from 'classnames';


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
            currentUser: null
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
        this.setState({challenges: nextProps.challenges, renderView: nextProps.renderView});

        if (!localStorage['userId'] && this.state.currentUser) {
            this.setState({
                currentUser: null
            });
        }
        var sortedUsers = _.sortBy(nextProps.usersData, 'rank', function(n) {
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

    onPageChange = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }



    renderUsers = () => {
        const {sortedUsers, currentPage, itemsPerPage} = this.state;


        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentSortedUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

        return currentSortedUsers.map((user, i) => {
            let challengeUser = false;
            let currentUserClass = '';
            const userDataToShow = user.rank + '. ' + user.firstName + ' ' + user.lastName;
            return(
                <li key={i} className={currentUserClass}>
                    <div className={challengeUser ? 'trim-name' : ''}>{userDataToShow}</div>
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


