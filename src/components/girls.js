import React, {Component} from 'react';
import {getGirls} from "../utils/businessRule";
import '../css/style.css';
import Login from './login';
import {fire} from '../fire';
import Results from '../components/results';
import {bindActionCreators} from "redux";
import {fetchResults} from "../actions";
import {connect} from "react-redux";

class Girls extends Component {
    constructor(props) {
        super(props);
        this.state = {showResults: false, hasVoted: false, requestCompleted:false};
    }

    componentDidMount() {
        console.log('intra dddf');
        if (localStorage['userId']) {
            this.props.fetchResults();
        } else {
            this.setState({requestCompleted: true});

        }
    }

    voteGirl = (girl) => {
        fire.database().ref('vote').push({
            user_id: localStorage['userId'],
            date: new Date(),
            girl: girl
        });
        this.setState({showResults: true});
    }

    componentWillReceiveProps(nextProps) {
        const {results} = nextProps;
        let found = false;
        if (localStorage['userId']) {
            const user_id = localStorage['userId'];
            if (results) {
                found = Object.keys(results).find((element) => {
                    return results[element].user_id === user_id;
                })
            }
        }
        this.setState({hasVoted: found, requestCompleted: true});
    }
    showButton = (girl) => {
        const {results} = this.props;
        if (localStorage['userId'] && !this.state.hasVoted) {
            return (
                <button onClick={() => {
                    this.voteGirl(girl)
                }} className="btn btn--white">Voteaza acum!
                </button>
            )

    }
}

    renderGirls() {

        const girls = getGirls();
            return girls.map((option, key) => {
                let classes = this.classNames({
                    'card__picture card__picture--1': ((key === 6) ? true : false),
                    'card__picture card__picture--4': ((key === 7) ? true : false),
                    'card__picture card__picture--3': ((key === 8) ? true : false),
                    'card__picture card__picture--2': ((key === 0) ? true : false),
                    'card__picture card__picture--5': ((key === 1) ? true : false),
                    'card__picture card__picture--8': ((key === 2) ? true : false),
                    'card__picture card__picture--7': ((key === 3) ? true : false),
                    'card__picture card__picture--6': ((key === 4) ? true : false),
                    'card__picture card__picture--9': ((key === 5) ? true : false),

                })
                return (
                    <div class="col-1-of-3">
                        <div class="card">
                            <div class="card__side card__side--front">
                                <div class={classes}>
                                    &nbsp;
                                </div>
                                <h4 class="card__heading">
                                    <span class="card__heading-span card__heading-span--1">{option.name}</span>
                                </h4>
                                <div class="card__details">
                                    <ul>
                                        {option.name}
                                    </ul>
                                </div>
                            </div>
                            <div class="card__side card__side--back card__side--back-1">
                                <div class="card__cta">
                                    <div class="card__price-box">
                                        <p class="card__price-only"></p>
                                        <p class="card__price-value"><Login/></p>
                                    </div>
                                    {this.showButton(option.field)}

                                </div>
                            </div>
                        </div>
                    </div>

                )
            });
    }


    classNames = (classes) => {
        return Object.entries(classes)
            .filter(([key, value]) => value)
            .map(([key, value]) => key)
            .join(' ');
    }


    render() {
        const {results} = this.props;
        if (this.state.requestCompleted) {
            console.log('intra aici');
            if (!localStorage['userId'] || !this.state.hasVoted) {
                return (
                    <div className="girls">
                        <section className="section-tours" id="section-tours">
                            <div className="u-center-text u-margin-bottom-big">
                                <h2 className="heading-secondary">
                                    Voteaza concurenta preferata
                                </h2>
                            </div>

                            <div className="row">
                                {this.renderGirls()}

                            </div>

                        </section>
                    </div>
                );

            } else {
                return (
                    <Results/>
                )
            }
        } else {
            return (
                <div></div>
            )
        }
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

export default connect(mapStateToProps, mapDispatchtoProps)(Girls);
