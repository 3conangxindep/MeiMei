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
        <div className='manageAccount-container'>
            <div className='vertical-nav'>
                    <div className='vertical-nav-inline'>
                        <div className='manageAccount-section' style={{backgroundColor:currentPage === 'ProfilePage' ? 'white' : 'transparent'}}>
                            <NavLink 
                                to="/ManageAccount/ProfilePage"
                                onClick={() => setCurrentPage('ProfilePage')}
                            >
                            
                            {/* thay doi anh account */}
                                <img
                                    src='https://cdn-icons-png.flaticon.com/128/456/456283.png'
                                    alt=''
                                />
                            </NavLink>
                        </div>
                        <div className='manageAccount-section' style={{backgroundColor:currentPage === 'WorkInforPage' ? 'white' : 'transparent'}}>
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
                        <div className='manageAccount-section' style={{backgroundColor:currentPage === 'SocialMediaPage' ? 'white' : 'transparent'}}>
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
                        <div className='manageAccount-section' style={{backgroundColor:currentPage === 'DescriptionPage' ? 'white' : 'transparent'}}>
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
                        <div className='manageAccount-section' style={{backgroundColor:currentPage === 'MyHomePage' ? 'white' : 'transparent'}}>
                            <NavLink to="/MyHomePage" onClick={() => setCurrentPage('MyHomePage')}>
                                <img
                                    src='https://cdn-icons-png.flaticon.com/128/1946/1946488.png'
                                    alt=''
                                />
                            </NavLink>
                        </div>                
                    </div>
            </div>
            <div className='manageAccount-card'>
                <div className='flex-left'></div>
                <div className='manageAccount-section-text'>
                    <Switch>
                        <Route path='/ManageAccount/ProfilePage'><ProfilePage /></Route>
                        <Route path='/ManageAccount/WorkInforPage'><WorkInforPage /></Route>
                        <Route path='/ManageAccount/SocialMediaPage'><SocialMediaPage /></Route>
                        <Route path='/ManageAccount/DescriptionPage'><DescriptionPage /></Route>
                        <Redirect to='/ManageAccount/ProfilePage' />
                    </Switch>
                </div>
            </div>
            <div className='manageAccount-button'>
                <button>編集</button>
            </div>
        </div>
    );
};

export default ManageAccount;