import React from 'react';

import {fire} from "../fire";
import Ranking from '../components/Ranking';
import * as classnames from 'classnames';
import {bindActionCreators} from "redux";
import {renderView} from "../actions/index";
import {connect} from "react-redux";

class HomepageSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: '',
            showLoginPopUp: false,
            challenges: '',
            type: '',
            renderHeader: '',
        };
    }

    componentDidMount() {

        if (localStorage['userId']) {
            this.checkLoginState();
        }
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

    render() {
        const sectionClassnames = classnames({
            "section-about": true,
            "section-about--disabled": this.state.showLoginPopUp
        });
        return (
            <section className={sectionClassnames}>
                <div className="row">
                    <div className="welcome-text">Welcome to the Gibraltar Table Tennis League 2019. Please register in order to be able to participate. Once we have all the players we'll set up the teams.</div>

                    <div className="col-1-of-2">
                        <h3 className="heading-tertiary u-margin-bottom-small"> Participants </h3>

                        <ul>
                            <Ranking/>
                        </ul>
                    </div>
                </div>
            </section>
        )

    }
}


function mapDispatchtoProps(dispatch) {
    return bindActionCreators({renderView}, dispatch);
}

export default connect(null, mapDispatchtoProps)(HomepageSection);
