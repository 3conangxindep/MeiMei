import React from 'react';
import { BrowserRouter, Link, Switch, Route, useLocation, Redirect, useParams } from 'react-router-dom';
import Header from './HeaderPage/Header';
import Navigation from './Navigation';
import MyHomePage from './BodyPage/MyHomePage';
import ContactPage from './BodyPage/ContactPage';
import ManageAccount from './BodyPage/ManageAccount';
import InformationPage from './BodyPage/InformationPage';
import { SelectedOptionsProvider } from '../SelectedOptionsContext';

const Main = () => {
  const location = useLocation();
  // const [showNavigation, setShowNavigation] = useState(true);
  // Sử dụng useParams để lấy giá trị id_card từ URL
  const id_card = JSON.parse(localStorage.getItem('currentUser')).data.id_card;
  // Sử dụng useParams để lấy giá trị tham số từ URL
  const { contact_id } = useParams();
  console.log("main contact_id: " + contact_id);
  return (
    <div className="box-border w-screen h-screen overflow-auto" style={{ backgroundImage: 'linear-gradient(to top,#002629,#94F7B2)' }}>
      <SelectedOptionsProvider>
        <BrowserRouter>
          <Header />
          <Navigation />
          {/* {showNavigation && <Navigation />} */}
          <Switch>
          <Route exact path="/MyHomePage/:id_card/:contact_id"><MyHomePage /></Route>
            <Route path="/ContactPage"><ContactPage /></Route>
            <Route path='/ManageAccount'><ManageAccount /></Route>
            <Route path='/InformationPage/:id_card/:contact_id'><InformationPage /></Route>
            <Redirect to={`/MyHomePage/${id_card}/${contact_id}`} />
          </Switch>
        </BrowserRouter>
      </SelectedOptionsProvider>
    </div>
  );
}

export default Main;