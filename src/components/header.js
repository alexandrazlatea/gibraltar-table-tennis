import React from 'react';

import {fire} from "../fire";
import Ranking from '../components/Ranking';
import LoginPopUp from '../components/LoginPopUp';
import NextGames from '../components/NextGames';
import GamesPlayed from '../components/GamesPlayed';
import * as classnames from 'classnames';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {renderView} from "../actions/index";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users: '', showLoginPopUp : false, challenges : '', type: '', renderHeader: ''};
    }

    componentDidMount() {
        if (localStorage['userId']) {
            this.checkLoginState();
        }
    }
    checkLoginState =  () => {
        fire.auth().onAuthStateChanged(user => {
           if (!user || (user && user.uid !== localStorage['userId']))  {
               localStorage.removeItem('userId');
               this.setState({renderHeader : Math.floor(Math.random() * 90 + 10)})
               this.props.renderView(Math.floor(Math.random() * 90 + 10));
           }
        });
    }

    saveCurrentUser = (user) => {
        localStorage['userId'] = user.uid;
    }

    onHide = () => {
        this.setState({showLoginPopUp: !this.state.showLoginPopUp});
    }

    onClickLogin = (type) => {
        this.setState({showLoginPopUp: !this.state.showLoginPopUp, type: type});
    }

    onClickLogout = () => {
        localStorage.removeItem('userId');
        this.setState({renderHeader : Math.floor(Math.random() * 90 + 10)})
        this.props.renderView(Math.floor(Math.random() * 90 + 10));
    }

    render() {
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
                {this.state.showLoginPopUp && <LoginPopUp type={this.state.type}  getCurrentUser={this.saveCurrentUser} onHide={this.onHide}/> }
                <header className={headerClassnames}>
                    <div className="header__logo-box">
                    </div>
                    <div className="header__text-box">
                        <h1 className="heading-primary">
                            <span className="heading-primary--main">Office</span>
                            <span className="heading-primary--sub">table tennis</span>
                        </h1>

                        {!this.state.showLoginPopUp && !localStorage['userId'] && <button onClick={() => this.onClickLogin('login')} className="btn btn--white btn--animated">Login</button> }
                        {!this.state.showLoginPopUp && !localStorage['userId'] && <button onClick={() => this.onClickLogin('signup')} className="btn btn--white btn--animated">Sign up</button> }
                        {localStorage['userId'] && <h2 className="welcome-header">Welcome</h2> }

                    </div>
                    {localStorage['userId'] && <div className="header__logout" onClick={this.onClickLogout}>
                        <span>Log Out</span>
                    </div>}
                </header>

                <section className={sectionClassnames}>
                    <div className="row">
                        <div className="col-1-of-2">
                            <h3 className="heading-tertiary u-margin-bottom-small"> Ranking </h3>
                            <ul>
                                <Ranking />
                            </ul>
                        </div>
                        <div className="col-1-of-2">
                            <h3 className="heading-tertiary u-margin-bottom-small"> Next Games </h3>
                            <NextGames />
                        </div>


                    </div>
                    <div className="row">
                        <div className="col-1-of-2">
                            <h3 className="heading-tertiary u-margin-bottom-small"> Rules </h3>
                            <p className="paragraph">
                                1. New players may join the ladder at any time, entering at the bottom of their chosen skill group. <br></br>
                                2. At any time, you may challenge either of the players ranked one or two places above you,
                            by sending email to that player.<br></br>
                                3. The match must occur within one week of the challenge. If a challenged player is unable to play
                        during that week, or if the challenger receives no reply within a week, then the challenger wins by forfeit.<br></br>
                                4. A challenged player will not be required to play more than one match per week. <br></br>
                                5. You can challenge only one player. <br></br>
                                6. A match will consist of 3 of 5 games played to 11 points each.<br></br>
                                7. The winner of the match should report the scores using the Match Report form. If the challenger
        wins, the two players shall swap ranks, and the ladder will be updated.<br></br>
                            </p>
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

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({renderView}, dispatch);
}

export default connect(null, mapDispatchtoProps)(Header);
