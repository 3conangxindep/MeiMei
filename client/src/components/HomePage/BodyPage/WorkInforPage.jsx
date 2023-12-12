import React, { useState } from 'react';

const WorkInforPage = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [emails, setEmails] = useState([""]);
  const [faxes, setFaxes] = useState([""]);

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
    <div>
      <ul className='relative flex flex-col items-start justify-center w-full h-auto px-5 py-5 text-base box-border'>
        <p className='ml-2 text-2xl font-bold'>勤務情報</p>
        <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid box-border'>
          {/* <label htmlFor="kanjiName">会社名（漢字）</label> */}
          <input
            className='w-full h-12 p-1 text-base transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'                
            placeholder='会社名（漢字）'
            type="text" 
            id="kanjiName" 
            name="kanjiName"
          />
        </li>
        <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid box-border'>          
        {/* <label htmlFor="katakanaName">会社名（フリガナ）</label> */}
          <input
            className='w-full h-12 p-1 text-base transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'
            placeholder='ウェブサイト' 
            type="text" 
            id="website" 
            name="website"
          />
        </li>
        <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid box-border'>          
        {/* <label htmlFor="position">役職</label> */}
          <input
            className='w-full h-12 p-1 text-base transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400' 
            placeholder='部署'
            type="text" 
            id="deployment" 
            name="deployment"
          />
        </li>
        <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid box-border'>          
        {/* <label htmlFor="position">役職</label> */}
          <input
            className='w-full h-12 p-1 text-base transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400' 
            placeholder='役職'
            type="text" 
            id="position" 
            name="position"
          />
        </li>
        <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid box-border'>
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
        <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid box-border'>
          {/* <label htmlFor="tel">電話番号</label> */}
          <input
            className='w-full h-12 p-1 text-xl transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'                  
            placeholder='E-MAIL'
            type="mail"
            id="mail"
            name="mail"
            // value="tel"
            onChange={(e) => setPhoneNumbers(e.target.value)}
          />
          {/* <button onClick={() => handleAddRemoveInput('phone', index, 'remove')}>-</button>
          {phoneNumbers.length - 1 === index && <button onClick={() => handleAddRemoveInput('phone', index, 'add')}>+</button>} */}
        </li>
        <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid box-border'>
          {/* <label htmlFor="tel">電話番号</label> */}
          <input
            className='w-full h-12 p-1 text-xl transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'                  
            placeholder='FAX'
            type="fax"
            id="fax"
            name="fax"
            // value="tel"
            onChange={(e) => setPhoneNumbers(e.target.value)}
          />
          {/* <button onClick={() => handleAddRemoveInput('phone', index, 'remove')}>-</button>
          {phoneNumbers.length - 1 === index && <button onClick={() => handleAddRemoveInput('phone', index, 'add')}>+</button>} */}
        </li>
        <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid box-border'>          {/* <label htmlFor="postalCode">郵便番号</label> */}
          <input
            className='w-full h-12 p-1 text-xl transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'               
            placeholder='郵便番号' 
            type="text" 
            id="postalCode" 
            name="postalCode"
          />
        </li>
        <li className='w-full h-full p-1 m-1 mb-16 border-b border-b-gray-500 border-b-solid box-border'>          
          {/* <label htmlFor="currentAddress">現在所</label> */}
          <input
            className='w-full h-12 p-1 text-xl transition bg-gray-100 border-none rounded-md duration-200s focus:border focus:border-solid focus:border-green-300 focus:outline-0 focus:shadow-md focus:shadow-green-300 hover:bg-green-100 hover:ring-2 hover:ring-green-400'                
            placeholder='現在所' 
            type="text" 
            id="currentAddress" 
            name="currentAddress"
          />
        </li>
        <button className='absolute flex items-center justify-center w-16 h-16 p-2 text-xl font-bold text-white bg-green-400 border-2 border-green-400 border-solid rounded-full cursor-pointer right-2 bottom-2 focus:shadow-md focus: shadow-green-400 hover:bg-green-300 active:shadow-green-400 hover:ring-2 hover:ring-green-400' 
                id='btt' type='submit'
        >編集</button>
      </ul>
    </div>
  );
};

export default WorkInforPage;
