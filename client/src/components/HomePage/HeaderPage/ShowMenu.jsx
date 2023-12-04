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
        <div className='toggleMenuContainer'>
            {/* set ảnh account của bản thân */}
            <div className='toggleMenuContainer-image'>
            <img src={`/img_user/${data.img_url}`} alt='' 
                onClick={toggleMenu}
            />
            </div>
            {showMenu && (
                <div className='menu'>
                    <ul>
                        {/* Menu items */}
                        <li>
                            <div className='menu-image'>
                                {/* ảnh account */}
                                <Link to='/InformationPage'>
                                <img src={`/img_user/${data.img_url}`} alt='' />
                                </Link>
                            </div>
                            <div className='menu-text'><b>{data.user_name}</b></div> 
                        </li>
                        <li>
                            <div className='menu-text'>
                                <Link to="/ManageAccount">アカウントを管理</Link>
                            </div>
                            <div className='menu-icon'><img className='image' src='https://cdn-icons-png.flaticon.com/128/875/875100.png' alt='' /></div>
                        </li>
                        <li>
                            <div className='menu-text'>
                                <p onClick ={handleLogout}>ログアウト</p>
                            </div>                            
                            <div className='menu-icon'><img className='image' src='https://cdn-icons-png.flaticon.com/128/10015/10015437.png' alt='' /></div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShowMenu;
