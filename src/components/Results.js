import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchResults}  from '../actions/index';


class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results : [],
        };
    }

    componentDidMount() {
        this.props.fetchResults(this.props.teamA, this.props.teamB, this.props.round);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            results: nextProps.results,
        });

    }

    renderResults = () => {
        const {results} = this.state;
        if (results.length > 0) {
            return results.map((team, i) => {
                return (
                    <li key={i} className="results-popup-result">
                        <div className="results-popup-result-column to-left">{team.Player1FirstName} {team.Player1LastName}</div>
                        <div className="results-popup-result-column middle">
                            <input disabled type="number"/>
                            <span> : </span>
                            <input disabled type="number"/>
                        </div>
                        <div className="results-popup-result-column to-right">{team.Player2FirstName} {team.Player2LastName}</div>
                    </li>
                )            });
            ;
        }
    }

    render() {
        const { hideResults } = this.props;
        return (
            <div id="popup1" className="overlay results">
                <div className="popup results-popup">
                    <div className="results-popup-header">
                        <h2>Results</h2>
                        <a className="close results-popup-close" href="#" onClick={hideResults}>&times;</a>
                    </div>
                    <div className="content results-popup-content">
                        <ul className="results-list">
                            {this.renderResults()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }


}
function mapStateToProps(state) {
    return {
        results: state.results,
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({fetchResults}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(Results);



