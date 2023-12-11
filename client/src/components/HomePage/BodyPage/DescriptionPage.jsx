import React, { useState, useEffect } from 'react';
import axios from "axios";


const DescriptionPage = () => {
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

  const [description, setDescription] = useState([""]);
  const updateData = async (id, e) => {
    e.preventDefault();
    try {
      const updatedDatas = new FormData();
      updatedDatas.append("_method", "PUT");
      updatedDatas.append("description", description);

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
    <div>
      <form onSubmit={(e) => updateData(idcard, e)}>
      <div>私について</div>
      <div>
        <textarea rows="7" cols="30" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type='submit'>編集</button>
      </form>
    </div>
  );
};

export default DescriptionPage;
