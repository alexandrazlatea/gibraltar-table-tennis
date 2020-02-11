import React from 'react';
//import {fetchUsersData}  from '../actions/index';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchLeaderboard}  from '../actions/index';


class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leaderboard: [],
        };
    }

    componentDidMount() {
        this.props.fetchLeaderboard();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({leaderboard: nextProps.leaderboard});
    }
    compare = (a, b) => {
        return b.total - a.total;
    }

    renderLeaderboard = () => {
        const {leaderboard} = this.state;
        if (leaderboard.length > 0) {
            let leaderboard1 = leaderboard.sort(this.compare);
            return leaderboard1.map((team, i) => {
                return (
                    <ul className="leaderboard-ul">
                        <li><span>{i+1}</span></li>
                        <li><span>{team.Name}</span></li>
                        <li><span>{team.games_played}</span></li>
                        <li><span>{team.total}</span></li>
                    </ul>
                )
            });
            ;
        }
    }

    render() {
        return (
            <div className="leaderboard">
                <div>
                    <ul className="leaderboard-ul leaderboard-ul-header">
                        <li><span>Rank</span></li>
                        <li><span>Name</span></li>
                        <li><span>Games Played</span></li>
                        <li><span>Points</span></li>
                    </ul>
                    {this.renderLeaderboard()}
                </div>
            </div>
        )
    }


}
function mapStateToProps(state) {
    return {
        leaderboard: state.leaderboard,
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({fetchLeaderboard}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(Leaderboard);
