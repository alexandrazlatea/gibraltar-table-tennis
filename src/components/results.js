import React, {Component} from 'react';
import {fetchResults} from '../actions/index';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getGirls} from "../utils/businessRule";

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {sort: '', numberOfVotes: ''};

    }

    componentDidMount() {
        this.props.fetchResults();
    }

    showResults = (numberOfVotes) => {
        const girls = getGirls();
        let keyss = [];
        if (this.state.sort) {
            let sortt = this.state.sort;
            keyss = Object.keys(girls);
            sortt.sort(function (a, b) {
                return sortt[a] < sortt[b];
            });
            return keyss.map(function (option) {
                    let percentaje = 0;
                    if (sortt[girls[option]['field']]) {
                        percentaje = (Math.round((sortt[girls[option]['field']] * 100) / numberOfVotes)).toFixed(2);
                    }
                    return (
                        <div class="result">
                            <div class="girl-name"><span>{girls[option]['name']} </span></div>
                            <progress max="100" value={percentaje}></progress>
                            <span>{percentaje} %</span>
                        </div>
                    )

                }
            );
        }
    }

    sortGirls = (sortt) => {
        sortt.sort(function (a, b) {
            console.log('intra');
            /*console.log(sortt[a]);
            var direction = 1;
            if ( sortt[a] == sortt[b] ) return 0;
            return sortt[a] < sortt[b] ? -direction : direction;*/
        });
    }

    componentWillReceiveProps(nextProps) {
        const {results} = nextProps;
        let sort = [];
        Object.keys(results).map(function (result, index) {
            if (sort[results[result].girl]) {
                sort[results[result].girl] = parseInt(sort[results[result].girl]) + 1;
            } else {
                sort[results[result].girl] = 1;
            }
        });
        console.log(Object.keys(results).length);
        this.setState({sort: sort, numberOfVotes: Object.keys(results).length});
    }

    render() {
        const {results} = this.props;
        return (
            <div class="section-tours">
                <h2> Multumim pentru votul tau. Votarea se reseteaza incepand cu saptamana viitoare. </h2>
                {this.showResults(this.state.numberOfVotes)}
            </div>
        )
    }


}

function mapStateToProps(state) {
    return {
        results: state.results
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({fetchResults}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(Results);

