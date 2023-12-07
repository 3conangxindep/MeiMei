import React , { useState,useEffect }from 'react';
import axios from "axios";
import { Link, Switch, Route } from 'react-router-dom';
import './ShowMenu.css';
import { useAuth } from '../../AuthContext';

const ShowMenu = () => {
    
    const [user, setUser] = useState(
        localStorage.hasOwnProperty("currentUser") === true
          ? JSON.parse(localStorage.getItem("currentUser"))
          : null
    );
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const idcard=userData.data.id_card;
    const [data, setData] = useState([]); 
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/${idcard}`)
        .then((response) => response.json())
        .then((apiData) => {
            setData(apiData);
            //console.log(apiData.id_card)   code kiem tra id hien tai
        })
        .catch((error) => {
            console.error("Lỗi khi gửi yêu cầu:", error);
        });
    }, []);
    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("currentUser");
        setUser(null);
        window.location.href="/";
    }

    const  [showMenu ,setShowMenu] = useState(false);

    const toggleMenu = () =>{
        setShowMenu(!showMenu);
    }

    return (
        // toggleMenuContainer
        <div className='flex items-center justify-center w-auto h-auto overflow-hidden transition duration-200 bg-white rounded-full cursor-pointer hover:bg-gray-200 hover:shadow-md hover:shadow-green-300 hover:rounded-full'>
            {/* set ảnh account của bản thân */}
            {/* toggleMenuContainer-image */}
            <div className='flex items-center justify-center overflow-hidden border border-gray-300 border-solid rounded-full cursor-pointer w-11 h-11'>
            <img 
                className='object-cover w-4/5 rounded-full h-4/5'
                src={`/img_user/${data.img_url}`} alt='' 
                onClick={toggleMenu}

            />
            </div>
            {/* menu */}
            {showMenu && (
                <div className='absolute z-10 h-auto p-4 bg-gray-100 border border-gray-300 border-solid rounded-md shadow-md right-3 top-20 none w-80 shadow-green-300'>
                    <ul className='p-0 m-3 list-none'>
                        {/* Menu items */}
                        <li className='flex items-center justify-between p-4 transition duration-200 bg-gray-100 border-b cursor-pointer rounded-t-md border-b-solid border-b-gray-400 : hover:border :hover:border-solid hover:border-gray-200 hover:bg-gray-200 hover:rounded-md'>
                            {/* menuImage */}
                            <div className='flex items-center justify-center float-left w-12 h-12 border border-gray-300 border-solid rounded-full'>
                                {/* ảnh account */}
                                <Link to='/InformationPage'>
                                <img className='object-cover w-4/5 rounded-full h-4/5' src={`/img_user/${data.img_url}`} alt='' />
                                </Link>
                            </div>
                            <div className='float-left text-2xl font-bold text-green-950'><b>{data.user_name}</b></div> 
                        </li>
                        <li>
                            <Link 
                                className='flex items-center justify-between w-full h-full p-4 transition duration-200 bg-gray-100 rounded-md cursor-pointer text-green-950 : hover:border :hover:border-solid hover:border-gray-200 hover:bg-gray-200 hover:rounded-md'
                                to="/ManageAccount"
                            >
                            アカウントを管理
                            <div className='flex items-center justify-center w-6 h-6'><img className='object-cover w-full h-full' src='https://cdn-icons-png.flaticon.com/128/875/875100.png' alt='' /></div>
                            </Link>
                        </li>
                        <li className='flex items-center justify-between p-4 transition duration-200 bg-gray-100 rounded-md cursor-pointer : hover:border :hover:border-solid hover:border-gray-200 hover:bg-gray-200 hover:rounded-md' onClick ={handleLogout}> 
                            <p>ログアウト</p>
                            <div className='flex items-center justify-center w-6 h-6'><img className='object-cover w-full h-full' src='https://cdn-icons-png.flaticon.com/128/10015/10015437.png' alt='' /></div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShowMenu;
