import React, { useState }from 'react';
import "./RecentAccounts.css"

const RecentAccounts = () => {

    const [isSaved, setIsSaved] = useState(false);

    const toggleSaved = () => {
        setIsSaved(!isSaved);
    };

    return (
        <div className='recentaccounts-container'>
            <li>
                <div className='item-container'>
                    <div className='item-border'>                 
                        <div className='image-container'>
                            <img 
                                src='https://cdn.dribbble.com/users/2645/screenshots/197202/media/44b8a3db56f1f459e694118e36857c7e.png?resize=400x300&vertical=center' 
                                alt=''
                            />
                        </div>
                        <div>
                            <div style={{fontSize:'14px'}}><b>UCHIHA ITACHI</b></div>
                            <div style={{fontSize:'13px'}}>email</div>
                        </div>
                        <div style={{position:'absolute',top:'3px',right:'5px'}}>
                            <img 
                                style={{width:'10px'}}
                                src='https://th.bing.com/th/id/OIP.HzOg6SObSe_LTAYbD0WHHgHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7' 
                                alt=''
                                />
                                {/* set ảnh được đánh dấu sao va không được đánh dấu sao */}
                            <div onClick={toggleSaved}>
                                {isSaved ? (
                                    <img
                                    className='image-icon'
                                    style={{ width: '15px' }}
                                    src='https://cdn-icons-png.flaticon.com/128/2377/2377810.png'
                                    alt='save'
                                    />
                                ) : (
                                    <img
                                    className='image-icon'
                                    style={{ width: '15px' }}
                                    src='https://cdn-icons-png.flaticon.com/128/2377/2377878.png'
                                    alt='nosave'
                                    />
                                )}
                            </div>
                        </div>                   
                    </div>
                    
                    {/*set thoi gian  */}
                    <div style={{paddingRight:"10px",color:"gray"}}>time</div>
                </div>
            </li>
        </div>
    );
};

export default RecentAccounts;