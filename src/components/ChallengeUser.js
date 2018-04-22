import React, {Component} from 'react';
import {fire} from "../fire";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {sendEmail} from "../actions";

class ChallengeUser extends Component {
    handleClick = () => {
        const {buttonText} = this.props;
        if (buttonText !== 'To be played') {
            this.sendEmails();
        }
    }

    sendEmails = () => {
        const {user, currentUser} = this.props;
        fire.database().ref('chalenge').push({
            active: 1,
            user_id : currentUser.user_id,
            challengedUser : user.user_id,
            userName : user.firstName + ' ' + user.lastName,
            userChallengedName : currentUser.firstName + ' ' + currentUser.lastName,
            current_date: Math.floor(Date.now() / 1000),
        });
        const objectArray  = [];

        objectArray['action'] = 'challenge';
        objectArray['to'] =  user.email;
        objectArray['subject'] = 'New Challenge';
        objectArray['body'] = 'You have a new challenge from ' + currentUser.firstName + ' ' + currentUser.lastName + '.Please play your game in 3 days';

        this.props.sendEmail( objectArray);

    }

    render() {
        const { buttonText} = this.props;
        return (
            <div className="challenge-user">
                {buttonText && <button onClick={this.handleClick} >{buttonText}</button>}
            </div>
        )
    }

}
function mapDispatchtoProps(dispatch) {
    return bindActionCreators({sendEmail}, dispatch);
}

export default connect(null, mapDispatchtoProps)(ChallengeUser);
