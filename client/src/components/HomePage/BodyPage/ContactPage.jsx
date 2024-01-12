import React, { useState } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Search from './Search';
import RecentAccounts from './RecentAccounts';
import Following from './Following';
import GroupMembers from './GroupMembers';
import './ContactPage.css';
import FavoritePage from './FavoritePage';


const ContactPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const [currentPage, setCurrentPage] = useState('RecentAccounts');

    return (
        // contact-container
        <div className='box-border w-full p-4'>
            {/* contact-search */}
            <div className='flex items-center justify-end w-full h-full mb-4'><Search onSearch={handleSearchChange} /></div>
            <img src='https://cdn-icons-png.flaticon.com/128/1662/1662718.png' className='h-20 mb-1'/>
            {/* section */}
            <div className='relative flex items-center justify-center w-full bg-[#36735B] rounded rounded-b h-14 rounded-t-3xl border border-[#ECFF8C]'>
                <NavLink
                    className="flex items-center justify-center float-left w-full p-2 m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent underline-none rounded-2xl  h-4/5 hover:bg-[#68AE61] hover:border-2 hover:border-[#68AE61] hover:rounded-2xl hover:shadow hover:shadow-[#7db578]"
                    to="/ContactPage/Following"
                    style={{ backgroundColor: currentPage === 'Following' ? '#68AE61' : 'transparent' }}
                    onClick={() => setCurrentPage('Following')}
                >
                    フォロー中
                </NavLink>
                <NavLink
                    className="flex items-center justify-center float-left w-full p-2 m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent underline-none rounded-2xl  h-4/5 hover:bg-[#68AE61] hover:border-2 hover:border-[#68AE61] hover:rounded-2xl hover:shadow hover:shadow-[#7db578]"
                    to="/ContactPage/RecentAccounts"
                    style={{ backgroundColor: currentPage === 'RecentAccounts' ? '#68AE61' : 'transparent' }}
                    onClick={() => setCurrentPage('RecentAccounts')}
                >
                    最近見たアカウント
                </NavLink>
                <NavLink
                    className="flex items-center justify-center float-left w-full  m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent underline-none rounded-2xl  h-4/5 hover:bg-[#68AE61] hover:border-2 hover:border-[#68AE61] hover:rounded-2xl hover:shadow hover:shadow-[#7db578]"
                    to="/ContactPage/GroupMembers"
                    style={{ backgroundColor: currentPage === 'GroupMembers' ? '#68AE61' : 'transparent' }}
                    onClick={() => setCurrentPage('GroupMembers')}
                >
                    グループ
                </NavLink>
                <NavLink
                    className="flex items-center justify-center float-left w-full  m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent underline-none rounded-2xl  h-4/5 hover:bg-[#68AE61] hover:border-2 hover:border-[#68AE61] hover:rounded-2xl hover:shadow hover:shadow-[#7db578]"
                    to="/ContactPage/FavoritePage"
                    style={{ backgroundColor: currentPage === 'FavoritePage' ? '#68AE61' : 'transparent' }}
                    onClick={() => setCurrentPage('FavoritePage')}
                >
                    お気に入り
                </NavLink>
            </div>
            {/* card */}
            <div className='relative w-full h-screen bg-white border border-l-[#0B3E38] border-r-[#0B3E38] border-bt-[#0B3E38]'>
                <Switch>
                    <Route path="/ContactPage/RecentAccounts"><RecentAccounts searchTerm={searchTerm} onSearchChange={handleSearchChange} /></Route>
                    <Route path="/ContactPage/Following"><Following searchTerm={searchTerm} onSearchChange={handleSearchChange} /></Route>
                    <Route path="/ContactPage/GroupMembers"><GroupMembers /></Route>
                    <Route path='/ContactPage/FavoritePage'><FavoritePage searchTerm={searchTerm} onSearchChange={handleSearchChange} /></Route>
                    <Redirect to='/ContactPage/RecentAccounts' />
                </Switch>
            </div>
        </div>
    );
};

export default ContactPage;