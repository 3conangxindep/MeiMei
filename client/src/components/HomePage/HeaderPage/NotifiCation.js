import React from 'react';
import './NotifiCation.css';

const NotifiCation = ({onClose}) => {
    return (
        <div className='notification-container'>
            
            <div className='notification-grid'>
                <div className='notification-text'>通知</div>
                <div><button onClick={onClose}>X</button></div>
            </div>
            
             {/* vi du list danh sach thong bao */}
            <li>
            <div className='notification-grid'>
                {/* set ảnh của account đối phương */}
                <div className='notification-image'>
                    <img 
                        src='https://cdn-icons-png.flaticon.com/128/2945/2945408.png'
                        className='image'
                        alt=''
                    />
                </div>
                <div>
                    <div><b>aaa</b>があなたをフォロー中です。</div>
                    <div className='formattedDate'>time</div>
                </div>
                </div>
            </li>

            <li>
            <div className='notification-grid'>
                {/* set ảnh của account đối phương */}
                <div className='notification-image'>
                    <img 
                        src='https://cdn-icons-png.flaticon.com/128/2945/2945408.png'
                        className='image'
                        alt=''
                    />
                </div>
                <div>
                    <div><b>aaa</b>があなたをフォロー中です。</div>
                    <div className='formattedDate'>time</div>
                </div>
                </div>
            </li>
        </div>
    );
};

export default NotifiCation;