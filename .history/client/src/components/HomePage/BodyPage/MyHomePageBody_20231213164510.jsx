import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import RecentAccounts from './RecentAccounts';
import Following from './Following';
import GroupMembers from './GroupMembers';
import './MyHomePage.css';

const MyHomePageBody = () => {
    return (
        <div>
                <Routes>
                    <Route path="/MyHomePage/RecentAccounts" element={<RecentAccounts />} />
                    <Route path="/MyHomePage/Following" element={<Following />} />
                    <Route path="/MyHomePage/GroupMembers" element={<GroupMembers />} />
                </Routes>
            </div>
    )
};

export default MyHomePageBody;