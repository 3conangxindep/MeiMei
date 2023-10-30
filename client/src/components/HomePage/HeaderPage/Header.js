import React , { useState }from 'react';
import ShowMenu from './ShowMenu';
import NotifiCation from './NotifiCation';
import './Header.css';

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
        <div className='Header'>
            <div className='header-container'>
                <div className='header-text'>MEIMEI</div>
                <div className='grid-right'>

                    {/* notification */}
                    <div className='header-icon'>
                        <img  
                            src='https://cdn-icons-png.flaticon.com/128/3602/3602145.png'
                            alt='notification'
                            onClick={handleNotificationClick}
                        />
                    </div>

                    {/* account */}
                    <div><ShowMenu></ShowMenu></div>
                </div>
            </div>
            <div>{showNotification && <NotifiCation  onClose={handleNotificationClose}/>}</div> {/* Hiển thị Component Notification nếu showNotification là true */}
        </div>
    );
};

export default Header;