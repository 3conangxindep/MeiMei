import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState('MyHomePage'); // State để theo dõi trang hiện tại
  const id_contact = JSON.parse(localStorage.getItem('currentUser')).data.id_card;

  return (
    <div className="relative flex items-center justify-start w-full h-auto ml-6">
      <div className="p-2.5 mr-10" style={{borderBottom:currentPage === 'MyHomePage' ? '5px solid #002629' : 'none'}}>
        <NavLink
          className="text-xl font-bold no-underline"
          to="/main"
          onClick={() => setCurrentPage('MyHomePage')}
          style={{ color: currentPage === 'MyHomePage' ? '#002629' : '#36735B'}}
        >
          ホーム
        </NavLink>
      </div>
      <div className="p-2.5" style={{borderBottom:currentPage === 'ContactPage' ? '5px solid #002629' : 'none'}}>
        <NavLink
          className="text-xl font-bold no-underline"
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
