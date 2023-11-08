// import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Search from './Search';
import './MyHomePage.css';
import React, { useState, useEffect } from 'react';


const MyHomePage = () => {
    
  // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const username = userData.data;  
    const idcard=username.id_card;


    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/${idcard}`)
        .then((response) => response.json())
        .then((apiData) => {
            setData(apiData);
            console.log(apiData.user_name)
        })
        .catch((error) => {
            console.error("Lỗi khi gửi yêu cầu:", error);
        });
    }, []);
      
    return (
        <div className='myhome-container'>
            <div className='myhome-card'>
                <div className='myhome-left'>
                    <li className='myhome-image'>
                        {/* thay doi anh account tai day */}
                        <img src='https://cdn-icons-png.flaticon.com/128/2945/2945408.png' alt='' />
                    </li>
                    <li>
                        <div className='myhome-textname'>{data.user_name}
                        </div>
                        <div>
                        <p>学生</p>
                        <p>学生</p>
                        </div>
                        
                    </li>
                    <li className='nfc-image'>
                        <img src='https://cdn-icons-png.flaticon.com/64/6357/6357872.png' alt=''/>
                    </li>
                </div>
                <div className='myhome-right'>
                    <ul><div className='myhome-right-title'>ECC株式会社</div>

                        {/* email */}
                        <li>
                            <div className='myhome-item'>
                                <img src='https://cdn-icons-png.flaticon.com/128/546/546394.png' alt='' />
                                {data.email}
                            </div>
                        </li>
                        {/*website  */}
                        <li>
                            <div className='myhome-item'>
                                <img  src='https://cdn-icons-png.flaticon.com/128/900/900782.png' alt='' />
                                {data.x}
                            </div>
                        </li>
                        {/* tel */}
                        <li>
                            <div className='myhome-item'>
                                <img src='https://cdn-icons-png.flaticon.com/128/159/159832.png' alt='' />
                                +080-1234-5678
                            </div>
                        </li>
                        {/* address */}
                        <li>
                            <div className='myhome-item'>
                                <img src='https://cdn-icons-png.flaticon.com/128/927/927667.png' alt='' />
                                大阪市北区中崎西2丁目3番地35号
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default MyHomePage;
