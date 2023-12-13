import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Modal from 'react-modal';


const ProfilePage = () => {

  //show modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUpdateSuccess = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const history = useHistory()

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
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [kanjiName, setKanjiNames] = useState();
  const [furigana, setFurigana] = useState([""]);
  const [birthDay, setBirthDay] = useState([""]);
  const [post_code, setPostcode] = useState([""]);
  const [address, setAddress] = useState([""]);
  const [gender, setGender] = useState([""]);
  const [img_url, setImgUrl] = useState(undefined);
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });
  //method get path_img
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgUrl(file);
  };

  //call method updatedata de cap nhat du lieu tren api
  const Updatedata = async (id, e) => {
    e.preventDefault();
    try {
      const updatedDatas = new FormData();
      updatedDatas.append("_method", "PUT");
      updatedDatas.append("user_name", kanjiName);
      updatedDatas.append("furigana", furigana);
      updatedDatas.append("birthday", birthDay);
      updatedDatas.append("gender", gender);
      updatedDatas.append("tel", phoneNumbers);
      updatedDatas.append("post_code", post_code);
      updatedDatas.append("address", address);
      updatedDatas.append("image", img_url);

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
      setImgUrl(undefined)
      // console.log(response)
      if (update.status === 200) {
        console.log("Updated data Successful: ", update.data.id_card);
        handleUpdateSuccess();
      } else {
        console.error('Lỗi', update.status);
      }

      // Chuyển hướng về trang chủ sau khi cập nhật thành công
      // history.push('/');
      // Làm mới trang để hiển thị dữ liệu mới
      // window.location.reload();

    } catch (error) {
      console.error("Lỗi:", error);
    }
  };


  //   }
  // };
  return (
    <div>
      <form onSubmit={(e) => Updatedata(idcard, e)}>
        <meta name="csrf-token" content="YOUR_CSRF_TOKEN_HERE"></meta>
        <ul className='relative flex flex-col items-start justify-center w-full h-auto px-5 py-5 text-base border-box'>
          <p className='ml-2 text-2xl font-bold'>個人情報</p>
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box' onClose={() => setImgUrl(false)}>
            <label htmlFor="file-input" className="text-base">プロフィール写真</label>
            <input
              className='w-full h-12 p-1 text-base transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'
              type="file"
              id="image"
              name='image'
              onChange={handleFileChange}
            />
          </li>
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="kanjiName">氏名（漢字）</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'
              placeholder='氏名（漢字）'
              type="text"
              id="kanjiName"
              name="kanjiName"
              value={kanjiName}
              onChange={(e) => setKanjiNames(e.target.value)}
            />
          </li>
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="katakanaName">氏名（フリガナ）</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'
              placeholder='氏名（フリガナ）'
              type="text"
              id="katakanaName"
              name="katakanaName"
              value={furigana}
              onChange={(e) => setFurigana(e.target.value)}
            />
          </li>
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="birthdate">生年月日</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'
              placeholder='生年月日'
              type="date"
              id="birthdate"
              name="birthdate"
              value={birthDay} onChange={(e) => setBirthDay(e.target.value)}
            />
          </li>
          <li className='flex items-center justify-between w-full p-1 m-1 border-b h-14 border-b-gray-500 border-b-solid border-box'>
            <label htmlFor="gender">性別</label><br />
            <input
              className='inline-block w-5 h-5 align-middle border border-gray-300 rounded-full appearance-none cursor-pointer checked:bg-green-300 checked:border-green-400 checked:shadow-md checked:shadow-green-300 hover:ring-2 hover:bg-green-300 hover:ring-green-400 checked:ring-2 checked:hover:ring-green-400 hover:shadow-md hover:shadow-green-300'
              type="radio"
              id="gender"
              name="gender"
              value="male"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="gender">男性</label>
            <input
              className='inline-block w-5 h-5 align-middle border border-gray-300 rounded-full appearance-none cursor-pointer checked:bg-green-300 checked:border-green-400 checked:shadow-md checked:shadow-green-300 hover:ring-2 hover:bg-green-300 hover:ring-green-400 checked:ring-2 checked:hover:ring-green-400 hover:shadow-md hover:shadow-green-300'
              type="radio"
              id="gender"
              name="gender"
              value="female"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="gender">女性</label><br />
            <input
              className='inline-block w-5 h-5 align-middle border border-gray-300 rounded-full appearance-none cursor-pointer checked:bg-green-300 checked:border-green-400 checked:shadow-md checked:shadow-green-300 hover:ring-2 hover:bg-green-300 hover:ring-green-400 checked:ring-2 checked:hover:ring-green-400 hover:shadow-md hover:shadow-green-300'
              type="radio"
              id="gender"
              name="gender"
              value="other"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="gender">その他</label><br />
            {/* <input type="text" id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} /> */}
          </li>
          {/* {phoneNumbers.map((phoneNumber, index) => ( */}
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="tel">電話番号</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'
              placeholder='電話番号'
              type="tel"
              id="tel"
              name="tel"
              // value="tel"
              onChange={(e) => setPhoneNumbers(e.target.value)}
            />
            {/* <button onClick={() => handleAddRemoveInput('phone', index, 'remove')}>-</button>
                {phoneNumbers.length - 1 === index && <button onClick={() => handleAddRemoveInput('phone', index, 'add')}>+</button>} */}
          </li>
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="post_code">郵便番号</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'
              placeholder='郵便番号'
              type="text"
              id="post_code"
              name="post_code"
              value={post_code}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </li>
          <li className='w-full h-full p-1 m-1 mb-16 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="address">現在所</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'
              placeholder='現在所'
              type="text"
              id="address"
              name="address"
              value={address} onChange={(e) => setAddress(e.target.value)}
            />
          </li>
          <button className='absolute flex items-center justify-center w-16 h-16 p-2 text-xl font-bold text-white bg-green-400 border-2 border-green-400 border-solid rounded-full cursor-pointer right-2 bottom-2 focus:shadow-md focus: shadow-green-400 hover:bg-green-300 active:shadow-green-400 hover:ring-2 hover:ring-green-400'
            id='btt' type='submit'
          >編集</button>
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

export default ProfilePage;