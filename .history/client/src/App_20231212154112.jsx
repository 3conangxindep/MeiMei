import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import { SelectedOptionsProvider } from './components/SelectedOptionsContext';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import Main from './components/HomePage/Main';

function App() {
  // Sử dụng useParams để lấy giá trị tham số từ URL
  const { id_contact } = useParams();
  console.log("app id_contact: " + id_contact);

  return (
    <AuthProvider>
    <SelectedOptionsProvider>
      <Router>
        <Switch>
          <Route path={`/main/:id_contact`} component={Main} />
          <Route path="/signUpPage" component={SignUpPage} />
          <Route component={LoginPage} />
      
        </Switch>
      </Router>
      </SelectedOptionsProvider>
    </AuthProvider>
  );
}


export default App;