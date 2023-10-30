import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState('MyHomePage'); // State để theo dõi trang hiện tại

  return (
    <div className="navigation-container">
      <div className="navigation-left" style={{borderBottom:currentPage === 'MyHomePage' ? '5px solid #002629' : 'none'}}>
        <NavLink
          to="/MyHomePage"
          onClick={() => setCurrentPage('MyHomePage')}
          style={{ color: currentPage === 'MyHomePage' ? '#002629' : '#36735B'}}
        >
          ホーム
        </NavLink>
      </div>
      <div className="navigation-left" style={{borderBottom:currentPage === 'ContactPage' ? '5px solid #002629' : 'none'}}>
        <NavLink
          to="/ContactPage"
          onClick={() => setCurrentPage('ContactPage')}
          style={{ color: currentPage === 'ContactPage' ? '#002629' : '#36735B' }}
        >
          連絡先
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
