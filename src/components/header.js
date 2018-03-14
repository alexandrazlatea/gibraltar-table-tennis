import React from 'react';
import {connect} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import {fire} from "../fire";
import {fetchUsersData}  from '../actions/index';
import {bindActionCreators} from 'redux';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users: ''};
    }
    componentDidMount() {
        if (localStorage['userId']) {
            this.checkLoginState();
        }
    }
    checkLoginState() {
        this.props.fetchUsersData();

        /*const db = firebaseLogin.database('users');
        const query = db
                        .orderByChild('user_id')
            .equalTo(localStorage['userId'])

        query.on('value', snap => {
            console.log(snap);
        })*/

    }

    componentWillReceiveProps(nextProps) {
        console.log(this.state.users);
    }

    render() {
        const {usersData} = this.props;
        const prof = (usersData && usersData.profile_image) ? usersData.profile_image : '';
        return (
            <div className="header-component">
                <header class="header">
                    <div class="header__logo-box">
                        <img src={(usersData && usersData.profile_image) ? usersData.profile_image : ''} alt="Logo" class="header__logo"></img>
                    </div>
                    <div class="header__text-box">
                        <h1 class="heading-primary">
                            <span class="heading-primary--main">Bravo</span>
                            <span class="heading-primary--sub">ai stil</span>
                        </h1>

                        <a href="#section-tours" class="btn btn--white btn--animated">Voteaza concurenta favorita</a>
                    </div>
                </header>
                <section class="section-about">
                    <div class="u-center-text u-margin-bottom-big">
                        <h2 class="heading-secondary">

                        </h2>
                    </div>

                    <div class="row">
                        <div class="col-1">
                            <h3 class="heading-tertiary u-margin-bottom-small">Despre sistemul de votare</h3>
                            <p class="paragraph">
                                Bine ati venit pe singurul site care reda aproape 90% realitatea voturilor celebrului
                                show de televiziune
                                Bravo ai Stil!

                                L-am creat din cauza disputelor intre concurente cum ca s-ar face conturi false si unele
                                concurente sunt votate
                                de pe conturi false. Tocmai de accea am interzis votarea de pe conturile care au un
                                numar mic de prieteni.
                                De pe un singur cont de facebook se poate vota o singura data.

                                Sistemul va fi resetat in fiecare luni. Haideti sa vedem cine e cea mai buna.
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