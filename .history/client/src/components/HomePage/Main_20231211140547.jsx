import React from 'react';
import { BrowserRouter, Link, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './HeaderPage/Header';
import Navigation from './Navigation';
import MyHomePage from './BodyPage/MyHomePage';
import ContactPage from './BodyPage/ContactPage';
import ManageAccount from './BodyPage/ManageAccount';
import InformationPage from './BodyPage/InformationPage';
import { SelectedOptionsProvider } from '../SelectedOptionsContext';

const Main = () => {
  const location = useLocation();
  const [showNavigation, setShowNavigation] = useState(true);
  // Sử dụng useParams để lấy giá trị id_card từ URL
  const id_card = JSON.parse(localStorage.getItem('currentUser')).data.id_card;
  const id_contact = "000000";
  // Sử dụng useEffect để ẩn Navigation khi bạn ở trang ManageAccount
  useEffect(() => {
    if (location.pathname.startsWith('/ManageAccount')) {
      setShowNavigation(false);
    } else if (location.pathname.startsWith('/InformationPage')) {
      setShowNavigation(false);
    } else {
      setShowNavigation(true);
    }
  }, [location.pathname]);

  return (
    <div className="box-border w-screen h-screen" style={{ backgroundImage: 'linear-gradient(to top,#002629,#94F7B2)' }}>
      <SelectedOptionsProvider>
        <BrowserRouter>
          <Header />
          {showNavigation && <Navigation />}
          <Switch>
            <Route exact path="/MyHomePage/:id_card"><MyHomePage /></Route>
            <Route path="/ContactPage"><ContactPage /></Route>
            <Route path='/ManageAccount'><ManageAccount /></Route>
            <Route path='/InformationPage'><InformationPage /></Route>
            <Redirect to={`/MyHomePage/${id_card}/${id_contact}`} />
          </Switch>
        </BrowserRouter>
      </SelectedOptionsProvider>
    </div>
  );
}

export default Main;