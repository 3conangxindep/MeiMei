import React, { useState, useEffect } from 'react';
const Following = () => {
  const id = 222222;
  // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const username = userData.data;
  const idcard = username.id_card;
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/contact/`)
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

  return (
    <div>
      following
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