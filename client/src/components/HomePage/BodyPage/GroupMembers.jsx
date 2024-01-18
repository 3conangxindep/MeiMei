import { Link, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../apiConfig';

const GroupMembers = ({ searchTerm, onSearchChange }) => {

    const [showGroupButton, setShowGroupButton] = useState(false);

    // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const id_card = userData.data.id_card;

    const [data, setData] = useState([]);
    const [groupData, setGroupData] = useState([]);
    // const [groupId, setGroupId] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isSaved, setIsSaved] = useState();
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    // Thêm một sự kiện lắng nghe click ở ngoài menu để đóng menu



    useEffect(() => {
        // setSearch(localStorage.getItem('searchTerm'));
        let apiUrl = `http://${API_BASE_URL}:8000/api/groups/${currentPage}`;
        // Kiểm tra xem có từ khóa tìm kiếm không
        if (searchTerm) {
            apiUrl = `http://${API_BASE_URL}:8000/api/group/${currentPage}/${searchTerm}`;

        }

        fetch(apiUrl)
            .then((response) => response.json())
            .then((apiData) => {
                setData(apiData.data);
                // setGroupId(data.group_id);
                setTotalPages(apiData.totalPages);
                console.log(apiData.data);
                // console.log(groupId);
                // localStorage.setItem('searchTerm', "")
                // setSearch(localStorage.setItem('searchTerm', ""));
            })
            .catch((error) => {
                console.error("Lỗi khi gửi yêu cầu:", error);
            });
    }, [currentPage, id_card, isSaved, searchTerm]);


    const handleClickGroup = (event, group_id) => {
        event.preventDefault();
        //event.stopPropagation();

        console.log(group_id);
        // let apiUrl = `http://${API_BASE_URL}:8000/api/manage/${group_id}`;
        // Kiểm tra xem có từ khóa tìm kiếm không

        fetch(`http://${API_BASE_URL}:8000/api/manage/${group_id}`)
            .then((response) => response.json())
            .then((apiData) => {
                setGroupData(apiData.data);
                setTotalPages(apiData.totalPages);
                setIsSaved(group_id);
                setSelectedGroupId(group_id); // Lưu group_id vào state
                console.log(apiData.data);
                // console.log(groupData.email);
                // console.log(groupData.id_card);

                // localStorage.setItem('searchTerm', "")
                // setSearch(localStorage.setItem('searchTerm', ""));
            })
            .catch((error) => {
                console.error("Lỗi khi gửi yêu cầu:", error);
            });
    };

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
            {data.map((e, index) => (
                <div className='w-full my-1 max-h-full min-h-16 bg-[#D9D9D9]/10 rounded-md drop-shadow-md drop-shadow-gray-200 border border-[#D9D9D9]'
                    onClick={(event, index) => {
                        setShowGroupButton(true);
                        handleClickGroup(event, e.group_id);
                    }}
                    onMouseLeave={(event,index) => setShowGroupButton(false)}
                // onMouseEnter={() => setGroupId(e.group_id)}
                >
                    <button className='relative w-full h-16 bg-[#D9D9D9]/50 rounded-md rounded-t-sm pl-3 text-lg text-left text-[#0E3A36] font-bold border border-gray-300'>
                        {e.group_name}
                        {/* <img src={'https://cdn-icons-png.flaticon.com/128/649/649731.png'} alt='' className='absolute w-3 transform rotate-180 right-3 top-6'/>  */}
                        <div className="absolute w-4 h-2 transform rotate-180 bg-[#0E3A36] clip-triangle right-3 top-7" ></div>
                    </button>

                    {showGroupButton && selectedGroupId === e.group_id &&(
                        <ul className='flex flex-col items-center justify-center w-full max-h-full px-1 transition duration-200 ease-in-out min-h-20'>

                            {/* dat map list user o day */}
                            {groupData.map((e2, i) => (
                                <li className='relative flex items-center w-full h-14 pl-1.5 bg-gray-100 my-1 border rounded-lg border-gray-300 transition duration-200 cursor-pointer hover:bg-gray-200 hover:border-gray-200 hover:border hover:rounded-lg'>
                                    <Link key={e2.id_card} to={`/InformationPage/${id_card}/${e2.id_card}`} className='relative flex items-center w-3/5 p-1 bg-gray-300 border border-gray-300 rounded-lg h-4/5'>

                                        {/* set image,name,email */}
                                        <img src={setImg(e2)} className='mr-1 border border-gray-400 rounded-full w-7 h-7' alt='user avatar' />
                                        <div className='w-9/12 max-w-full overflow-hidden'>
                                            <p className='text-xs'><b>{e2.user_name}</b></p>
                                            <p className='text-xs text-gray-500'>{e2.email}</p>
                                        </div>
                                        {/* chinh sua nhom va so thich */}
                                        <div className='absolute right-1'>
                                            <div className={index} onClick={(event) => handleStarClick(event, id_card, e2.id_card)} style={{ width: '0.75rem' }}>
                                                {e2.like ? (
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
                                    <p className='absolute bottom-0 text-xs text-gray-400 right-2'>{e2.created_at}</p>
                                </li>
                            ))}

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
