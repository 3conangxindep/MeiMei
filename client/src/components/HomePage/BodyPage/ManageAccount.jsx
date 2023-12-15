import React, { useState } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import './ManageAccount.css'
import ProfilePage from './ProfilePage';
import WorkInforPage from './WorkInforPage';
import SocialMediaPage from './SocialMediaPage';
import DescriptionPage from './DescriptionPage';
import MyHomePage from './MyHomePage';
import API_BASE_URL from '../../../apiConfig';

const ManageAccount = () => {
    const [currentPage, setCurrentPage] = useState('ProfilePage');
    const handleReloadPage = () => {
        window.location.reload();
    };

    return (
        // manageAccount-container
        <div className='box-border relative flex flex-row w-screen h-auto max-w-full px-2 py-4 sm:p-5'>
            {/* vertical-nav */}
            {/* <div className='left-0 border-box absolute top-3 mr-4/6 p-2.5 w-1/6 h-auto ml-8 bg-white rounded-md z-10'> */}
            {/*  vertical-nav-inline*/}
            <div className='fixed z-10 flex flex-col items-center justify-between w-2/12 h-auto bg-green-300 border border-green-500 rounded-md shadow-md p-auto sm:w-32 left-2 top-40 shadow-green-400'>
                {/* manageAccount-section */}
                {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'ProfilePage' ? 'white' : 'transparent' }}> */}
                <NavLink
                    className='flex items-center justify-center m-5 border-2 border-green-500 border-solid rounded-full w-14 h-14 hover:shadow-md hover:shadow-green-500 hover:ring-2 hover:ring-green-500'
                    style={{ backgroundColor: currentPage === 'ProfilePage' ? 'white' : '#54bc77' }}
                    to="/ManageAccount/ProfilePage"
                    onClick={() => setCurrentPage('ProfilePage')}
                >

                    {/* thay doi anh account */}
                    <img
                        className='object-cover w-8 m-2'
                        src='https://cdn-icons-png.flaticon.com/128/456/456212.png'
                        alt=''
                    />
                </NavLink>
                {/* </div> */}
                {/* manageAccount-section */}
                {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'WorkInforPage' ? 'white' : 'transparent' }}> */}
                <NavLink
                    className='flex items-center justify-center m-5 border-2 border-green-500 border-solid rounded-full w-14 h-14 hover:shadow-md hover:shadow-green-500 hover:ring-2 hover:ring-green-500'
                    style={{ backgroundColor: currentPage === 'WorkInforPage' ? 'white' : '#54bc77' }}
                    to="/ManageAccount/WorkInforPage"
                    onClick={() => setCurrentPage('WorkInforPage')}
                >
                    <img
                        className='object-cover w-8'
                        src='https://cdn-icons-png.flaticon.com/128/639/639394.png'
                        alt=''
                    />
                </NavLink>
                {/* </div> */}
                {/*manageAccount-section  */}
                {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'SocialMediaPage' ? 'white' : 'transparent' }}> */}
                <NavLink
                    className='flex items-center justify-center m-5 border-2 border-green-500 border-solid rounded-full w-14 h-14 hover:shadow-md hover:shadow-green-500 hover:ring-2 hover:ring-green-500'
                    style={{ backgroundColor: currentPage === 'SocialMediaPage' ? 'white' : '#54bc77' }}
                    to="/ManageAccount/SocialMediaPage"
                    onClick={() => setCurrentPage('SocialMediaPage')}
                >
                    <img
                        className='object-cover w-8'
                        src='https://cdn-icons-png.flaticon.com/128/900/900782.png'
                        alt=''
                    />
                </NavLink>
                {/* </div> */}
                {/*manageAccount-section  */}
                {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'DescriptionPage' ? 'white' : 'transparent' }}> */}
                <NavLink
                    className='flex items-center justify-center m-5 border-2 border-green-500 border-solid rounded-full w-14 h-14 hover:shadow-md hover:shadow-green-500 hover:ring-2 hover:ring-green-500'
                    style={{ backgroundColor: currentPage === 'DescriptionPage' ? 'white' : '#54bc77' }}
                    to="/ManageAccount/DescriptionPage"
                    onClick={() => setCurrentPage('DescriptionPage')}
                >
                    <img
                        className='object-cover w-8'
                        src='https://cdn-icons-png.flaticon.com/128/12454/12454226.png'
                        alt=''
                    />
                </NavLink>
                {/* </div> */}
                {/*manageAccount-section  */}
                {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'MyHomePage' ? 'white' : 'transparent' }}> */}
                <NavLink
                    className='flex items-center justify-center m-5 border-2 border-green-500 border-solid rounded-full w-14 h-14 hover:shadow-md hover:shadow-green-500 hover:ring-2 hover:ring-green-500'
                    style={{ backgroundColor: currentPage === 'MyHomePage' ? 'white' : '#54bc77' }}
                    to="/MyHomePage"
                    onClick={() => { setCurrentPage('MyHomePage'); handleReloadPage(); }}>
                    <img
                        className='object-cover w-8'
                        src='https://cdn-icons-png.flaticon.com/128/1946/1946488.png'
                        alt=''
                    />
                </NavLink>
                {/* </div> */}
            </div>
            {/* </div> */}

            {/* manageAccount-card */}
            <div className='box-border relative flex items-center justify-center w-screen h-auto mb-12 bg-gray-100 rounded-lg shadow-md shadow-green-400'>
                {/* flex-left */}
                <div className='w-2/12 sm:w-32'></div>
                <div className='w-full h-full'>
                    <Switch>
                        <Route path='/ManageAccount/ProfilePage'><ProfilePage /></Route>
                        <Route path='/ManageAccount/WorkInforPage'><WorkInforPage /></Route>
                        <Route path='/ManageAccount/SocialMediaPage'><SocialMediaPage /></Route>
                        <Route path='/ManageAccount/DescriptionPage'><DescriptionPage /></Route>
                        <Redirect to='/ManageAccount/ProfilePage' />
                    </Switch>
                </div>
            </div>
            {/* <div className='absolute bottom-0 h-20 w-28'>
                <button className='flex items-center justify-center w-full h-full text-2xl font-bold text-white bg-green-200 border-2 border-green-400 border-solid rounded-md cursor-pointer focus:shadow-md shadow-green-400 hover:shadow-green-400 active:shadow-green-400' 
                    id='btt' type='submit'
                >編集</button>
            </div> */}
        </div>
    );
};

export default ManageAccount;