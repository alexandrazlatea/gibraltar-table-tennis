import React, {Component} from 'react';
import SendEmail from '../components/SendEmails';

class ChallengeUser extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        const {user, currentUser} = this.props;
        this.sendEmail();
    }

    sendEmail = () => {
        console.log('intra');
        <SendEmail />
    }



    render() {
        return (
            <div className="challenge-user">
            <button onClick={this.handleClick} >Challenge</button>
            </div>
        )
    }

}

export default ChallengeUser;