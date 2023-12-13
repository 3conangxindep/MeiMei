// import React from 'react';
import { useParams } from 'react-router-dom';
import './MyHomePage.css';
import React, { useState, useEffect } from 'react';


const MyHomePage = () => {
    // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
    const user = JSON.parse(localStorage.getItem('currentUser')).data;
    const [data, setData] = useState([]);
    const [company, setCompany] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8000/api/user/${user.id_card}`)
            .then((response) => response.json())
            .then((apiData) => {
                setData(apiData);
                console.log(apiData.user_name)
            })
            .catch((error) => {
                console.error("Lỗi khi gửi yêu cầu:", error);
            });
    }, []);
    useEffect(() => {
        fetch(`http://localhost:8000/api/company/${user.id_card}`)
            .then((response) => response.json())
            .then((apiData) => {
                setCompany(apiData);
                console.log(apiData.com_name)
            })
            .catch((error) => {
                console.error("Lỗi khi gửi yêu cầu:", error);
            });
    }, []);
    
    // console.log(data.img_url)
    let placeHolderImg = "";
    const imgPath = `http://localhost:8000${data.img_url}`;
    // console.log(imgPath)
    if (data.user_name) {
        const nameSplit = data.user_name.split(" ");
        placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
    }
    return (
        // myhome-container
        <div className='max-w-sm mx-auto sm:max-w-2xl w-full h-4/6 relative box-border flex items-center justify-center my-3.5'>
            {/* myhomecard */}
            <div className='box-border relative flex items-center justify-center border-8 border-green-900 border-solid w-80 sm:w-full sm:h-full rounded-xl h-72'>
                {/* myhome-left */}
                <div className='box-border relative flex flex-col items-center float-left w-32 h-full bg-green-700 rounded-l sm:w-96 justify-evenly '>
                    <li className='flex items-center justify-center border-4 border-white border-solid rounded-full w-14 h-14 sm:w-32 sm:h-32'>
                        {/* thay doi anh account tai day */}
                        <img
                            className='object-cover w-12 h-12 bg-white rounded-full sm:w-24 sm:h-24'
                            src={
                                imgPath === "http://localhost:8000null"
                                    ? placeHolderImg
                                    : imgPath
                            }
                            alt='avatar' />
                    </li>
                    <li className='flex flex-col items-center justify-between w-full h-auto'>
                        {/* myhome-textname */}
                        <div className='flex items-center justify-center w-3/5 h-auto text-lg font-bold text-white border-b-2 border-white border-solid sm:border-b-4 sm:text-2xl'>
                            {data.user_name}
                        </div>
                        <div className='mt-2.5'>
                            <p className='text-sm font-bold text-white sm:text-xl'>{company.department}</p>
                            <p className='text-sm font-bold text-white sm:text-xl'>{company.position}</p>
                        </div>

                    </li>
                    <li className='flex flex-col items-center justify-center'>
                        <img
                            className='-rotate-90 w-14 h-14 sm:w-24 sm:h-24'
                            src='https://cdn-icons-png.flaticon.com/64/6357/6357872.png' alt=''
                        />
                    </li>
                </div>
                {/* myhome-right */}
                <div className='relative flex flex-col items-center justify-center w-full h-full pt-4 bg-white rounded-l-none rounded-r'>
                    <ul className='flex flex-col items-center justify-center w-9/12 h-full'>
                        {/* myhome-right-title */}

                        <div className='flex items-center justify-center w-full h-16 text-2xl font-bold border-2 border-solid sm:text-4xl sm:h-24 rounded-xl sm:mb-12' style={{ color: "#1E5145" }}>
                            {company.com_name}
                        </div>

                        {/* email */}
                        <li className='w-full pl-2.5'>
                            <div className='p-2.5 flex justify-start items-center text-sm sm:text-base'>
                                <img
                                    className='w-5 sm:w-6 mr-1.5'
                                    src='https://cdn-icons-png.flaticon.com/128/546/546394.png' alt='' />
                                    <p className='max-w-full break-words'>{data.email}</p>
                                {/* {data.email} */}
                            </div>
                        </li>
                        {/*website  */}
                        <li className='w-full pl-2.5'>
                            <div className='p-2.5 flex justify-start items-center text-sm sm:text-base'>
                                <img
                                    className='w-5 sm:w-6 mr-1.5'
                                    src='https://cdn-icons-png.flaticon.com/128/900/900782.png' alt='' />
                                <p className='max-w-full break-words'>{company.website}</p>
                            </div>
                        </li>
                        {/* tel */}
                        <li className='w-full pl-2.5'>
                            <div className='p-2.5 flex justify-start items-center text-sm sm:text-base'>
                                <img
                                    className='w-5 sm:w-6 mr-1.5'
                                    src='https://cdn-icons-png.flaticon.com/128/159/159832.png' alt='' />
                                {company.com_tel}
                            </div>
                        </li>
                        {/* address */}
                        <li className='w-full pl-2.5'>
                            <div className='p-2.5 flex justify-start items-center text-sm sm:text-base'>
                                <img
                                    className='w-5 sm:w-6 mr-1.5'
                                    src='https://cdn-icons-png.flaticon.com/128/927/927667.png' alt='' />
                                {company.com_address}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default MyHomePage;
