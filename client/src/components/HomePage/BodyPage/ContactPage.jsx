import React, { useState } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Search from './Search';
import RecentAccounts from './RecentAccounts';
import Following from './Following';
import GroupMembers from './GroupMembers';
import './ContactPage.css';
import FavoritePage from './FavoritePage';


const ContactPage = () => {
    const [currentPage, setCurrentPage] = useState('RecentAccounts');

    return (
        // contact-container
        <div className='box-border w-full p-4'>
            {/* contact-search */}
            <div className='flex items-center justify-end w-full h-full mb-4'><Search /></div>
            {/* section */}
            <div className='relative flex items-center justify-center w-full bg-green-300 rounded rounded-b h-14 rounded-t-3xl'>
                <NavLink
                    className="flex items-center justify-center float-left w-full m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent underline-none rounded-tl-2xl rounded-bl-md rounded-r-md h-4/5 group hover:bg-green-500 hover:shadow-lg hover:border-2 hover:border-green-500 hover:rounded-tl-2xl hover:rounded-bl-md hover:rounded-r-md"
                    to="/ContactPage/RecentAccounts"
                    style={{ borderBottom: currentPage === 'RecentAccounts' ? '5px solid white' : 'none' }}
                    onClick={() => setCurrentPage('RecentAccounts')}
                >
                    最近見たアカウント
                </NavLink>
                <NavLink
                    className="flex items-center justify-center float-left w-full m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent rounded-md underline-none h-4/5 group hover:bg-green-500 hover:shadow-lg hover:border-2 hover:border-green-500 hover:rounded-md"
                    to="/ContactPage/Following"
                    style={{ borderBottom: currentPage === 'Following' ? '5px solid white' : 'none' }}
                    onClick={() => setCurrentPage('Following')}
                >
                    フォロー中
                </NavLink>
                <NavLink
                    className="flex items-center justify-center float-left w-full m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent rounded-md underline-none h-4/5 group hover:bg-green-500 hover:shadow-lg hover:border-2 hover:border-green-500 hover:rounded-md"
                    to="/ContactPage/GroupMembers"
                    style={{ borderBottom: currentPage === 'GroupMembers' ? '5px solid white' : 'none' }}
                    onClick={() => setCurrentPage('GroupMembers')}
                >
                    グループ
                </NavLink>
                <NavLink
                    className="flex items-center justify-center float-left w-full m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent underline-none rounded-tr-2xl rounded-br-md rounded-l-md h-4/5 group hover:bg-green-500 hover:shadow-lg hover:border-2 hover:border-green-500 hover:rounded-tr-2xl hover:rounded-br-md hover:rounded-l-md"
                    to="/ContactPage/FavoritePage"
                    style={{ borderBottom: currentPage === 'FavoritePage' ? '5px solid white' : 'none' }}
                    onClick={() => setCurrentPage('FavoritePage')}
                >
                    お気に入り
                </NavLink>
            </div>
            {/* card */}
            <div className='relative w-full h-screen bg-white'>
                <Switch>
                    <Route path="/ContactPage/RecentAccounts"><RecentAccounts /></Route>
                    <Route path="/ContactPage/Following"><Following /></Route>
                    <Route path="/ContactPage/GroupMembers"><GroupMembers /></Route>
                    <Route path='/ContactPage/FavoritePage'><FavoritePage /></Route>
                    <Redirect to='/ContactPage/RecentAccounts' />
                </Switch>
            </div>
            <div style={{ position: "fixed", bottom: "0", right: "0" }}>
                <img src='https://cdn-icons-png.flaticon.com/128/1662/1662718.png' alt='' style={{ width: "100px" }} />
            </div>
        </div>
    );
};

export default ContactPage;