import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./SocialMediaPage.css";
import Modal from 'react-modal';


const SocialMediaPage = () => {

  //show modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUpdateSuccess = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });
  //get thông tin trên localstorage
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const idcard = userData.data.id_card;

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/${idcard}`)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
      });
  }, []);
  const [instagram, setInstagram] = useState([""]);
  const [x, setX] = useState([""]);
  const updateData = async (id, e) => {
    e.preventDefault();
    try {
      const updatedDatas = new FormData();
      updatedDatas.append("_method", "PUT");
      updatedDatas.append("instagram", instagram);
      updatedDatas.append("x", x);

      for (const [key, value] of updatedDatas.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Gửi dữ liệu bằng updatedDatas
      const csrf = await http.get("/sanctum/csrf-cookie");
      // });
      const update = await http.post(
        `http://localhost:8000/api/user/${idcard}`,
        updatedDatas
      );
      const user = await http.get(
        `http://localhost:8000/api/user/${idcard}`
      );
      const current = localStorage.setItem("currentUser", JSON.stringify(user)); // update localstorage
      // console.log(response)
      if (update.status === 200) {
        console.log("Updated data Successful: ", update.data.id_card);
        handleUpdateSuccess();
      } else {
        console.error('Lỗi', update.status);
      }

    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => updateData(idcard, e)}>
        <ul className='box-border flex flex-col justify-center w-full h-full px-5 py-5'>
          <p className='mb-5 ml-2 text-2xl font-bold'>ソーシャルメディア</p>
          <li className='box-border flex items-center w-full p-1 m-1 border-b border-b-gray-500 border-b-solid'>
            <img className='w-8 mr-2' src='https://cdn-icons-png.flaticon.com/128/725/725372.png' alt='' />
            <input
              className='w-full h-12 p-1 text-base transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'
              // style={{
              //   backgroundImage: "url('https://cdn-icons-png.flaticon.com/128/725/725372.png')",
              //   backgroundSize: "30px", // Đặt kích thước ảnh
              //   backgroundPosition: "left center", // Đặt vị trí ảnh
              //   backgroundRepeat: "no-repeat", // Ngăn chặn lặp lại ảnh
              // }}
              type='text'
              id="instagram"
              name="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </li>
          <li className='box-border flex items-center w-full p-1 m-1 mb-64 border-b border-b-gray-500 border-b-solid'>
            <img className='w-8 mr-2' src='https://cdn-icons-png.flaticon.com/128/4406/4406253.png' alt='' />
            <input
              className='w-full h-12 p-1 text-base transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'
              // style={{
              //   backgroundImage: "url('https://cdn-icons-png.flaticon.com/128/4406/4406253.png')",
              //   backgroundSize: "30px", // Đặt kích thước ảnh
              //   backgroundPosition: "left center", // Đặt vị trí ảnh
              //   backgroundRepeat: "no-repeat", // Ngăn chặn lặp lại ảnh
              // }} 
              type='text'
              id="x" name="x"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
          </li>
          <button className='absolute flex items-center justify-center w-16 h-16 p-2 text-xl font-bold text-white bg-green-400 border-2 border-green-400 border-solid rounded-full cursor-pointer right-2 bottom-2 focus:shadow-md focus: shadow-green-400 hover:bg-green-300 active:shadow-green-400 hover:ring-2 hover:ring-green-400'
            type='submit'>編集</button>
        </ul>
      </form>
      <Modal
        isOpen={isModalOpen}
        contentLabel="Update Success Modal"
        className=" w-64 mx-auto my-5"
      >
        <div className=" bg-green-200 items-center justify-center rounded-lg p-4 mb-4 text-sm text-green-600" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-sm ml-1">Updated Successful</span>
          <div>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};


export default SocialMediaPage;
