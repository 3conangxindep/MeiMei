import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState('MyHomePage'); // State để theo dõi trang hiện tại
  const contact_id = JSON.parse(localStorage.getItem('currentUser')).data.id_card;
<<<<<<< HEAD
  console.log("navigation"+contact_id);
=======
  // console.log("navigation"+contact_id);
>>>>>>> 5644c4466969afe0214d8f60170aaaca6c6f4e04

  return (
    <div className="relative flex items-center justify-start w-full h-auto ml-6">
      <div className="p-2.5 mr-10" style={{borderBottom:currentPage === 'MyHomePage' ? '5px solid #ECE9E9' : 'none'}}>
        <NavLink
<<<<<<< HEAD
          className="text-xl font-bold no-underline"
=======
          className="text-2xl font-bold no-underline"
>>>>>>> 5644c4466969afe0214d8f60170aaaca6c6f4e04
          to={`/MyHomePage/${contact_id}/${contact_id}`}
          onClick={() => setCurrentPage('MyHomePage')}
          style={{ color: currentPage === 'MyHomePage' ? '#FFFFFF' : '#ECFF8C'}}
        >
          ホーム
        </NavLink>
      </div>
      <div className="p-2.5" style={{borderBottom:currentPage === 'ContactPage' ? '5px solid #ECE9E9' : 'none'}}>
        <NavLink
          className="text-2xl font-bold no-underline"
          to="/ContactPage"
          onClick={() => setCurrentPage('ContactPage')}
          style={{ color: currentPage === 'ContactPage' ? '#FFFFFF' : '#ECFF8C' }}
        >
          連絡先
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;