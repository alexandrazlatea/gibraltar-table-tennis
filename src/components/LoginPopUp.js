import React, {Component} from 'react';
import {fire} from '../fire';


class LoginPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', password: '', errorMessage: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        let self = this;
        event.preventDefault();
        const username = this.state.value;
        const pass = this.state.password;
        fire.auth().createUserWithEmailAndPassword(username, pass).then(function(user) {
            // [END createwithemail]
            // callSomeFunction(); Optional
            var user = fire.auth().currentUser;
            self.setState({errorMessage: ''});
            let count = 0;
            fire.database().ref("users").on("value", function(snapshot) {
                if (count == 0) {
                    count = count +1;
                    fire.database().ref('users').push({
                        user_id: user.uid,
                        email: user.email,
                        rank: snapshot.numChildren() + 1
                    });
                }
            })
            self.props.getCurrentUser(user);
            self.props.onHide();
        }, function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                fire.auth().signInWithEmailAndPassword(username, pass).then(function(user) {
                    var user = fire.auth().currentUser;
                    self.setState({errorMessage: ''});
                    self.props.getCurrentUser(user);
                    self.props.onHide();
                }, function(err) {
                        console.log(err.message);
                        self.setState({errorMessage: err.message});
                    });
            } else {
                var errorMessage = error.message;
                // [START_EXCLUDE]
                self.setState({errorMessage: errorMessage});
            }
            // [END_EXCLUDE]
        });
    }
    render() {
        console.log('intra aici login pop up');
        const divStyle = {
            backgroundColor: '#f1f1f1'
        };
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                            <div className="img-container">
                            </div>

                            <div className="container">
                                <label htmlFor="username"><b>Username</b></label>
                                <input type="text" onChange={this.handleChange} placeholder="Enter Username" name="uname"/>
                                <input type="password" onChange={this.handleChangePassword} placeholder="Enter Username" name="uname"/>
                                <button type="submit">Login</button>

                            </div>
                    {this.state.errorMessage}
                            <div className="container" style={divStyle}>
                                <button type="button" onClick={this.props.onHide} className="cancelbtn">Cancel</button>
                            </div>
                </form>
            </div>
        )
    }
}

export default LoginPopUp;