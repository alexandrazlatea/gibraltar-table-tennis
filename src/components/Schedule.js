import React, {Component} from 'react';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchSchedule}  from '../actions/index';
import Modal from "react-responsive-modal";
import Results from '../components/Results';


import _ from 'lodash';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule : [],
            showResults: false,
            teamA: '',
            teamB: '',
            round: '',
            renderView: '',
            open: false,
        };
    }

    componentDidMount() {
        this.props.fetchSchedule();
    }
    componentDidUpdate(prevProp, prevState) {
        if (prevState.renderView != this.state.renderView) {
            this.props.fetchSchedule();
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            schedule: nextProps.schedule,
            renderView: nextProps.renderView
        });

    }


    handleCheck = (e) => {
        this.setState({ showResults: true });
        this.setState({ teamA_id: e.currentTarget.dataset.teama  });
        this.setState({ teamB_id: e.currentTarget.dataset.teamb  });
        this.setState({ round: e.currentTarget.dataset.round  });
    };
    renderTeams = (team) => {
        return team.map((player, i) => {
            return (
                <li className="main-team-list-item" key={i} onClick={this.handleCheck.bind(this)} data-teama={player.teamA_id} data-teamb={player.teamB_id} data-round={player.round}>
                    {player.teamA } <div><span class="team-score"> {player.scoreA} </span> - <span class="team-score"> {player.scoreB}  </span></div>  {player.teamB}
                    <button className="main-team-list-item-button" onClick={this.handleCheck.bind(this)} data-teama={player.teamA_id} data-teamb={player.teamB_id} data-round={player.round}>Results</button>
                </li>
        );

        });
    }
    renderSchedule = () => {
        const {schedule} = this.state;
        var groups = _.groupBy(schedule,  'round_date')
        var arr_groups = Object.entries(groups)
        if (arr_groups.length > 0) {
            return arr_groups.map((team, i) => {
                return (
                    <div key={i + 'container'}>
                        <ul key={i} className="main-team-list">
                            <li> {team[0]}</li>
                            {this.renderTeams(team[1])}
                        </ul>

                    </div>
                );
            });
        }
    }

    hideResults = () => {
        this.setState({
            showResults: false,
        });
    };

    render() {
        const { showResults, teamA_id, teamB_id, round } = this.state;

        return (
            <div className="main-schedule-grid">
                {this.renderSchedule()}
                {showResults && <Results hideResults={this.hideResults} teamA={teamA_id} teamB={teamB_id} round={round} type="single_team"/>}

            </div>
        )
    }


}
function mapStateToProps(state) {
    return {
        schedule: state.schedule,
        renderView: state.renderView,

    }
}
function mapDispatchtoProps(dispatch) {
    return bindActionCreators({fetchSchedule}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(Schedule);



