import React, { useState, useEffect } from 'react';
import ShowMenu from './ShowMenu';
import NotifiCation from './NotifiCation';
import './Header.css';
import axios from "axios";

const Header = () => {
    const [showNotification, setShowNotification] = useState(false);

    const handleNotificationClick = () => {
        // Khi người dùng nhấn vào biểu tượng thông báo
        setShowNotification(true);
    };

    const handleNotificationClose = () => {
        // Khi người dùng nhấn vào ngoài hoặc nút đóng
        setShowNotification(false);
    };

    return (
        <div className='relative w-full h-20 px-4 border-box'>
            {/* header-container */}
            <div className='flex items-center justify-between w-full h-full'>
                {/* header-text */}
                <div className='float-left text-4xl pl-2.5 font-bold text-white'>MEIMEI</div>
                <div className='p-2.5 flex justify-center items-center'>

                    {/* notification */}
                    <div className='absolute w-5 h-5 rounded-full border border-solid border-gray-500 flex justify-center items-center bg-red-500 text-white top-3'>1</div>
                    <div className='flex items-center justify-center mr-4 overflow-hidden transition duration-200 border border-black border-solid rounded-full cursor-pointer h-9 w-9 2-8 hover:shadow-md hover:shadow-green-400 hover:bg-green-200'>
                        <img
                            className='object-cover w-4/5 rounded-full h-4/5'
                            src='https://cdn-icons-png.flaticon.com/128/3602/3602145.png'
                            alt='notification'
                            onClick={handleNotificationClick}
                        />
                    </div>

                    {/* account */}
                    <div><ShowMenu></ShowMenu></div>
                </div>
            </div>
            <div>{showNotification && <NotifiCation onClose={handleNotificationClose} />}</div> {/* Hiển thị Component Notification nếu showNotification là true */}
        </div>
    );
};

export default Header;