import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProfilePage = () => {
  const history = useHistory()

  //get thông tin trên localstorage
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const idcard = userData.data.id_card;

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://172.20.10.4/api/user/${idcard}`)
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
  const [emails, setEmails] = useState([""]);
  const [furigana, setFurigana] = useState([""]);
  const [birthDay, setBirthDay] = useState([""]);
  const [post_code, setPostcode] = useState([""]);
  const [address, setAddress] = useState([""]);
  const [gender, setGender] = useState([""]);
  const [img_url, setImgUrl] = useState(undefined);
  const [faxes, setFaxes] = useState([]);
  const http = axios.create({
    baseURL: "http://172.20.10.4:8000",
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

      //Đối với danh sách dữ liệu như số điện thoại và email, bạn cần lặp qua mảng và append từng phần tử.
      // phoneNumbers.forEach((phoneNumber, index) => {
      //   updatedDatas.append(`tel[${index}]`, phoneNumber);
      // });

      // emails.forEach((email) => {
      //   updatedDatas.append(`email`, email);
      // });
      //show value updataDatas
      for (const [key, value] of updatedDatas.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Gửi dữ liệu bằng updatedDatas
      const csrf = await http.get("/sanctum/csrf-cookie");
      // const response = await http.put(`http://localhost:8000/api/user/${id}`, 
      //   updatedDatas, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
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
      } else {
        console.error('Lỗi', update.status);
      }

      // Chuyển hướng về trang chủ sau khi cập nhật thành công
      history.push('/');
      // Làm mới trang để hiển thị dữ liệu mới
      window.location.reload();

    } catch (error) {
      console.error("Lỗi:", error);
    }
  };



  const handleAddRemoveInput = (type, index, action) => {
    if (action === 'add') {
      if (type === 'phone') {
        setPhoneNumbers([...phoneNumbers,]);
      } else if (type === 'email') {
        setEmails([...emails,]);
      } else if (type === 'fax') {
        setFaxes([...faxes, ""]);
      }
    } else if (action === 'remove') {
      if (type === 'phone') {
        const updatedPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
        setPhoneNumbers(updatedPhoneNumbers);
      } else if (type === 'email') {
        const updatedEmails = emails.filter((_, i) => i !== index);
        setEmails(updatedEmails);
      } else if (type === 'fax') {
        const updatedFaxes = faxes.filter((_, i) => i !== index);
        setFaxes(updatedFaxes);
      }
    }
  };

  const handleInputChange = (event, type, index) => {
    const value = event.target.value;
    const updatedData =
      type === 'tel' ? [...phoneNumbers] :
        type === 'email' ? [...emails] :
          type === 'fax' ? [...faxes] : [];

    updatedData[index] = value;

    if (type === 'tel') {
      setPhoneNumbers(updatedData);
    } else if (type === 'email') {
      setEmails(updatedData);
    } else if (type === 'fax') {
      setFaxes(updatedData);
    }
  };
  return (
    <form onSubmit={(e) => Updatedata(idcard, e)}>
      <meta name="csrf-token" content="YOUR_CSRF_TOKEN_HERE"></meta>
      <ul className='manageAccount-section-title'>個人情報
        <li className='manageAccount-section-text-item' OnClose={() => setImgUrl(false)}>
          <label htmlFor="file-input" className="file-label">プロフィール写真</label>
          <input type="file" id="image" name='image' onChange={handleFileChange} />
        </li>
        <li className='manageAccount-section-text-item'>
          <label htmlFor="kanjiName">氏名（漢字）</label>
          <input type="text" id="kanjiName" name="kanjiName" value={kanjiName} onChange={(e) => setKanjiNames(e.target.value)} />
        </li>
        <li className='manageAccount-section-text-item'>
          <label htmlFor="katakanaName">氏名（フリガナ）</label>
          <input type="text" id="katakanaName" name="katakanaName" value={furigana} onChange={(e) => setFurigana(e.target.value)} />
        </li>
        <li className='manageAccount-section-text-item'>
          <label htmlFor="birthdate">生年月日</label>
          <input type="date" id="birthdate" name="birthdate" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} />
        </li>
        <li className='manageAccount-section-text-item'>
          <label htmlFor="gender">性別</label><br />
          <input type="radio" id="gender" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
          <label htmlFor="gender">男性</label>
          <input type="radio" id="gender" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
          <label htmlFor="gender">女性</label><br />
          {/* <input type="text" id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} /> */}
        </li>
        {phoneNumbers.map((phoneNumber, index) => (
          <li key={index} className='manageAccount-section-text-item'>
            <label htmlFor={`phone-${index}`}>電話番号</label>
            <input
              type="tel"
              id={`phone-${index}`}
              name={`phone-${index}`}
              value={phoneNumbers}
              onChange={(e) => handleInputChange(e, 'tel', index)}
            />
            <button onClick={() => handleAddRemoveInput('phone', index, 'remove')}>-</button>
            {phoneNumbers.length - 1 === index && <button onClick={() => handleAddRemoveInput('phone', index, 'add')}>+</button>}
          </li>
        ))}
        {/* {emails.map((email, index) => (
          <li key={index} className='manageAccount-section-text-item'>
            <label htmlFor={`email-${index}`}>E-MAIL</label>
            <input
              type="email"
              id={`email-${index}`}
              name={`email-${index}`}
              value={emails}
              onChange={(e) => handleInputChange(e, 'email', index)}
            />
            <button onClick={() => handleAddRemoveInput('email', index, 'remove')}>-</button>
            {emails.length - 1 === index && <button onClick={() => handleAddRemoveInput('email', index, 'add')}>+</button>}
          </li>
        ))} */}
        {/* {faxes.map((fax, index) => (
          <li key={index} className='manageAccount-section-text-item'>
            <label htmlFor={`fax-${index}`}>FAX</label>
            <input
              type="text"
              id={`fax-${index}`}
              name={`fax-${index}`}
              value={data.fax}
              onChange={(e) => handleInputChange(e, 'fax', index)}
            />
            <button onClick={() => handleAddRemoveInput('fax', index, 'remove')}>-</button>
            {faxes.length - 1 === index && <button onClick={() => handleAddRemoveInput('fax', index, 'add')}>+</button>}
          </li>
        ))} */}
        <li className='manageAccount-section-text-item'>
          <label htmlFor="postalCode">郵便番号</label>
          <input type="text" id="postalCode" name="postalCode" value={post_code} onChange={(e) => setPostcode(e.target.value)} />
        </li>
        <li className='manageAccount-section-text-item'>
          <label htmlFor="currentAddress">現在所</label>
          <input type="text" id="currentAddress" name="currentAddress" value={address} onChange={(e) => setAddress(e.target.value)} />
        </li>
        {/* <li className='manageAccount-section-text-item'>
                <label htmlFor="currentAddressKana">現在所（フリガナ）</label>
                <input type="text" id="currentAddressKana" name="currentAddressKana" />
            </li> */}

      </ul>
      <button id='btt' type='submit'> change information</button>
    </form>
  );

};

export default ProfilePage;