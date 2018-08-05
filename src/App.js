import React, { Component } from 'react';
import './App.css';
import './css/style.css';

import Header from './components/header';
import Footer from "./components/footer";
import SectionHomepage from "./components/HomepageSection";




class App extends Component {
    render() {

        return (
            <div className="App">
                <Header />
                <SectionHomepage />
                <Footer />
            </div>
        );
    }
}

export default App;
