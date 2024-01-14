import { Link, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../apiConfig';

const GroupMembers = ({ searchTerm, onSearchChange }) => {
    
    const [showGroupButton,setShowGroupButton] = useState(false);

      // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const id_card = userData.data.id_card;

    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isSaved, setIsSaved] = useState();

    // const [search, setSearch] = useState("");
    // const search = localStorage.getItem('searchTerm');


    // console.log(search);

    // hien thi them xoa nhom
    const [menuVisibleList, setMenuVisibleList] = useState(Array(data.length).fill(false));
    const [isNewGroupVisible, setNewGroupVisible] = useState(Array(data.length).fill(false));
    const [showInput, setShowInput] = useState(Array(data.length).fill(false));
    const [showButtom, setShowButtom] = useState(Array(data.length).fill(false));
    const [openedMenuIndex, setOpenedMenuIndex] = useState(null);



    const handlePlusGroup =(e, index)=>{
        const showInputList = [...showInput];
        showInputList[index] = !showInputList[index];
        setShowInput(showInputList);        
        
        const showButtomtList = [...showButtom];
        showButtomtList[index] = !showButtomtList[index];
        setShowButtom(showButtomtList);
    };

    const handleMenuClick = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Đóng menu trước đó nếu có
        if (openedMenuIndex !== null) {
        setMenuVisibleList((prevMenuList) => {
            const updatedMenuList = [...prevMenuList];
            updatedMenuList[openedMenuIndex] = false;
            return updatedMenuList;
        });
        setNewGroupVisible((prevMenuGroupList) => {
            const updatedMenuGroupList = [...prevMenuGroupList];
            updatedMenuGroupList[openedMenuIndex] = false;
            return updatedMenuGroupList;
        });
        }
        
        // Mở menu mới
        setMenuVisibleList((prevMenuList) => {
        const updatedMenuList = [...prevMenuList];
        updatedMenuList[index] = !updatedMenuList[index];
        return updatedMenuList;
        })    
        // Cập nhật index của menu đang mở
        setOpenedMenuIndex(index);
    };
    
    
    
    const handleCloseMenuClick = (e, index) => {
        const updatedMenuVisibleList = [...menuVisibleList];
        updatedMenuVisibleList[index] = false;
        setMenuVisibleList(updatedMenuVisibleList);
    
        const updatedisNewGroupVisible = [...isNewGroupVisible];
        updatedisNewGroupVisible[index] = false;
        setNewGroupVisible(updatedisNewGroupVisible);
    
        // Đặt menu đang mở về null khi đóng
        setOpenedMenuIndex(null);
    }
    
    
        const handleAddToGroupClick = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        const updatedisNewGroupVisible = [...isNewGroupVisible];
        updatedisNewGroupVisible[index] = !updatedisNewGroupVisible[index];
        setNewGroupVisible(updatedisNewGroupVisible);
        };
        
        const handleCloseGroup = (e, index) => {
        const updatedisNewGroupVisible = [...isNewGroupVisible];
        updatedisNewGroupVisible[index] = false;
        setNewGroupVisible(updatedisNewGroupVisible);
        };

    // Thêm một sự kiện lắng nghe click ở ngoài menu để đóng menu
    const handleOutsideClick = (e) => {
        // Kiểm tra xem click có xảy ra bên trong element menu hay không
        if (!e.target.closest(".show-menu")) {
        // Đóng tất cả các menu và nhóm mới
        setMenuVisibleList(Array(data.length).fill(false));
        setNewGroupVisible(Array(data.length).fill(false));
        }
    };

    // Thêm sự kiện lắng nghe click ở cấp cao nhất, chẳng hạn như trên body hoặc một container lớn
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);

        // Cleanup sự kiện khi component unmounts
        return () => {
        document.removeEventListener("click", handleOutsideClick);
        };
    }, []);



    useEffect(() => {
        // setSearch(localStorage.getItem('searchTerm'));
        let apiUrl = `http://${API_BASE_URL}:8000/api/contact/following/${id_card}/${currentPage}`;
        // Kiểm tra xem có từ khóa tìm kiếm không
        if (searchTerm) {
        apiUrl = `http://${API_BASE_URL}:8000/api/contact/${id_card}/${currentPage}/${searchTerm}`;

        }

        fetch(apiUrl)
        .then((response) => response.json())
        .then((apiData) => {
            setData(apiData.data);
            setTotalPages(apiData.totalPages);
            console.log(apiData.data);
            // localStorage.setItem('searchTerm', "")
            // setSearch(localStorage.setItem('searchTerm', ""));
        })
        .catch((error) => {
            console.error("Lỗi khi gửi yêu cầu:", error);
        });
    }, [currentPage, id_card, isSaved, searchTerm]);

    // const [isSaved, setIsSaved] = useState(false);
    // const toggleSaved = () => {
    //   setIsSaved(!isSaved);
    // };

    //cách viết phần này của Recent và Following là khác nhau 
    const handleStarClick = (event, id_card, contact_id) => {
        event.preventDefault();
        //event.stopPropagation();

        console.log('click', contact_id);
        fetch(`http://${API_BASE_URL}:8000/api/contact/like/${id_card}/${contact_id}`, {
        method: 'PUT',
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log('like', responseData.data);
            setIsSaved(responseData.data.like);
        })
        .catch((error) => {
            console.error('like', error);
        });
    };

    const setImg = (e) => {
        // console.log(data.img_url)
        let placeHolderImg = "";
        let imgPath = `http://${API_BASE_URL}:8000${e.img_url}`;
        // console.log(imgPath)
        if (e.user_name) {
        const nameSplit = e.user_name.split(" ");
        placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
        }
        return imgPath === `http://${API_BASE_URL}:8000null` ? placeHolderImg : imgPath;

    }

    const goToPage = (page) => {
        if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
        }
    };

    return (
        <div className='relative flex flex-col w-full px-3 py-4 bg-white h-lhv border-box'>
            
            {/* dropdown button */}
            {/* dat map group o day */}
            {data.map((e,index)=>(
                <div className='w-full max-h-full min-h-16 bg-[#D9D9D9]/10 rounded-md drop-shadow-md drop-shadow-gray-200 border border-[#D9D9D9]' 
                    onMouseEnter={()=>setShowGroupButton(true)} 
                    onMouseLeave={()=>setShowGroupButton(false)}
                >
                    <button className='relative w-full h-16 bg-[#D9D9D9]/50 rounded-md rounded-t-sm pl-3 text-lg text-left text-[#0E3A36] font-bold border border-gray-300'>
                        MEIMEIGROUP 
                        {/* <img src={'https://cdn-icons-png.flaticon.com/128/649/649731.png'} alt='' className='absolute w-3 transform rotate-180 right-3 top-6'/>  */}
                        <div className="absolute w-4 h-2 transform rotate-180 bg-[#0E3A36] clip-triangle right-3 top-7" ></div>
                    </button>
                    
                    {showGroupButton && (
                        <ul className='flex flex-col items-center justify-center w-full max-h-full px-1 transition duration-200 ease-in-out min-h-20'>
                        
                            {/* dat map list user o day */}
                            {data.map((e,index=>(
                                <li className='relative flex items-center w-full h-14 pl-1.5 bg-gray-100 my-1 border rounded-lg border-gray-300 transition duration-200 cursor-pointer hover:bg-gray-200 hover:border-gray-200 hover:border hover:rounded-lg'>
                                    <Link key={e.contact_id} to={`/InformationPage/${id_card}/${e.id_card}`} className='relative flex items-center w-3/5 p-1 bg-gray-300 border border-gray-300 rounded-lg h-4/5'>
                                        
                                        {/* set image,name,email */}
                                        <img src={setImg(e)} className='mr-1 border border-gray-400 rounded-full w-7 h-7' alt='user avatar' />
                                        <div className='w-9/12 max-w-full overflow-hidden'>
                                            <p className='text-xs'><b>{e.user_name}</b></p>
                                            <p className='text-xs text-gray-500'>{e.email}</p>
                                        </div>
                                        {/* chinh sua nhom va so thich */}
                                        <div className='absolute right-1'>
                                            {/* <div onClick={(event) =>handleMenuClick(event, id_card, e.id_card)} className='text-left'> */}
                                                <img
                                                    onClick={(event) =>handleMenuClick(event, index)}
                                                    className='w-3 pb-2'
                                                    src='https://cdn-icons-png.flaticon.com/128/2311/2311524.png'
                                                    alt=''
                                                />

                                        {/* set ảnh được đánh dấu sao va không được đánh dấu sao */}
                                        <div className={index} onClick={(event) => handleStarClick(event, id_card, e.contact_id)} style={{width:'0.75rem'}}>
                                            {e.like ? (
                                            <img
                                                className='w-3.5 hover:bg-gray-200 hover:border-gray-200 hover:border hover:rounded-md'
                                                style={{ width: '15px' }}
                                                src='https://cdn-icons-png.flaticon.com/128/2377/2377810.png'
                                                alt='save'
                                            />
                                            ) : (
                                            <img
                                                className='w-3.5 hover:bg-gray-200 hover:border-gray-200 hover:border hover:rounded-md'
                                                style={{ width: '15px' }}
                                                src='https://cdn-icons-png.flaticon.com/128/2377/2377878.png'
                                                alt='nosave'
                                            />
                                            )}
                                        </div>
                                        </div>
                                    </Link>
                                    <div className='absolute right-1/2 sm:right-[41%] sm:top-[40%]'>
                                        {menuVisibleList[index] &&(
                                                <div className='absolute z-10 inline-flex flex-col w-40 h-auto px-1 text-xs bg-gray-100 border border-gray-300 rounded-md left-5 justify-evenly top-1 drop-shadow-md'>
                                                    <div className='absolute flex items-center justify-center w-3 h-3 text-xs rounded-full hover:border-gray-300 hover:border right-1 top-1' onClick={(event) =>handleCloseMenuClick(event, index)}>x</div>
                                                    <br/>
                                                    
                                                    <div className='inline-flex items-center justify-between px-1 py-2 mt-1 text-left transition duration-200 ease-in-out hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md' onClick={(event) =>handleAddToGroupClick(event, index)}>
                                                        <p>グループに追加する</p>
                                                        <img src='https://cdn-icons-png.flaticon.com/64/446/446136.png' className='w-3'/>
                                                    </div>
                                                    <div className='inline-flex items-center justify-between px-1 py-2 text-left transition duration-200 ease-in-out hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md'>
                                                        <p>削除</p>
                                                        <img src='https://cdn-icons-png.flaticon.com/64/484/484662.png' className='w-3' />
                                                    </div>
                                                </div>
                                        )}

                                        {isNewGroupVisible[index] &&(
                                            <ul className='absolute z-10 inline-flex flex-col w-40 h-auto px-2 py-1 text-xs bg-gray-100 border border-gray-300 rounded-md left-5 justify-evenly top-16 drop-shadow-md'>
                                                
                                                <div className='absolute flex items-center justify-center w-3 h-3 text-xs rounded-full hover:border-gray-300 hover:border right-1 top-1' onClick={(event) =>handleCloseGroup(event, index)}>x</div>
                                                <br/>
                                                <li className='inline-flex items-center justify-between px-1 py-2 text-left transition duration-200 ease-in-out hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md'>
                                                    <input type='checkbox' className='w-3 mr-3'/>
                                                    <h4 className='max-w-full overflow-hidden'>groupname</h4>
                                                </li>
                                                <li className='inline-flex items-center justify-between px-1 py-2 text-left transition duration-200 ease-in-out hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md' onClick={(event) =>handlePlusGroup(event, index)}>
                                                    <img src='https://cdn-icons-png.flaticon.com/64/446/446136.png' className='w-3'/>
                                                    <h4>新規グループを作成</h4>
                                                </li>
                                                {showInput[index] &&(
                                                    <li className='inline-flex items-center justify-between px-1 py-2 text-left transition duration-200 ease-in-out border-b border-solid hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md border-b-gray-300'>
                                                        <input className='w-full h-full bg-transparent outline-none' placeholder='グループの名前'/>
                                                    </li>
                                                )}
                                                <br/>
                                                {showButtom[index] &&(
                                                    <buttom className='w-full mb-1 text-right cursor-pointer hover:text-[#36735B] hover:font-bold'>編集</buttom>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                    

                                    <p className='absolute bottom-0 text-xs text-gray-400 right-2'>time</p>
                                </li>
                            )))}

                        </ul>
                    )}
                </div>
            ))}

            <div className='fixed bottom-0 flex items-center justify-center h-auto p-0.5 bg-gray-300 rounded-md w-full left-0'>
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className='hover:text-[#36735B] hover:cursor-pointer'>
                    前のページ
                </button>
                <span className='mx-4'>{currentPage}/{totalPages}</span>
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className='hover:text-[#36735B] hover:cursor-pointer'>
                    次のページ
                </button>
            </div>
        </div>
    );
};

export default GroupMembers;
