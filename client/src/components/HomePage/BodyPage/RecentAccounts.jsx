import { Link, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "./RecentAccounts.css"
import API_BASE_URL from '../../../apiConfig';

const RecentAccounts = () => {
    // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const id_card = userData.data.id_card;
    const [data, setData] = useState([]);
    const search = localStorage.getItem('searchTerm');
    // console.log(search);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isSaved, setIsSaved] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // let apiUrl = `http://${API_BASE_URL}:8000/api/contact/recent/${id_card}/${currentPage}`;
                const response = await fetch(`http://${API_BASE_URL}:8000/api/contact/recent/${id_card}/${currentPage}`);
                // Kiểm tra xem có từ khóa tìm kiếm không
                if (search) {
                    response = await fetch(`http://${API_BASE_URL}:8000/api/contact/${id_card}/${currentPage}/${search}`);
                }
                const apiData = await response.json();

                setData(apiData.data);
                setTotalPages(apiData.totalPages);
                // console.log(apiData.data);

            } catch (error) {
                console.error('Lỗi khi gửi yêu cầu:', error);
            }
        };
        fetchData();
    }, [currentPage, id_card, isSaved]);

    //cách viết phần này của Recent và Following là khác nhau   
    const handleStarClick = async (event, id_card, contact_id) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            const response = await fetch(`http://${API_BASE_URL}:8000/api/contact/like/${id_card}/${contact_id}`, {
                method: 'PUT',
            });
            const responseData = await response.json();

            console.log('like', responseData);
            setIsSaved(prevIsSaved => {
                // Sử dụng hàm callback để đảm bảo cập nhật đồng bộ và kích hoạt useEffect
                return !prevIsSaved;
            });
        } catch (error) {
            console.error('like', error);
        }
    };


    // const [isSaved, setIsSaved] = useState(false);

    // const toggleSaved = () => {
    //     setIsSaved(!isSaved);
    // };
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
        <div>
            <div className='border-box relative w-full h-screen p-2.5 flex flex-col'>
                {data.map(e => (
                    <Link to={`/InformationPage/${id_card}/${e.id_card}`} className='list-none transition duration-200 cursor-pointer hover:bg-gray-200 hover:border-gray-200 hover:border hover:rounded-md'>

                        {/* item-container */}
                        <div className='relative flex items-center justify-between w-full h-16 pl-1.5 bg-gray-200 border-b-2 rounded-md border-b-solid border-b-gray-400'>
                            {/* item-border */}
                            <div className='relative w-56 h-4/5 py-3 px-1.5 flex items-center justify-between border border-solid border-gray-300 rounded-md bg-gray-300'>
                                {/* image-container */}
                                <div className='w-10 h-10 mr-2.5 rounded-full flex justify-center items-center'>
                                    <img
                                        className='object-cover w-full h-full border border-gray-400 border-solid rounded-full'
                                        src={setImg(e)}
                                        alt=''
                                    />
                                </div>
                                <div>
                                    <div className='text-md'><b>{e.user_name}</b></div>
                                    <div className='text-sm text-gray-500'>{e.email}</div>
                                </div>
                                <div>
                                    <img
                                        className='w-3.5 pb-2'
                                        src='https://cdn-icons-png.flaticon.com/128/2311/2311524.png'
                                        alt=''
                                    />
                                    {/* set ảnh được đánh dấu sao va không được đánh dấu sao */}
                                    <div onClick={(event) => handleStarClick(event, id_card, e.id_card)}>
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
                            </div>

                            {/* set thoi gian */}
                            <div className='absolute bottom-0 text-gray-500 right-2'>{e.contact_updated_at}</div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className='flex justify-center items-center'>
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    Trang trước
                </button>
                <span className='mx-4'>Trang {currentPage}/{totalPages}</span>
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Trang sau
                </button>
            </div>


        </div>


    );
};

export default RecentAccounts;