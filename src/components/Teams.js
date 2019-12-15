import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { fetchTeams }  from '../actions/index';
import _ from 'lodash';


class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamsData: []
        };
    }

    componentDidMount() {
        this.props.fetchTeams();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.teamsData, 'next prosps teams');
        this.setState({teamsData:Object.values(nextProps.teamsData )});
    }

    renderTeams = () => {
        console.log(this.state.teamsData)
        const {teamsData}  = this.state;
        const groups = _.groupBy(teamsData,  'team');

        return teamsData.map((team, i) => {
            return(
                team.team
            );
        });

    }

    render() {
        // Logic for displaying page numbers
        const {teamsData} = this.state;

        return (
            <div>
                <div className="teams">
                    {this.renderTeams()}
                </div>
            </div>
        )
    }


}
function mapStateToProps(state) {
    console.log(state.teamsData);
    return {
        teamsData: state.teamsData,
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({ fetchTeams }, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(Teams);


