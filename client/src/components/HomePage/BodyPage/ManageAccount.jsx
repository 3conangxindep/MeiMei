import React , { useState }from 'react';
import { NavLink, Switch, Route ,Redirect} from 'react-router-dom';
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
        <div className='relative flex flex-col items-center justify-center w-full h-auto p-8 border-box'>
            {/* vertical-nav */}
            <div className='border-box absolute top-3 mr-4/6 p-2.5 w-1/6 h-5/6 ml-12 bg-white rounded-md z-10'>
                    {/*  vertical-nav-inline*/}
                    <div className='flex flex-col items-center justify-between p-4 bg-green-300 rounded-md shadow-md h-5/6 shadow-green-400'>
                        {/* manageAccount-section */}
                        <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{backgroundColor:currentPage === 'ProfilePage' ? 'white' : 'transparent'}}>
                            <NavLink 
                                to="/ManageAccount/ProfilePage"
                                onClick={() => setCurrentPage('ProfilePage')}
                            >
                            
                            {/* thay doi anh account */}
                                <img
                                    className='object-cover w-4/5 h-4/5'
                                    src='https://cdn-icons-png.flaticon.com/128/456/456212.png'
                                    alt=''
                                />
                            </NavLink>
                        </div>
                        {/* manageAccount-section */}
                        <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{backgroundColor:currentPage === 'WorkInforPage' ? 'white' : 'transparent'}}>
                            <NavLink 
                                to="/ManageAccount/WorkInforPage"
                                onClick={() => setCurrentPage('WorkInforPage')}
                            >
                                <img

                                    src='https://cdn-icons-png.flaticon.com/128/639/639394.png'
                                    alt=''
                                />
                            </NavLink>
                        </div>
                        {/*manageAccount-section  */}
                        <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{backgroundColor:currentPage === 'SocialMediaPage' ? 'white' : 'transparent'}}>
                            <NavLink 
                                to="/ManageAccount/SocialMediaPage"
                                onClick={() => setCurrentPage('SocialMediaPage')}
                            >
                                <img
                                    src='https://cdn-icons-png.flaticon.com/128/900/900782.png'
                                    alt=''
                                />
                            </NavLink>
                        </div>
                        {/*manageAccount-section  */}
                        <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{backgroundColor:currentPage === 'DescriptionPage' ? 'white' : 'transparent'}}>
                            <NavLink 
                                to="/ManageAccount/DescriptionPage"
                                onClick={() => setCurrentPage('DescriptionPage')}
                            >
                                <img
                                    src='https://cdn-icons-png.flaticon.com/128/12454/12454226.png'
                                    alt=''
                                />
                            </NavLink>
                        </div>
                        {/*manageAccount-section  */}
                        <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{backgroundColor:currentPage === 'MyHomePage' ? 'white' : 'transparent'}}>
                            <NavLink to="/MyHomePage" onClick={() => setCurrentPage('MyHomePage')}>
                                <img
                                    src='https://cdn-icons-png.flaticon.com/128/1946/1946488.png'
                                    alt=''
                                />
                            </NavLink>
                        </div>                
                    </div>
            </div>

                {/* manageAccount-card */}
                <div className='relative flex w-full mb-12 bg-white rounded-lg shadow-md border-box shadow-green-400'>
                    {/* flex-left */}
                    <div className='float-left'></div>
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
                <div className='focus:shadow-md shadow-green-400 hover:shadow-green-400 active:shadow-green-400'>
                    <button id='btt' type='submit'>編集</button>
                </div>
        </div>
    );
};

export default ManageAccount;