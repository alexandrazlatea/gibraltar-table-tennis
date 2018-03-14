import React, { Component } from 'react';
import './App.css';
import Girls from './components/girls';
import Login from './components/login';
import Header from './components/header';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Girls />

            </div>
        );
    }
}

export default App;
