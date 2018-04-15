import React, { Component } from 'react';
import { fire } from '../fire';
import {renderView} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class LoginPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', password: '', errorMessage: '', firstName: '', lastName: '', type: ''};
    }



    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }
    handleChangeFirstName = (event) => {
        this.setState({ firstName: event.target.value });
    }
    handleChangeLastName = (event) => {
        this.setState({ lastName: event.target.value });
    }

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const username = this.state.value;
        const pass = this.state.password;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        console.log(firstName);
        fire.auth().createUserWithEmailAndPassword(username, pass).then((response) => {
            // [END createwithemail]
            // callSomeFunction(); Optional
            const user = fire.auth().currentUser;
            this.setState({ errorMessage: '' });
            let count = 0;
            fire.database().ref("users").on("value", function (snapshot) {
                if (count === 0) {
                    count = count + 1;
                    fire.database().ref('users').push({
                        user_id: user.uid,
                        email: user.email,
                        firstName: firstName,
                        lastName: lastName,
                        rank: snapshot.numChildren() + 1
                    });
                }
            })
            this.props.getCurrentUser(user);
            this.props.renderView(Math.floor(Math.random() * 90 + 10));
            this.props.onHide();
        }, (error) => {
            // Handle Errors here.
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                fire.auth().signInWithEmailAndPassword(username, pass).then((response) => {
                    let user = fire.auth().currentUser;
                    this.setState({ errorMessage: '' });
                    this.props.getCurrentUser(user);
                    this.props.renderView(Math.floor(Math.random() * 90 + 10));

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
        const divStyle = {
            backgroundColor: '#f1f1f1'
        };
        console.log(this.state.type);
        return (
            <div className="login-form" ref={this.setWrapperRef}>
                <p className="login-form-title"><b>{this.props.type === 'login' ? 'Log In' : 'Sign Up'} </b></p>
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        {this.props.type === 'signup' && <input type="text" onChange={this.handleChangeFirstName} placeholder="First Name" name="uname" /> }
                        {this.props.type === 'signup' && <input type="text" onChange={this.handleChangeLastName} placeholder="Last Name" name="uname" /> }
                        <input type="text" onChange={this.handleChange} placeholder="Enter email" name="uname" />
                        <input type="password" onChange={this.handleChangePassword} placeholder="Enter Password" name="pwd" />
                        {this.props.type === 'signup' && <button type="submit">Sign Up</button> }
                        {this.props.type === 'login' && <button type="submit">Log In</button> }
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

function mapDispatchtoProps(dispatch) {
    return bindActionCreators({renderView}, dispatch);
}

export default connect(null, mapDispatchtoProps)(LoginPopUp);


