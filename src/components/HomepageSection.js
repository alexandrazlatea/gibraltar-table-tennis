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
            selected: 'teams'
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

    setFilter = (filter) => {
        this.setState({selected  : filter})
    }
    isActive = (value) => {
        return 'btn '+((value === this.state.selected) ?'active':'default');
    }

    render() {
        const sectionClassnames = classnames({
            "section-about": true,
            "section-about--disabled": this.state.showLoginPopUp
        });
        return (
            <section className="team-container">
                <div className="row">
                    <div className="welcome-text">Welcome to the Gibraltar Table Tennis League 2019. Please register in order to be able to participate. Once we have all the players we'll set up the teams.</div>

                    <div className="col-1-of-2">

                       <div className="tabs">
                           <button type="button" className={this.isActive('teams')}  onClick={this.setFilter.bind(this, 'teams')}>Teams</button>
                           <button type="button " className={this.isActive('participants')}  onClick={this.setFilter.bind(this, 'participants')}>Participants</button>
                           <button type="button" className={this.isActive('schedule')}   onClick={this.setFilter.bind(this, 'schedule')}>Schedule</button>
                       </div>
                       {this.state.selected == 'teams' && <Ranking type="teams"/> }
                       {this.state.selected == 'participants' && <Ranking type="participants"/> }
                       {this.state.selected == 'schedule' && <span>Coming soon</span>}
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
