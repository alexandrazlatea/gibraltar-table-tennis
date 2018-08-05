import React, {Component} from 'react';
import Header from '../components/header';
import Footer from "../components/footer";
import TournamentsList from "../components/TournamentsList";
import {fire} from "../fire";
class Tournaments extends Component {
    render() {

        return (
            <div className="App">
                <Header />
                <TournamentsList />
                <Footer />
            </div>
        );
    }
}

export default Tournaments;



