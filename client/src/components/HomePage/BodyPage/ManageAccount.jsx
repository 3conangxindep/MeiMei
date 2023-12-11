import React, { useState } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import './ManageAccount.css'
import ProfilePage from './ProfilePage';
import WorkInforPage from './WorkInforPage';
import SocialMediaPage from './SocialMediaPage';
import DescriptionPage from './DescriptionPage';
import MyHomePage from './MyHomePage';

const ManageAccount = () => {
    const [currentPage, setCurrentPage] = useState('ProfilePage');
    return (
        // manageAccount-container
        <div className='relative flex flex-row w-screen h-auto px-2 py-4 mx-auto border-box'>
            {/* vertical-nav */}
            {/* <div className='left-0 border-box absolute top-3 mr-4/6 p-2.5 w-1/6 h-auto ml-8 bg-white rounded-md z-10'> */}
                {/*  vertical-nav-inline*/}
                <div className='fixed z-10 flex flex-col items-center justify-between w-2/12 h-auto p-4 bg-green-300 rounded-md shadow-md left-2 top-48 shadow-green-400'>
                    {/* manageAccount-section */}
                    {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'ProfilePage' ? 'white' : 'transparent' }}> */}
                        <NavLink
                            className='flex items-center justify-center w-8 h-8 m-5 rounded-full' 
                            style={{ backgroundColor: currentPage === 'ProfilePage' ? 'white' : 'transparent' }}
                            to="/ManageAccount/ProfilePage"
                            onClick={() => setCurrentPage('ProfilePage')}
                        >

                            {/* thay doi anh account */}
                            <img
                                className='object-cover w-9/12'
                                src='https://cdn-icons-png.flaticon.com/128/456/456212.png'
                                alt=''
                            />
                        </NavLink>
                    {/* </div> */}
                    {/* manageAccount-section */}
                    {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'WorkInforPage' ? 'white' : 'transparent' }}> */}
                        <NavLink
                            className='flex items-center justify-center w-8 h-8 m-5 rounded-full' 
                            style={{ backgroundColor: currentPage === 'WorkInforPage' ? 'white' : 'transparent' }}
                            to="/ManageAccount/WorkInforPage"
                            onClick={() => setCurrentPage('WorkInforPage')}
                        >
                            <img
                                className='object-cover w-9/12'
                                src='https://cdn-icons-png.flaticon.com/128/639/639394.png'
                                alt=''
                            />
                        </NavLink>
                    {/* </div> */}
                    {/*manageAccount-section  */}
                    {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'SocialMediaPage' ? 'white' : 'transparent' }}> */}
                        <NavLink
                            className='flex items-center justify-center w-8 h-8 m-5 rounded-full' 
                            style={{ backgroundColor: currentPage === 'SocialMediaPage' ? 'white' : 'transparent' }}
                            to="/ManageAccount/SocialMediaPage"
                            onClick={() => setCurrentPage('SocialMediaPage')}
                        >
                            <img
                                className='object-cover w-9/12'
                                src='https://cdn-icons-png.flaticon.com/128/900/900782.png'
                                alt=''
                            />
                        </NavLink>
                    {/* </div> */}
                    {/*manageAccount-section  */}
                    {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'DescriptionPage' ? 'white' : 'transparent' }}> */}
                        <NavLink
                            className='flex items-center justify-center w-8 h-8 m-5 rounded-full' 
                            style={{ backgroundColor: currentPage === 'DescriptionPage' ? 'white' : 'transparent' }}
                            to="/ManageAccount/DescriptionPage"
                            onClick={() => setCurrentPage('DescriptionPage')}
                        >
                            <img
                                className='object-cover w-9/12'
                                src='https://cdn-icons-png.flaticon.com/128/12454/12454226.png'
                                alt=''
                            />
                        </NavLink>
                    {/* </div> */}
                    {/*manageAccount-section  */}
                    {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'MyHomePage' ? 'white' : 'transparent' }}> */}
                        <NavLink 
                            className='flex items-center justify-center w-8 h-8 m-5 rounded-full' 
                            style={{ backgroundColor: currentPage === 'MyHomePage' ? 'white' : 'transparent' }}
                            to="/MyHomePage" 
                            onClick={() => setCurrentPage('MyHomePage')}>
                            <img
                                className='object-cover w-9/12'
                                src='https://cdn-icons-png.flaticon.com/128/1946/1946488.png'
                                alt=''
                            />
                        </NavLink>
                    {/* </div> */}
                </div>
            {/* </div> */}

            {/* manageAccount-card */}
            <div className='relative flex items-center justify-center w-screen h-auto mb-12 bg-gray-100 rounded-lg shadow-md border-box shadow-green-400'>
                {/* flex-left */}
                <div className='w-2/12'></div>
                <div className='w-full'>
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