import React , { useState } from 'react';
import { NavLink, Switch, Route ,Redirect} from 'react-router-dom';
import Search from './Search';
import RecentAccounts from './RecentAccounts';
import Following from './Following';
import GroupMembers from './GroupMembers';
import './ContactPage.css';
import FavoritePage from './FavoritePage';


const ContactPage = () => {
    const [currentPage, setCurrentPage] = useState('RecentAccounts');

    return (
        <div className='contact-container'>
            <div className='contact-search'><Search /></div>
            <div className='section'>
                <div className='section-item' style={{borderBottom:currentPage === 'RecentAccounts' ? '5px solid white' : 'none'}}>
                    <NavLink 
                        to="/ContactPage/RecentAccounts" 
                        onClick={() => setCurrentPage('RecentAccounts')}
                    >
                        最近見たアカウント
                    </NavLink>
                </div>
                <div className='section-item' style={{borderBottom:currentPage === 'Following' ? '5px solid white' : 'none'}}>
                    <NavLink 
                        to="/ContactPage/Following" 
                        onClick={() => setCurrentPage('Following')}
                    >
                        フォロー中
                    </NavLink>                
                </div>
                <div className='section-item' style={{borderBottom:currentPage === 'GroupMembers' ? '5px solid white' : 'none'}}>
                    <NavLink 
                        to="/ContactPage/GroupMembers" 
                        onClick={() => setCurrentPage('GroupMembers')}
                    >
                        グループ
                    </NavLink>                
                </div>
                <div className='section-item' style={{borderBottom:currentPage === 'FavoritePage' ? '5px solid white' : 'none'}}>
                    <NavLink 
                        to="/ContactPage/FavoritePage" 
                        onClick={() => setCurrentPage('FavoritePage')}
                    >
                        お気に入り
                    </NavLink>                
                </div>
            </div>
                <div className='card'>
                    <Switch>
                        <Route path="/ContactPage/RecentAccounts"><RecentAccounts /></Route>
                        <Route path="/ContactPage/Following"><Following /></Route>
                        <Route path="/ContactPage/GroupMembers"><GroupMembers /></Route>
                        <Route path='/ContactPage/FavoritePage'><FavoritePage /></Route>
                        <Redirect to='/ContactPage/RecentAccounts' />
                    </Switch>
                </div>
            <div style={{ position: "fixed", bottom: "0", right: "0" }}>
                <img src='https://cdn-icons-png.flaticon.com/128/1662/1662718.png' alt='' style={{width:"100px"}}/>
            </div>
        </div>
    );
};

export default ContactPage;