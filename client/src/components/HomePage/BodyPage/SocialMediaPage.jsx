import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./SocialMediaPage.css";

const SocialMediaPage = () => {
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
      } else {
        console.error('Lỗi', update.status);
      }

    } catch (error) {
      console.error("Lỗi:", error);
    }
  };



  return (
    <div className='SocialMedia-container'>
      <form onSubmit={(e) => updateData(idcard, e)}>
        <ul>ソーシャルメディア
          <li>
            <img style={{ width: "20px" }} src='https://cdn-icons-png.flaticon.com/128/725/725372.png' alt='' />
            <input type='text' id="instagram" name="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
          </li>
          <li>
            <img style={{ width: "20px" }} src='https://cdn-icons-png.flaticon.com/128/4406/4406253.png' alt='' />
            <input type='text' id="x" name="x" value={x} onChange={(e) => setX(e.target.value)} />
          </li>
          <button type='submit'>編集</button>
        </ul>
      </form>
    </div>
  );
};


export default SocialMediaPage;
