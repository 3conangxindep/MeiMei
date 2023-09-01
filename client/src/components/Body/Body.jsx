import React from 'react';
import './Body.css';
import Search from './Search';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecentAccounts from './RecentAccounts';
import Following from './Following';
import GroupMembers from './GroupMembers';

const Body = () => {
    return (
        <div className='body'>
            <div className='container'>
                <div style={{display: 'grid',gridTemplateColumns: '1fr 1fr',borderBottom:'none'}}>
                    <h2>連絡先</h2>
                    <Search />
                </div>
                <div className='section'>
                    <div className='section-left'>
                        <div className='section-item'>
                            <Link to="/Main/RecentAccounts" style={{color:'black'}}>最近見たアカウント</Link>
                        </div>
                        <div className='section-item'>
                            <Link to="/Main/Following" style={{color:'black'}}>フォロー中</Link>
                        </div>
                        <div className='section-item' style={{borderRight:'none'}}>
                            <Link to="/Main/GroupMembers" style={{color:'black'}}>グルーブ</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Switch>
            <Route path="/Main/RecentAccounts"><RecentAccounts /></Route>
            <Route path="/Main/Following"><Following /></Route>
            <Route path="/Main/GroupMembers"><GroupMembers /></Route>
            </Switch>
        </div>
    );
};

export default Body;