import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Search from './Search';
import './MyHomePage.css';

const MyHomePage = () => {
    return (
        <div className='myhome-container'>
            <div className='myhome-card'>
                <div className='myhome-left'>
                    <li className='myhome-image'>

                        {/* thay doi anh account tai day */}
                        <img src='https://cdn-icons-png.flaticon.com/128/2945/2945408.png' alt='' />
                    </li>
                    <li>
                        <div className='myhome-textname'>MEIMEI
                        </div>
                        <p>学生</p>
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
                                meimei@gmail.com
                            </div>
                        </li>
                        {/*website  */}
                        <li>
                            <div className='myhome-item'>
                                <img  src='https://cdn-icons-png.flaticon.com/128/900/900782.png' alt='' />
                                youtubesite.com
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
