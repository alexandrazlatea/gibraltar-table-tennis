import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {fire} from "../fire";
import {renderView, updateChallenge, SwapRanks} from "../actions/index";
import {bindActionCreators} from "redux";
import * as classnames from 'classnames';

class NextGames extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            challenges: [],
            filteredChallenges: [],
            users: '',
            renderView: '', 
            secondScore: '', 
            firstScore: '',
            currentPage: 1,
            itemsPerPage: 10,
            initialItemsPerPage: 10,
        });

    }

    componentWillReceiveProps(nextProps) {
        const filteredChallenges = nextProps.challenges ? Object.values(nextProps.challenges).filter((challenge) => {
            return (challenge.active === 1);
        }) : [];
        this.setState({
            challenges : nextProps.challenges ? Object.values(nextProps.challenges) : [],
            filteredChallenges,
            users : nextProps.usersData,
            renderView: nextProps.renderView
        });
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
            current_date: Math.floor(Date.now() / 1000),
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

        const {filteredChallenges} = this.state;
        if (filteredChallenges && filteredChallenges.length > 0) {
            const {currentPage, itemsPerPage} = this.state;
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            const sortedFilteredChallenges = [...filteredChallenges].reverse();
            const slicedChallenges = sortedFilteredChallenges.slice(indexOfFirstItem, indexOfLastItem);

            return slicedChallenges.map((challenge, index) => {
                return (
                    <div className="next-game" key={index + challenge.user_id}>
                        <div className="first-user">
                            <div className="game-competitor">{challenge.userName}</div>
                            {(currentUser && (currentUser.user_id === challenge.user_id || currentUser.user_id === challenge.challengedUser)) &&
                                <input onChange={this.handleChangeFirstName} name="first_score" type="number" className="quantity"></input>
                            }
                        </div>
                        <div className="second-user">
                            <div className="game-competitor">{challenge.userChallengedName}</div>
                            {(currentUser && (currentUser.user_id === challenge.user_id || currentUser.user_id === challenge.challengedUser)) &&
                                <input onChange={this.handleChangeSecondName} name="last_score" type="number" className="quantity"></input>
                            }
                        </div>
                        {(currentUser && (currentUser.user_id === challenge.user_id || currentUser.user_id === challenge.challengedUser)) &&
                            <div className="next-game-button">
                                <button onClick={() => this.handleSubmit(challenge)}>Save</button>
                            </div>
                        }
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

    onPageChange = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    onViewAllGamesClick = () => {
        this.setState({
            itemsPerPage: this.state.filteredChallenges.length,
            currentPage: 1
        });
    }

    onCollapseGamesClick = () => {
        this.setState({
            itemsPerPage: this.state.initialItemsPerPage,
            currentPage: 1
        });
    }

    render () {
        // Logic for displaying page numbers
        const {itemsPerPage, filteredChallenges, currentPage, initialItemsPerPage} = this.state; 

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredChallenges.length / itemsPerPage); i++) {
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
                <div className="next-games">
                    {this.renderNextGames()}
                </div>
                {itemsPerPage === initialItemsPerPage && filteredChallenges.length > itemsPerPage &&  <ul className="page-numbers">
                    {renderPageNumbers}
                </ul>}
                <div className='page-numbers-view-all'>
                    {filteredChallenges.length > itemsPerPage && <span onClick={this.onViewAllGamesClick}>View All</span>}
                    {itemsPerPage > initialItemsPerPage && <span onClick={this.onCollapseGamesClick}>Collapse</span>}
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
    return bindActionCreators({renderView, updateChallenge, SwapRanks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(NextGames);

