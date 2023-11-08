import React , { useState,useEffect }from 'react';
import axios from "axios";

const ProfilePage = () => {

  //đổi thông tin trên localstorage
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const idcard=userData.data.id_card;
  const [data, setData] = useState([]);

  useEffect(() => {
      fetch(`http://127.0.0.1:8000/api/user/${idcard}`)
      .then((response) => response.json())
      .then((apiData) => {
          setData(apiData);
          console.log(apiData.id_card)
      })
      .catch((error) => {
          console.error("Lỗi khi gửi yêu cầu:", error);
      });
  }, []);

  const newname=data.user_name;
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [kanjiName, setKanjiNames] = useState([""]);
  const [emails, setEmails] = useState([""]);
  const [faxes, setFaxes] = useState([""]);

  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });
   //call method updatedata de cap nhat du lieu tren api
   const Updatedata = async (id, e) => {
     e.preventDefault();
    try {
      const updatedDatas = new FormData();
      updatedDatas.append("user_name", kanjiName);
      //show value updataDatas
      for (const [key, value] of updatedDatas.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Gửi dữ liệu bằng updatedDatas
      const csrf = await http.get("/sanctum/csrf-cookie");
      const response=await http.put(`http://localhost:8000/api/user/${id}`,updatedDatas,{
         headers: {
        'Content-Type': 'application/json',
      },
      });
      if (response.status === 200) {
        console.log("Cập nhật dữ liệu thành công: ", response.data.id_card);
      } else {
        console.error('Lỗi', response.status);
      }
  
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  

  const handleAddRemoveInput = (type, index, action) => {
    if (action === 'add') {
      if (type === 'phone') {
        setPhoneNumbers([...phoneNumbers, ""]);
      } else if (type === 'email') {
        setEmails([...emails, ""]);
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
      type === 'phone' ? [...phoneNumbers] :
      type === 'email' ? [...emails] :
      type === 'fax' ? [...faxes] : [];

    updatedData[index] = value;

    if (type === 'phone') {
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
            <li className='manageAccount-section-text-item'>
                <label htmlFor="file-input" className="file-label">プロフィール写真</label>
                <div><input type="file" id="file-input" accept="image/*" onchange="loadProfilePicture(event)" /></div>
            </li>
            <li className='manageAccount-section-text-item'>
                <label htmlFor="kanjiName">氏名（漢字）</label>
                <input type="text" id="kanjiName" name="kanjiName" value={kanjiName} onChange={(e) => setKanjiNames(e.target.value)}  />
            </li>
            <li className='manageAccount-section-text-item'>
                <label htmlFor="katakanaName">氏名（フリガナ）</label>
                <input type="text" id="katakanaName" name="katakanaName" value={data.furigana} />
            </li>
            <li className='manageAccount-section-text-item'>
                <label htmlFor="birthdate">生年月日</label>
                <input type="date" id="birthdate" name="birthdate" value={data.birthday}/>
            </li>
            <li className='manageAccount-section-text-item'>
                <label htmlFor="gender">性別</label>
                <input type="text" id="gender" name="gender" value={data.gender}/>
            </li>
            {phoneNumbers.map((phoneNumber, index) => (
          <li key={index} className='manageAccount-section-text-item'>
            <label htmlFor={`phone-${index}`}>電話番号</label>
            <input
              type="text"
              id={`phone-${index}`}
              name={`phone-${index}`}
              // value={phoneNumber}
              value={data.tel}
              onChange={(e) => handleInputChange(e, 'phone', index)}
            />
            <button onClick={() => handleAddRemoveInput('phone', index, 'remove')}>-</button>
            {phoneNumbers.length - 1 === index && <button onClick={() => handleAddRemoveInput('phone', index, 'add')}>+</button>}
          </li>
        ))}
        {emails.map((email, index) => (
          <li key={index} className='manageAccount-section-text-item'>
            <label htmlFor={`email-${index}`}>E-MAIL</label>
            <input
              type="email"
              id={`email-${index}`}
              name={`email-${index}`}
              value={data.email}
              onChange={(e) => handleInputChange(e, 'email', index)}
            />
            <button onClick={() => handleAddRemoveInput('email', index, 'remove')}>-</button>
            {emails.length - 1 === index && <button onClick={() => handleAddRemoveInput('email', index, 'add')}>+</button>}
          </li>
        ))}
        {faxes.map((fax, index) => (
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
        ))}
                <li className='manageAccount-section-text-item'>
                <label htmlFor="postalCode">郵便番号</label>
            <input type="text" id="postalCode" name="postalCode" value={data.post_code} />
            </li>
            <li className='manageAccount-section-text-item'>
                <label htmlFor="currentAddress">現在所</label>
                <input type="text" id="currentAddress" name="currentAddress" value={data.address} />
            </li>
            <li className='manageAccount-section-text-item'>
                <label htmlFor="currentAddressKana">現在所（フリガナ）</label>
                <input type="text" id="currentAddressKana" name="currentAddressKana" />
            </li>

        </ul>
        <button id='btt' type='submit'> change information</button>
      </form>
    );
    
};

export default ProfilePage;