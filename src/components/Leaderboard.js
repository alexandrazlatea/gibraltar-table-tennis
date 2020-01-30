import React from 'react';
//import {fetchUsersData}  from '../actions/index';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        //this.props.fetchUsersData();

    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({challenges: nextProps.challenge});
    }
    render() {
        return (
            <div class="leaderboard">
               <ul>
                   <li>1. Fresh 4U <span>13</span></li>
                   <li>2. Aquarius <span>10</span></li>
                   <li>3. Seawave <span>9</span></li>
                   <li>4. D&H Ceramics <span>7</span></li>
                   <li>5. 101 <span>6</span></li>
                   <li>6. HSE Consulting <span>5</span></li>
               </ul>
            </div>
        )

    }

}
function mapStateToProps(state) {
    return {
        usersData: state.usersData,
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(Leaderboard);
