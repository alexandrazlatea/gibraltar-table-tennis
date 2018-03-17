import React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import {fire} from '../fire';
import {bindActionCreators} from "redux";
import {fetchResults} from "../actions";
import {connect} from "react-redux";

class Login extends React.Component{

    constructor (props, context) {
        super(props, context);
        this.state = {user: ''};

    }

    responseFacebook = (response) =>  {
        response.password = response.id;

        fire.auth().createUserWithEmailAndPassword(response.email, response.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
        });
        fire.database().ref('user').set({
            user_id : response.id,
            friends: response.friends.summary.total_count,
            current_date: new Date(),
            birthday: (response.birthday) ? response.birthday : '',
            hometown: (response.hometown.name) ? response.hometown.name : '',
            location: (response.location.name) ? response.location.name : '',
            profile_image: (response.picture.data.url) ? response.picture.data.url : '',
        });

        localStorage['userId'] = response.id;
        this.setState({user : response});
        this.props.fetchResults();

    }

    render () {
        if (!localStorage['userId']) {
            return (
                <div className="loginBtn loginBtn--facebook">
                    <FacebookLogin socialId="150900872255237"
                                   language="en_US"
                                   scope="public_profile,email, user_friends, user_hometown, user_location, user_birthday"
                                   responseHandler={this.responseFacebook}
                                   xfbml={true}
                                   fields="id,email,name, picture, friends, hometown, location, birthday"
                                   version="v2.5"
                                   className="facebook-login"
                                   buttonText="Login With Facebook"/>
                </div>
            );
        } else {
            return <div class="back-card-logged">Voteaza concurenta</div>;
        }
    }

}
function mapDispatchtoProps(dispatch) {
    return bindActionCreators({fetchResults}, dispatch);
}

export default connect(null, mapDispatchtoProps)(Login);

