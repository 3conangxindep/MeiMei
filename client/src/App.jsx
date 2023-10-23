import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import LogOutScreen from './components/LogOutScreen';
import { AuthProvider } from './components/AuthContext';
import { SelectedOptionsProvider } from './components/Body/UpdateData/SelectedOptionsContext';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';

function App() {

  return (
    <AuthProvider>
    <SelectedOptionsProvider>
      <Router>
        <Switch>
          <Route path="/Main"><Main /></Route>
          <Route path="/"><LoginPage /></Route>
        </Switch>
      </Router>
      </SelectedOptionsProvider>
    </AuthProvider>
);
}


export default App;
