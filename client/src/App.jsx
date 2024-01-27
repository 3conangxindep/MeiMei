import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import { SelectedOptionsProvider } from './components/SelectedOptionsContext';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import CardManages from './components/CardManages/CardManages';
import Main from './components/HomePage/Main';

function App() {

  return (
    <AuthProvider>
<<<<<<< HEAD
    <SelectedOptionsProvider>
      <Router>
        <Switch>
          <Route path={`/main/:contact_id`} component={Main} />
          <Route path="/signUpPage" component={SignUpPage} />
          <Route component={LoginPage} />
      
        </Switch>
      </Router>
=======
      <SelectedOptionsProvider>
        <Router>
          <Switch>
            <Route path={`/main/:contact_id`} component={Main} />
            <Route path="/signUpPage" component={SignUpPage} />
            <Route path="/cardManages" component={CardManages} />
            <Route component={LoginPage} />
          </Switch>
        </Router>
>>>>>>> 5644c4466969afe0214d8f60170aaaca6c6f4e04
      </SelectedOptionsProvider>
    </AuthProvider>
  );
}


export default App;
