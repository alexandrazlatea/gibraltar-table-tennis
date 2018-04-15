import React, {Component} from 'react';
import SendEmail from '../components/SendEmails';
import {fire} from "../fire";

class ChallengeUser extends Component {
    constructor(props) {
        super(props);

    }

    handleClick = () => {
        const {user, currentUser} = this.props;
        this.sendEmail();
    }

    componentWillReceiveProps(nextProps) {
    }

    sendEmail = () => {
        console.log('intr aici');
        const {user, currentUser} = this.props;
        fire.database().ref('chalenge').push({
            active: 1,
            user_id : currentUser.user_id,
            challengedUser : user.user_id,
            userName : user.firstName + ' ' + user.lastName,
            userChallengedName : currentUser.firstName + ' ' + currentUser.lastName,
            current_date: new Date().getTime(),
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