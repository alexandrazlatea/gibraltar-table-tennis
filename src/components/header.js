import React from 'react';
import {connect} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import {fire} from "../fire";
import {fetchUsersData}  from '../actions/index';
import {bindActionCreators} from 'redux';
import Ranking from '../components/Ranking';
import LoginPopUp from '../components/LoginPopUp';
import ChalelngeUser from '../components/ChalelngeUser';
import _ from 'lodash';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users: '', showLoginPopUp : false};
    }

    componentDidMount() {
        if (localStorage['userId']) {
            this.checkLoginState();
        }
    }
    checkLoginState() {
        fire.auth().onAuthStateChanged(user => {
             console.log(user);
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({users: nextProps.usersData});
    }

    saveCurrentUser = (user) => {
        console.log(user);
        localStorage['userId'] = user.uid;
    }

    onHide = () => {
        this.setState({showLoginPopUp: !this.state.showLoginPopUp});
    }

    onClickLogin = () => {
        console.log('click login');
        this.setState({showLoginPopUp: !this.state.showLoginPopUp});
    }

    renderUsers = () => {

        var sortedUsers = _.sortBy(this.state.users, 'rank', function(n) {
            return Math.sin(n);
        });
        let currentUser = '';
        if (localStorage['userId']) {
             currentUser = sortedUsers.find((user) => {
                return user.user_id === localStorage['userId'];
            })
        }
        let challengeUser = false;

        // create your components
        return sortedUsers.map(function(user) {
            let challengeUser = false;
            if (currentUser) {
                if (Math.abs(parseInt(currentUser.rank) - parseInt(user.rank)) <= 2 && Math.abs(parseInt(currentUser.rank) - parseInt(user.rank)) > 0) {
                    challengeUser = true;
                }
            }
            return(
                <li>{user.rank} {user.email}  {challengeUser && <ChalelngeUser user={user} currentUser={currentUser} /> } </li>
            );
        });

    }

    render() {
        const {usersData} = this.props;
        const prof = (usersData && usersData.profile_image) ? usersData.profile_image : '';
        return (
            <div className="header-component">
                <header class="header">
                    <div class="header__logo-box">
                    </div>
                    <div class="header__text-box">
                        <h1 class="heading-primary">
                            <span class="heading-primary--main">Office</span>
                            <span class="heading-primary--sub">table tennis</span>
                        </h1>

                        {!this.state.showLoginPopUp && !localStorage['userId'] && <button onClick={() => this.onClickLogin()} className="btn btn--white btn--animated">Login</button> }
                    </div>
                    {this.state.showLoginPopUp && <LoginPopUp getCurrentUser={this.saveCurrentUser} onHide={this.onHide}/> }

                </header>

                <section class="section-about">
                    <div class="u-center-text u-margin-bottom-big">
                        <h2 class="heading-secondary">

                        </h2>

                    </div>

                    <div class="row">
                        <div class="col-1-of-2">
                            <h3 class="heading-tertiary u-margin-bottom-small"> Ranking </h3>
                            <Ranking />
                            <ul>
                                {this.renderUsers()}
                            </ul>
                        </div>
                        <div class="col-1-of-2">
                            <h3 class="heading-tertiary u-margin-bottom-small"> Rules </h3>
                            <p class="paragraph">
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
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        usersData: state.usersData
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({fetchUsersData}, dispatch);
}

export default connect (mapStateToProps, mapDispatchtoProps)(Header);