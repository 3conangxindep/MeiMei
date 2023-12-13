import { useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect, } from 'react';
import axios from "axios";
import API_BASE_URL from '../../../apiConfig';

const InformationPage = () => {
    const { id_card, contact_id } = useParams();
    // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
    const user = JSON.parse(localStorage.getItem('currentUser')).data;
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const http = axios.create({
                    baseURL: `http://${API_BASE_URL}:8000`,
                    headers: {
                        "X-Requested-with": "XMLHttpRequest",
                    },
                    withCredentials: true,
                });

                // Ensure CSRF cookie is set
                await http.get("/sanctum/csrf-cookie");

                // Update the contact table if id_card and contact_id are different
                if (id_card !== contact_id) {
                    await http.put(`/api/contact/${id_card}/${contact_id}`);
                }

                // Fetch user data
                const response = await http.get(`/api/user/${contact_id}`);
                setData(response.data);
                console.log(response.data.user_name);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
        
    }, [id_card, contact_id]);
    let placeHolderImg = "";
    const imgPath = `http://localhost:8000${data.img_url}`;
    // console.log(imgPath)
    if (data.user_name) {
        const nameSplit = data.user_name.split(" ");
        placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
    }

    return (
        <div className='w-full h-full mt-5 bg-white border-box'>
            <div className='flex flex-col items-start justify-center py-6 pl-14'>
                {/* account image and name */}
                <div className='flex items-center'>
                    <div className='flex items-center justify-center w-20 h-20 mr-10 border border-gray-300 border-solid rounded-full'>
                       {/* account image */}
                        <img
                            className='object-cover w-4/5 rounded-full h-4/5' 
                            src={
                                imgPath === `http://${API_BASE_URL}:8000null`
                                    ? placeHolderImg
                                    : imgPath
                            }
                            alt='avatar' />
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                        {/* フリガナ */}
                        <p className='text-base text-gray-400'>{data.furigana}</p>
                        {/* 名前 */}
                        <div className='flex items-center justify-center'>
                            <p className='mr-2 text-xl font-bold'>{data.user_name}</p>
                            {/* icon for gender */}
                            <img

                                className='w-3 h-3'
                                // male
                                src= {
                                    data.gender === 'mail'
                                    ? 'https://cdn-icons-png.flaticon.com/128/1340/1340619.png'
                                // female
                                    : data.gender === 'female'
                                    ? 'https://cdn-icons-png.flaticon.com/128/866/866954.png'
                                // other
                                    : 'https://cdn-icons-png.flaticon.com/128/45/45799.png'
                                }
                                alt=''
                            />
                        </div>
                        {/* birthday */}
                        <p className='text-sm text-gray-400'>{data.birthday}</p>
                    </div>
                </div>
                <ul className='mt-4'>
                    <li className='py-1 text-base text-gray-400'>メールアドレス: {data.email}</li>
                    <li className='py-1 text-base text-gray-400'>電話番号: {data.tel}</li>
                    <li className='py-1 text-base text-gray-400'>住所: {data.address}</li>
                    <li className='py-1 text-base text-gray-400'>Instagram: {data.instagram}</li>
                    <li className='py-1 text-base text-gray-400'>X(Twitter): {data.x}</li>
                </ul>
            </div>

            {/* company */}
            <div className='w-full p-10 bg-green-300 rounded-t-3xl'>
                {/* company */}
                <div className='relative w-full h-full'>
                    <p className='text-2xl font-bold text-orange-400'>勤務先</p>
                    <ul>
                        <div className='absolute w-full border-l bottom-4 h-3/4 border-l-gray-500 z-999 left-4 border-l-solid'></div>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div> ECCコンピューター専門学校</li>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div>住所</li>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div>電話番号</li>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div>FAX</li>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div>Website</li>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div>
                            <span>
                                部署
                            </span>
                            <span className='px-2'> - </span>
                            <span>役職</span>
                        </li>
                    </ul>
                </div>
                
                {/* about me */}
                <div className='w-full h-full'>
                    <p className='text-xl font-bold text-orange-400'>私について</p>
                    <ul>
                        <li>hi</li>
                        <li>hi</li>
                        <li>hi</li>
                        <li>hi</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default InformationPage;