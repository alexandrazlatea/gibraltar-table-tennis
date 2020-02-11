import React from 'react';

import {fire} from "../fire";
import Ranking from '../components/Ranking';
import Schedule from '../components/Schedule';
import Leaderboard from '../components/Leaderboard';
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
            renderView: '',
            selected: 'schedule',
            leagueType:  (localStorage['league_type']) ? localStorage['league_type'] : 1


    };
    }

    componentDidMount() {

        if (localStorage['userId']) {
            this.checkLoginState();
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            renderView: nextProps.renderView,
            leagueType:  (localStorage['league_type']) ? localStorage['league_type'] : 1
        });
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
        return (
            <section className="team-container">
                <div className="row">
                    <div className="welcome-text">Welcome to the Gibraltar Table Tennis League 2020.</div>

                    <div>

                       <div className="tabs">
                           <div className={this.isActive('schedule')} onClick={this.setFilter.bind(this, 'schedule')}>Schedule</div>
                           {this.state.leagueType ==1 && <div className={this.isActive('teams')} onClick={this.setFilter.bind(this, 'teams')}>Teams</div>}
                           {/*<div className={this.isActive('participants')} onClick={this.setFilter.bind(this, 'participants')}>Participants</div>*/}
                           <div className={this.isActive('leaderboard')} onClick={this.setFilter.bind(this, 'leaderboard')}>Ranking</div>
                       </div>
                        {this.state.selected === 'schedule' && <Schedule/> }
                        {this.state.selected === 'teams' && localStorage['league_type'] == 1 && <Ranking type="teams"/> }
                       {/*{this.state.selected === 'participants' && <Ranking type="participants"/> }*/}
                       {this.state.selected === 'leaderboard' && <Leaderboard type="participants"/> }
                    </div>
                </div>
            </section>
        )

    }
}

function mapStateToProps(state) {
    return {
        renderView: state.renderView,
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({renderView}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(HomepageSection);
