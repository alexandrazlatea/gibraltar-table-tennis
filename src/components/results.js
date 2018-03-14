import React, {Component} from 'react';
import {fetchResults} from '../actions/index';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class Results extends  Component {
    constructor(props) {
        super(props);
        this.state={sort: '', numberOfVotes :''};

    }

    componentDidMount() {
        this.props.fetchResults();
    }

    showResults = (numberOfVotes) => {
        let keyss = [];
        if (this.state.sort) {
            console.log('test intra');
            let sortt = this.state.sort;
            console.log(sortt);
            keyss = Object.keys(sortt);
            sortt.sort(function (a, b) {
                return sortt[a] < sortt[b];
            });
            return keyss.map(function(option) {
                let percentaje = (Math.round((sortt[option] * 100) / numberOfVotes)).toFixed(2);
                return (
                    <div class="result">
                        <div class="girl-name"><span>{option} </span></div>
                        <progress  max="100" value={percentaje}></progress>
                        <span>{percentaje} %</span>
                    </div>
                )
            });
        }
    }

    sortGirls = (sortt) => {
        sortt.sort( function( a, b )
        {
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
        Object.keys(results).map(function(result, index){
            if (sort[results[result].girl]) {
                sort[results[result].girl] = parseInt(sort[results[result].girl]) + 1;
            } else {
                sort[results[result].girl] = 1;
            }
        });
        console.log( Object.keys(results).length);
        this.setState({sort : sort, numberOfVotes: Object.keys(results).length });
    }

    render() {
        const {results} = this.props;
        return (
            <div class="section-tours">
                <h2> Multumim pentru votul tau </h2>
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

export default connect (mapStateToProps, mapDispatchtoProps)(Results);

