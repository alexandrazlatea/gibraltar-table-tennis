import React from 'react';
//import {fetchUsersData}  from '../actions/index';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchLeaderboard}  from '../actions/index';
import {renderView} from "../actions/index";


class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leaderboard: [],
            renderView: '',

        };
    }

    componentDidMount() {
        this.props.fetchLeaderboard();
    }

    componentDidUpdate(prevProp, prevState) {
        if (prevState.renderView != this.state.renderView) {
            this.props.fetchLeaderboard();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            leaderboard: nextProps.leaderboard,
            renderView: nextProps.renderView
        });
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
                        <li><span>Played</span></li>
                        <li><span>Total</span></li>
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
        renderView: state.renderView
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({fetchLeaderboard, renderView}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(Leaderboard);
