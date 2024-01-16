import React, { useState, useEffect } from 'react';
const Following = () => {
  const id = 222222;

  // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const username = userData.data;
  const idcard = username.id_card;
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://10.200.3.10/api/contact/`)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
        // apiData.forEach(element => {
        //     if(element.id_card==idcard)
        //     console.log(element.contact_id)
        // })
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
      });
  }, []);

   const [isSaved, setIsSaved] = useState(false);
    const toggleSaved = () => {
        setIsSaved(!isSaved);
    };

  return (
    <div>
      <div className='border-box relative w-full h-screen p-2.5 flex flex-col'>
            <li className='list-none transition duration-200 cursor-pointer hover:bg-gray-200 hover:border-gray-200 hover:border hover:rounded-md'>
                {/* item-container */}
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
                            <div className='text-md'><b>UCHIHA ITACHI</b></div>
                            <div className='text-sm text-gray-500'>email</div>
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

                    {/*set thoi gian  */}
                    <div className='absolute bottom-0 text-gray-500 right-2'>time</div>
                </div>
            </li>
        </div>
      <p>
        {data.map(e => {
          if (e.id_card === idcard) {
            return <p key={e.contact_id}>{e.contact_id}</p>;
          }
          // Trả về null nếu không có điều kiện nào khớp
          return "Bạn chưa follow ai cả";
        })}
      </p>
    </div>

  );
};

export default Following;