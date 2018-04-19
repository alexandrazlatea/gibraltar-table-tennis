import React, {Component} from 'react';
import {fire} from "../fire";

class ChallengeUser extends Component {
    handleClick = () => {
        const {buttonText} = this.props;
        if (buttonText !== 'To be played') {
            this.sendEmail();
        }
    }

    sendEmail = () => {
        const {user, currentUser} = this.props;
        fire.database().ref('chalenge').push({
            active: 1,
            user_id : currentUser.user_id,
            challengedUser : user.user_id,
            userName : user.firstName + ' ' + user.lastName,
            userChallengedName : currentUser.firstName + ' ' + currentUser.lastName,
            current_date: Math.floor(Date.now() / 1000),
        });
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

export default ChallengeUser;