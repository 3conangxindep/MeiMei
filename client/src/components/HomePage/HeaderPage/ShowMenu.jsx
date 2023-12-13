import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link, Switch, Route } from 'react-router-dom';
import './ShowMenu.css';
import { useAuth } from '../../AuthContext';

const ShowMenu = () => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const idcard = userData.data.id_card;
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
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("currentUser");
        window.location.href = "/";
    }

    let placeHolderImg = "";
    const imgPath = `http://localhost:8000${data.img_url}`;
    // console.log(imgPath)
    if (data.user_name) {
        const nameSplit = data.user_name.split(" ");
        placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
    }

    // const [showMenu, setShowMenu] = useState(false);

    // const toggleMenu = () => {
    //     setShowMenu(!showMenu);
    // }

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
        // Kiểm tra xem sự kiện click có xảy ra bên ngoài menu không
        if (showMenu && !event.target.closest('.menu-container')) {
            setShowMenu(false);
        }
        };

        // Đăng ký hàm xử lý sự kiện click khi component được render
        document.addEventListener('click', handleOutsideClick);

        // Hủy đăng ký hàm xử lý sự kiện khi component unmount
        return () => {
        document.removeEventListener('click', handleOutsideClick);
        };
    }, [showMenu]);

    return (
        <div className='menu-container'>
            {/* toggleMenuContainer */}
            <div className='flex items-center justify-center w-auto h-auto overflow-hidden transition duration-200 bg-white rounded-full cursor-pointer hover:bg-gray-200 hover:shadow-md hover:shadow-green-300 hover:rounded-full hover:ring-2 hover:ring-green-500'>
                {/* set ảnh account của bản thân */}
                {/* toggleMenuContainer-image */}
                <div className='flex items-center justify-center overflow-hidden border border-gray-500 border-solid rounded-full cursor-pointer w-11 h-11'>
                    <img
                        className='object-cover w-4/5 rounded-full h-4/5'
                        src={
                            imgPath == "http://localhost:8000null"
                                ? placeHolderImg
                                : imgPath
                        }
                        alt='avatar'
                        onClick={toggleMenu}
                    />
                </div>
                {showMenu && (
                    <div className='absolute z-10 h-auto p-4 bg-gray-100 border border-gray-300 border-solid rounded-md shadow-md right-3 top-20 none w-80 shadow-green-300'>
                        <ul className='p-0 m-3 list-none'>
                            {/* Menu items */}
                            <li className='flex items-center justify-between p-4 transition duration-200 bg-gray-100 border-b cursor-pointer rounded-t-md border-b-solid border-b-gray-400 : hover:border :hover:border-solid hover:border-gray-200 hover:bg-gray-200 hover:rounded-md'>
                                {/* menuImage */}
                                <div className='flex items-center justify-center float-left'>
                                    {/* ảnh account */}
                                    <Link to='/InformationPage' className='flex items-center justify-center border border-gray-500 border-solid rounded-full w-14 h-14'>
                                        <img className='object-cover w-4/5 rounded-full h-4/5'
                                            src={
                                                imgPath == "http://localhost:8000null"
                                                    ? placeHolderImg
                                                    : imgPath
                                            }
                                            alt='avatar' />
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
                            <li className='flex items-center justify-between p-4 transition duration-200 bg-gray-100 rounded-md cursor-pointer : hover:border :hover:border-solid hover:border-gray-200 hover:bg-gray-200 hover:rounded-md' onClick={handleLogout}>
                                <p>ログアウト</p>
                                <div className='flex items-center justify-center w-6 h-6'><img className='object-cover w-full h-full' src='https://cdn-icons-png.flaticon.com/128/10015/10015437.png' alt='' /></div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowMenu;
