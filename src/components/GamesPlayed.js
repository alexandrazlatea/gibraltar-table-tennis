import React, {Component} from 'react';
import {renderView, fetchPlayedGames} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Timestamp from 'react-timestamp';
import * as classnames from 'classnames';
import _ from 'lodash';
import moment from 'moment'

class GamesPlayed extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            playedGames: '', 
            users: '',
            currentPage: 1,
            itemsPerPage: 10,
            initialItemsPerPage: 10,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            playedGames: nextProps.playedGames ? Object.values(nextProps.playedGames) : [], 
            users: nextProps.usersData
        });
    }

    componentDidMount() {
        this.props.fetchPlayedGames();
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
    renderPlayerGames = () => {
        let {playedGames, currentPage, itemsPerPage} = this.state;
        if (playedGames && playedGames.length > 0) {
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;

            const sortedPlayedGames = playedGames.sort((gameA, gameB) => {
                if (gameA.current_date > gameB.current_date) {
                    return -1;
                }
                if (gameA.current_date === gameB.current_date) {
                    return 0;
                }
                return 1;
            });

            const slicedPlayedGames = sortedPlayedGames.slice(indexOfFirstItem, indexOfLastItem);
            
            const groupedGames = _.groupBy(slicedPlayedGames, game => {
                const timeStamp = game.current_date;
                return moment.unix(timeStamp).format("YYYY-MMM-DD");    
            });

            return Object.keys(groupedGames).map((key, index) => {
                const groupedGame = groupedGames[key];
                return (
                    <div className="game-group-container" key={index + key}>
                        <div className="game-group-date">{<Timestamp time={groupedGame[0].current_date} format={"date"} precision={2}/>}</div>
                        <div className="game-group">
                            {groupedGame.map((game, i) => {
                                const firstCompetitorClassnames = classnames({
                                    'first-user-results': true,
                                    'competitor-results-won': game.first_score > game.second_score
                                });
                                const secondCompetitorClassnames = classnames({
                                    'second-user-results': true,
                                    'competitor-results-won': game.first_score < game.second_score
                                });
                                return (
                                    <div className="game" key={i + game.user_id + key}>
                                        <div className={firstCompetitorClassnames}>
                                            <div className="game-competitor">{this.getUsername(game.challengedUser)}</div>
                                            <div className="game-competitor-score">{game.first_score}</div>
                                        </div>
                                        <div className={secondCompetitorClassnames}>
                                            <div className="game-competitor">{this.getUsername(game.user_id)}</div>
                                            <div className="game-competitor-score">{game.second_score}</div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
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

    onPageChange = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    onViewAllGamesClick = () => {
        this.setState({
            itemsPerPage: this.state.playedGames.length,
            currentPage: 1
        });
    }

    onCollapseGamesClick = () => {
        this.setState({
            itemsPerPage: this.state.initialItemsPerPage,
            currentPage: 1
        });
    }

    render() {
        // Logic for displaying page numbers
        const {itemsPerPage, playedGames, currentPage, initialItemsPerPage} = this.state; 

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(playedGames.length / itemsPerPage); i++) {
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
                <div className="played-games">
                    {this.renderPlayerGames()}
                </div>
                {itemsPerPage === initialItemsPerPage && playedGames.length > itemsPerPage && <ul className="page-numbers">
                    {renderPageNumbers}
                </ul>}
                <div className='page-numbers-view-all'>
                    {playedGames.length > itemsPerPage && <span onClick={this.onViewAllGamesClick}>View All</span>}
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
        renderView: state.renderView,
        playedGames: state.playedGames
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({renderView, fetchPlayedGames}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(GamesPlayed);