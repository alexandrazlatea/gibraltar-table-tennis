import React from 'react';
import {connect} from 'react-redux';

import {fire} from "../fire";
import {fetchUsersData}  from '../actions/index';
import {fetchChalenges}  from '../actions/index';
import {bindActionCreators} from 'redux';
import Ranking from '../components/Ranking';
import LoginPopUp from '../components/LoginPopUp';
import NextGames from '../components/NextGames';
import GamesPlayed from '../components/GamesPlayed';
import * as classnames from 'classnames';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users: '', showLoginPopUp : false, challenges : ''};
    }

    componentDidMount() {
        if (localStorage['userId']) {
            this.checkLoginState();
        }
    }
    checkLoginState() {
        fire.auth().onAuthStateChanged(user => {
        });
    }



    saveCurrentUser = (user) => {
        localStorage['userId'] = user.uid;
    }

    onHide = () => {
        this.setState({showLoginPopUp: !this.state.showLoginPopUp});
    }

    onClickLogin = () => {
        this.setState({showLoginPopUp: !this.state.showLoginPopUp});
    }



    render() {
        console.log(this.state.challenges, 'challenges');
        const {usersData} = this.props;
        const prof = (usersData && usersData.profile_image) ? usersData.profile_image : '';
        const headerClassnames = classnames({
            "header" : true,
            "header--disabled": this.state.showLoginPopUp
        });
        const sectionClassnames = classnames({
            "section-about" : true,
            "section-about--disabled": this.state.showLoginPopUp
        });
        return (
            <div className="header-component">
                {this.state.showLoginPopUp && <LoginPopUp getCurrentUser={this.saveCurrentUser} onHide={this.onHide}/> }
                <header className={headerClassnames}>
                    <div className="header__logo-box">
                    </div>
                    <div className="header__text-box">
                        <h1 className="heading-primary">
                            <span className="heading-primary--main">Office</span>
                            <span className="heading-primary--sub">table tennis</span>
                        </h1>

                        {!this.state.showLoginPopUp && !localStorage['userId'] && <button onClick={() => this.onClickLogin()} className="btn btn--white btn--animated">Login</button> }
                    </div>

                </header>

                <section className={sectionClassnames}>
                    <div className="u-center-text u-margin-bottom-big">
                        <h2 className="heading-secondary">

                        </h2>

                    </div>

                    <div className="row">
                        <div className="col-1-of-2">
                            <h3 className="heading-tertiary u-margin-bottom-small"> Ranking </h3>
                            <ul>
                                <Ranking />
                            </ul>
                        </div>
                        <div className="col-1-of-2">
                            <h3 className="heading-tertiary u-margin-bottom-small"> Rules </h3>
                            <p className="paragraph">
                                1. New players may join the ladder at any time, entering at the bottom of their chosen skill group. <br></br>
                                2. At any time, you may challenge either of the players ranked one or two places above you,
                            by sending email to that player.<br></br>
                                3. The match must occur within one week of the challenge. If a challenged player is unable to play
                        during that week, or if the challenger receives no reply within a week, then the challenger wins by forfeit.<br></br>
                                4. A challenged player will not be required to play more than one match per week. If a second
                    challenge occurs within the same week, the challenged player may postpone the challenge until the next week.<br></br>
                                5. If a player issues a challenge and then is challenged from below before the first match takes place,
                the second challenge is held in abeyance until the first match is resolved. For example, suppose player #4 has challenged #3,
                but then receives a challenge from player #6. If #4 beats #3, the challenge from #6 is no longer valid. However, if #4 loses to
                #3, the challenge from #6 becomes valid, and should be played within one week.<br></br>
                                6. A match will consist of two games played to 15 points each. If each side wins one game,
            then a third game is played to 11 points. You only win points when you are serving, and you don't need to win by two points.<br></br>
                                7. The winner of the match should report the scores using the Match Report form. If the challenger
        wins, the two players shall swap ranks, and the ladder will be updated.<br></br>
                            </p>

                        </div>


                    </div>
                    <div className="row">
                        <div className="col-1-of-2">
                            <h3 className="heading-tertiary u-margin-bottom-small"> Next Games </h3>
                            <NextGames />
                        </div>
                        <div className="col-1-of-2">
                            <h3 className="heading-tertiary u-margin-bottom-small"> Played Games </h3>
                            <GamesPlayed />
                        </div>


                    </div>
                </section>
            </div>
        )
    }
}


export default (Header);