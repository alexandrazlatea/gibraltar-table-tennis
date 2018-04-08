import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchResults, fetchUsersData} from "../actions";

class Ranking extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsersData();
    }

    componentWillReceiveProps(nextprops) {

    }

    render() {
        return (
            <div className="ranking">

            </div>
        )
    }


}
function mapStateToProps(state) {
    return {
        users: state.results
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({fetchUsersData}, dispatch);
}

export default connect(null, mapDispatchtoProps)(Ranking);


