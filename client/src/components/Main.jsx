import React from 'react';
import Header from './Header/Header';
import Body from './Body/Body';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Information from './Body/Information';
import UpdateData from './Body/UpdateData/UpdateData';
import { SelectedOptionsProvider } from './Body/UpdateData/SelectedOptionsContext';


const Main = () => {
    return (
        <SelectedOptionsProvider>
            <Router>
                <Header />
                <Switch>
                <Route path="/information" component={Information} />
                <Route path="/updateData" component={UpdateData} />
                    <Body />
                </Switch>
            </Router>
        </SelectedOptionsProvider>
    );
};

export default Main;