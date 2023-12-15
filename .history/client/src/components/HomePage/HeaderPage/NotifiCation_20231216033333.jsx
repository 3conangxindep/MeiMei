import React, { useEffect, useState } from 'react';
import './NotifiCation.css';
import axios from 'axios';
import API_BASE_URL from '../../../apiConfig';

const NotifiCation = ({ onClose }) => {
    const user = JSON.parse(localStorage.getItem('currentUser')).data;
    const id_card = user.id_card;
    const [newNotification, setNewNotification] = useState([]);
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const http = axios.create({
                    baseURL: `http://${API_BASE_URL}:8000`,
                    headers: {
                        'X-Requested-with': 'XMLHttpRequest',
                    },
                    withCredentials: true,
                });

                // Fetching new notifications
                const responseNewNoti = await http.get(`/api/contact/newNotification/${id_card}`);
                setNewNotification(responseNewNoti.data.data);

                // Fetching historical notifications
                const responseNoti = await http.get(`/api/contact/notification/${id_card}`);
                setNotification(responseNoti.data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [id_card]);

    const setImg = (e) => {
        let placeHolderImg = '';
        const imgPath = `http://${API_BASE_URL}:8000${e.img_url || ''}`;

        if (e.user_name) {
            const nameSplit = e.user_name.split(' ');
            placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
        }

        return imgPath === `http://${API_BASE_URL}:8000null` ? placeHolderImg : imgPath;
    };

    return (
        <div className='absolute right-3 py-2.5 px-3.5 bg-gray-100 border border-solid border-gray-300 rounded-md shadow-md shadow-green-300 z-20'>
            <div className='relative flex items-center p-2.5'>
                <div className='absolute top-0 left-0 text-xl font-bold cursor-pointer text-green-950'>通知</div>
                <div>
                    <button className='absolute top-0 right-0 text-sm font-bold cursor-pointer' onClick={onClose}>
                        X
                    </button>
                </div>
            </div>

            <div className='mt-5'>
                {newNotification.map((e, index) => (
                    <li
                        key={`newNotification-${index}`}
                        className={`list-none transition duration-200 cursor-pointer ${
                            e._ ? 'bg-gray-200' : ''
                        } hover:bg-gray-200 hover:border hover:border-gray-200 hover:rounded-md`}
                    >
                        <NotificationItem notification={e} setImg={setImg} />
                    </li>
                ))}
                {notification.map((e, index) => (
                    <li
                        key={`notification-${index}`}
                        className='list-none transition duration-200 cursor-pointer hover:bg-gray-200 hover:border hover:border-gray-200 hover:rounded-md'
                    >
                        <NotificationItem notification={e} setImg={setImg} />
                    </li>
                ))}
            </div>
        </div>
    );
};

const NotificationItem = ({ notification, setImg }) => (
    <div className='relative flex items-center p-2.5'>
        <div className='w-11 h-11 mr-2.5 rounded-full border border-solid border-gray-300 flex justify-center items-center'>
            <img className='object-cover w-10 h-10 rounded-full' src={setImg(notification)} alt='' />
        </div>
        <div>
            <div>
                <b>{notification.user_name}</b>があなたをフォロー中です。
            </div>
            <div className='text-gray-500 text-md'>{notification.created_at}</div>
        </div>
    </div>
);

export default NotifiCation;
