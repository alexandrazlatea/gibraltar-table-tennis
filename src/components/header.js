import React from 'react';

import {fire} from "../fire";
import LoginPopUp from '../components/LoginPopUp';
import * as classnames from 'classnames';
import {connect} from "react-redux";
import {renderView} from "../actions";
import {bindActionCreators} from "redux";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: '',
            showLoginPopUp: false,
            challenges: '',
            type: '',
            renderHeader: '',
            expiredChallenges: '',
            leagueType: 1,
            renderView: ''
        };
    }

    componentDidMount() {
        if (localStorage['userId']) {
            this.checkLoginState();
        }
        localStorage['league_type'] = (localStorage['league_type']) ? localStorage['league_type'] : 1;
    }

    checkLoginState = () => {
        fire.auth().onAuthStateChanged(user => {
            if (!user || (user && user.uid !== localStorage['userId'])) {
                localStorage.removeItem('userId');
                this.setState({renderHeader: Math.floor(Math.random() * 90 + 10)})
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

    onClickSwapLeague = () => {
        let league_type = this.state.leagueType == 1 ? 2 : 1;
        localStorage['league_type'] = league_type;
        this.setState({leagueType: league_type});
        this.props.renderView(Math.floor(Math.random() * 90 + 10));
    }

    onClickLogout = () => {
        localStorage.removeItem('userId');
        this.setState({renderHeader: Math.floor(Math.random() * 90 + 10)})
        this.props.renderView(Math.floor(Math.random() * 90 + 10));
    }

    render() {
        const headerClassnames = classnames({
            "header": true,
            "header--disabled": this.state.showLoginPopUp
        });
        return (
            <div className="header-component">
                {this.state.showLoginPopUp &&
                <LoginPopUp type={this.state.type} getCurrentUser={this.saveCurrentUser} onHide={this.onHide}/>}
                <header className={headerClassnames}>
                    <div className="header__logo-box">
                    </div>
                    <div className="header__text-box">
                        <h1 className="heading-primary">
                            <span className="heading-primary--main">BASEWELL</span>
                            <span className="heading-primary--sub">table tennis league</span>
                            {this.state.leagueType == 1 && <div className="header_league_type" onClick={this.onClickSwapLeague}>
                                <span>SENIORS</span>
                            </div>}
                            {this.state.leagueType == 2 && <div className="header_league_type" onClick={this.onClickSwapLeague}>
                                <span>JUNIORS</span>
                            </div>}
                        </h1>

                        {!this.state.showLoginPopUp && !localStorage['userId'] &&
                        <button onClick={() => this.onClickLogin('login')}
                                className="btn btn--white btn--animated">Login</button>}
                        {/*{!this.state.showLoginPopUp && !localStorage['userId'] &&*/}
                        {/*<button onClick={() => this.onClickLogin('signup')}*/}
                                {/*className="btn btn--white btn--animated">Register league 2019</button>}*/}
                        {localStorage['userId'] && <h2 className="welcome-header">Welcome</h2>}
                        {this.state.leagueType == 1 && <div className="header_league_type" onClick={this.onClickSwapLeague}>
                            <button>GO TO JUNIORS LEAGUE</button>
                        </div>}
                        {this.state.leagueType == 2 && <div className="header_league_type" onClick={this.onClickSwapLeague}>
                            <button>GO TO SENIORS LEAGUE</button>
                        </div>}
                    </div>

                    {localStorage['userId'] && <div className="header__logout" onClick={this.onClickLogout}>
                        <span>Log Out</span>
                    </div>}


                </header>

            </div>
        )
    }
}


function mapDispatchtoProps(dispatch) {
    return bindActionCreators({renderView}, dispatch);
}

export default connect(null, mapDispatchtoProps)(Header);
