import React, { Component } from 'react';
import { fire } from '../fire';


class LoginPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', password: '', errorMessage: '' };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const username = this.state.value;
        const pass = this.state.password;
        fire.auth().createUserWithEmailAndPassword(username, pass).then((response) => {
            // [END createwithemail]
            // callSomeFunction(); Optional
            const user = fire.auth().currentUser;
            this.setState({ errorMessage: '' });
            let count = 0;
            fire.database().ref("users").on("value", function (snapshot) {
                if (count == 0) {
                    count = count + 1;
                    fire.database().ref('users').push({
                        user_id: user.uid,
                        email: user.email,
                        rank: snapshot.numChildren() + 1
                    });
                }
            })
            this.props.getCurrentUser(user);
            this.props.onHide();
        }, (error) => {
            // Handle Errors here.
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                fire.auth().signInWithEmailAndPassword(username, pass).then((response) => {
                    let user = fire.auth().currentUser;
                    this.setState({ errorMessage: '' });
                    this.props.getCurrentUser(user);
                    this.props.onHide();
                }, (err) => {
                    console.log(err.message);
                    this.setState({ errorMessage: err.message });
                });
            } else {
                const errorMessage = error.message;
                // [START_EXCLUDE]
                this.setState({ errorMessage: errorMessage });
            }
            // [END_EXCLUDE]
        });
    }
    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }
    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.onHide();
        }
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    render() {
        console.log('intra aici login pop up');
        const divStyle = {
            backgroundColor: '#f1f1f1'
        };
        return (
            <div className="login-form" ref={this.setWrapperRef}>
                <p className="login-form-title"><b>Log In / Sign Up</b></p>
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <input type="text" onChange={this.handleChange} placeholder="Enter Username" name="uname" />
                        <input type="password" onChange={this.handleChangePassword} placeholder="Enter Password" name="pwd" />
                        <button type="submit">Login / Sign Up</button>
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