import React, { Component } from 'react';
import './App.css';
import './css/style.css';

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
                <Footer />
            </div>
        );
    }
}

export default App;
