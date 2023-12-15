import React, { useEffect, useState } from 'react';
import './NotifiCation.css';
import axios from "axios";
import API_BASE_URL from '../../../apiConfig';

const NotifiCation = ({ onClose }) => {
    const user = JSON.parse(localStorage.getItem('currentUser')).data;
    const id_card = user.id_card;
    const [newNotification,setNewNotification] = useState();
    const [notification,setNotification] = useState();

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

            //lấy new notification
            const responseNewNoti = await http.get(`/api/contact/newNotification/${id_card}`);
            setNewNotification(responseNewNoti.data.data);
            console.log("header - Follower " + JSON.stringify(responseNewNoti.data.data));

            //lấy notification
            const responseNoti = await http.get(`/api/contact/notification/${id_card}`);
            setNotification( responseNoti.data.data);
            console.log("header - Notification: " + responseNoti.data.data);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    fetchData();
}, [id_card]);
    

    return (
        // notification-container
        <div className='absolute right-3 py-2.5 px-3.5 bg-gray-100 border border-solid border-gray-300 rounded-md shadow-md shadow-green-300 z-20'>
            {/* notification-grid */}
            <div className='relative flex items-center p-2.5'>
                {/* notification-text */}
                <div className='absolute top-0 left-0 text-xl font-bold cursor-pointer text-green-950'>通知</div>
                <div><button
                    className='absolute top-0 right-0 text-sm font-bold cursor-pointer'
                    onClick={onClose}>
                    X
                </button></div>
            </div>

            <div className='mt-5'>
                {/* vi du list danh sach thong bao */}
                <li className='list-none transition duration-200 cursor-pointer hover:bg-gray-200 hover:border hover:border-gray-200 hover:rounded-md'>
                    {/* notification-grid */}
                    <div className='relative flex items-center p-2.5'>
                        {/* set ảnh của account đối phương */}
                        {/* notification-image */}
                        <div className='w-11 h-11 mr-2.5 rounded-full border border-solid border-gray-300 flex justify-center items-center'>
                            <img
                                className="object-cover w-10 h-10 rounded-full"
                                src='https://cdn-icons-png.flaticon.com/128/2945/2945408.png'
                                alt=''
                            />
                        </div>
                        <div>
                            <div><b>{newNotification.user_name}</b>があなたをフォロー中です。</div>
                            <div className='text-gray-500 text-md'>time</div>
                        </div>
                    </div>
                </li>

                <li className='list-none transition duration-200 cursor-pointer hover:bg-gray-200 hover:border hover:border-gray-200 hover:rounded-md'>
                    {/* notification-grid */}
                    <div className='relative flex items-center p-2.5'>
                        {/* set ảnh của account đối phương */}
                        {/* notification-image */}
                        <div className='w-11 h-11 mr-2.5 rounded-full border border-solid border-gray-300 flex justify-center items-center'>
                            <img
                                className="object-cover w-10 h-10 rounded-full"
                                src='https://cdn-icons-png.flaticon.com/128/2945/2945408.png'
                                alt=''
                            />
                        </div>
                        <div>
                            <div><b>{notification.user_name}</b>があなたをフォロー中です。</div>
                            <div className='text-gray-500 text-md'>time</div>
                        </div>
                    </div>
                </li>
            </div>
        </div>
    );
};

export default NotifiCation;