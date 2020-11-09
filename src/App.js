import React from 'react';
import './style.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home";
import Calendar from "./components/Calendar/Calendar";
import Details from "./components/Details/Details";

import FetchData from "./service/FetchData";

class App extends React.Component {
    fetchData = new FetchData();
    state = {
        rocket: 'Falcon 1',
        rocketFeatures: null,
        rockets: [],
        company: null,
    };

    componentDidMount() {
        this.updateRocket();
        this.updateCompany();
        // this.fetchData.getCompany().then(data => console.log('FetchData: ', data));
    }

    updateRocket() {
        this.fetchData
            .getRocket()
            .then((data) => {
                this.setState({ rockets: data.map((item) => item.name) });
                return data;
            })
            .then((data) =>
                data.find((item) => item.name === this.state.rocket),
            )
            .then((rocketFeatures) => this.setState({ rocketFeatures }));
    }

    changeRocket = (rocket) => {
        this.setState(
            {
                rocket,
            },
            this.updateRocket,
        );
    };

    updateCompany = () => {
        this.fetchData
            .getCompany()
            .then((company) => this.setState({ company }));
    };

    render() {
        return (
            <BrowserRouter>
                <Header
                    rockets={this.state.rockets}
                    changeRocket={this.changeRocket}
                />

                <Route exact path="/">
                    <Home company={this.state.company} />
                </Route>

                <Route path="/rocket">
                    <Main rocket={this.state.rocket} />
                    <Features rocketFeatures={this.state.rocketFeatures} />
                </Route>

                <Route exact path="/calendar">
                    {/* <Main /> */}
                    <Calendar />
                </Route>

                <Route exact path="/details">
                    {/* <Main /> */}
                    <Details />
                </Route>

                <Footer company={this.state.company} />
            </BrowserRouter>
        );
    }
}

export default App;