import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {renderView, updateChallenge} from "../actions";
import {connect} from "react-redux";
import moment from 'moment';

class expiredChallenges extends  Component {

    constructor(props) {
        super(props);
        this.state = ({challenges : ''});

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.challenges) {
            this.setState({challenges: nextProps.challenges});
        }
    }
    updateExpiredChallenges =() => {
        let challenges = this.state.challenges;
        const currentTime = Math.floor(Date.now() / 1000);
        if (challenges) {
            Object.keys(challenges).map((item, i) => {
                if ((moment(currentTime)).diff(moment(challenges[item].current_date)) > 259200 && challenges[item].active == 1) {
                    this.props.updateChallenge(challenges[item].user_id, 'expired', challenges[item]);
                }
            });
        }
    }
    render() {
        this.updateExpiredChallenges();
        return ('');
    }
}


function mapStateToProps(state) {
    return {
        challenges: state.challenges,
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({renderView, updateChallenge}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(expiredChallenges);
