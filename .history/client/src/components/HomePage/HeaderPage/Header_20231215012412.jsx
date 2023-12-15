import React, { useState, useEffect } from 'react';
import ShowMenu from './ShowMenu';
import NotifiCation from './NotifiCation';
import './Header.css';
import axios from "axios";
import API_BASE_URL from '../../../apiConfig';

const Header = () => {
    const user = JSON.parse(localStorage.getItem('currentUser')).data;
    const id_card = user.id_card;
    const [showNotification, setShowNotification] = useState(false);
    const [notificationCount, setNotificationCount] = useState(1); // Set the initial count to 1 for demonstration
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const http = axios.create({
                    baseURL: `http://${API_BASE_URL}:8000`,
                    headers: {
                        "X-Requested-with": "XMLHttpRequest",
                    },
                    withCredentials: true,
                });

                await http.get(`/api/contact/${id_card}`);

                // Fetch user data
                // const response = await http.get(`/api/user/${contact_id}`);
                // setData(response.data);
                // console.log(response.data.user_name);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [notificationCount]);

  const handleNotificationClick = () => {
    // When the user clicks on the notification icon
    setShowNotification(true);
    // Reset notification count to 0
    setNotificationCount(0);
  };

  const handleNotificationClose = () => {
    // When the user clicks outside or on the close button
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
          {notificationCount > 0 && (
            <div className='absolute w-5 h-5 rounded-full border border-solid border-gray-500 flex justify-center items-center bg-red-500 text-white top-3 right-20'>
              {notificationCount}
            </div>
          )}
          <div className='flex items-center justify-center mr-4 overflow-hidden transition duration-200 border border-black border-solid rounded-full cursor-pointer h-9 w-9 2-8 hover:shadow-md hover:shadow-green-400 hover:bg-green-200'>
            <img
              className='object-cover w-4/5 rounded-full h-4/5'
              src='https://cdn-icons-png.flaticon.com/128/3602/3602145.png'
              alt='notification'
              onClick={handleNotificationClick}
            />
          </div>

          {/* account */}
          <div>
            <ShowMenu />
          </div>
        </div>
      </div>
      <div>{showNotification && <NotifiCation onClose={handleNotificationClose} />}</div> {/* Display Notification Component if showNotification is true */}
    </div>
  );
};

export default Header;
