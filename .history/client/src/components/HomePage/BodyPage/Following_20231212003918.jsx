import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../apiConfig';


const Following = () => {
  // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const id_card = userData.data.id_card;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`http://${API_BASE_URL}:8000/api/contact/${id_card}/${currentPage}`)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
      });
  }, [currentPage, id_card]);

   const [isSaved, setIsSaved] = useState(false);
    const toggleSaved = () => {
        setIsSaved(!isSaved);
    };

  return (
    <div>
      <div className='border-box relative w-full h-screen p-2.5 flex flex-col'>
            <li className='list-none transition duration-200 cursor-pointer hover:bg-gray-200 hover:border-gray-200 hover:border hover:rounded-md'>
                {data.map(e => (
                  // item-container
                  <div className='relative flex items-center justify-between w-full h-16 pl-1.5 bg-gray-200 border-b-2 rounded-md border-b-solid border-b-gray-400'>
                    {/* item-border */}
                    <div className='relative w-56 h-4/5 py-3 px-1.5 flex items-center justify-between border border-solid border-gray-300 rounded-md bg-gray-300'>
                      {/* image-container */}
                      <div className='w-10 h-10 mr-2.5 rounded-full flex justify-center items-center'>
                        <img
                          className='object-cover w-full h-full border border-gray-400 border-solid rounded-full'
                          src='https://cdn.dribbble.com/users/2645/screenshots/197202/media/44b8a3db56f1f459e694118e36857c7e.png?resize=400x300&vertical=center'
                          alt=''
                        />
                      </div>
                      <div>
                        <div className='text-md'><b>{e.name}</b></div>
                        <div className='text-sm text-gray-500'>{e.mail}</div>
                      </div>
                      <div>
                        <img
                          className='w-3.5 pb-2'
                          src='https://cdn-icons-png.flaticon.com/128/2311/2311524.png'
                          alt=''
                        />
                        {/* set ảnh được đánh dấu sao va không được đánh dấu sao */}
                        <div onClick={toggleSaved}>
                          {isSaved ? (
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
                    <div className='absolute bottom-0 text-gray-500 right-2'>{e.updated_at}</div>
                  </div>
                ))}

            </li>
        </div>
      
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Trang trước
      </button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>
        Trang sau
      </button>

    </div>
    

  );
};

export default Following;