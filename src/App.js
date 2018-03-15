import React, { Component } from 'react';
import './App.css';
import Girls from './components/girls';
import Header from './components/header';
import Footer from "./components/footer";



class App extends Component {
    render() {
        let set = {
            anonymizeIp: true
        };
        return (
            <div className="App">
                <Header />
                <Girls />
                <Footer />
            </div>
        );
    }
}

export default App;
