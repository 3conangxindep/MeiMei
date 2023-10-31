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
      <ul>勤務情報
        <li className='manageAccount-section-text-item'>
          <label htmlFor="kanjiName">会社名（漢字）</label>
          <input type="text" id="kanjiName" name="kanjiName" />
        </li>
        <li className='manageAccount-section-text-item'>
          <label htmlFor="katakanaName">会社名（フリガナ）</label>
          <input type="text" id="katakanaName" name="katakanaName" />
        </li>
        <li className='manageAccount-section-text-item'>
          <label htmlFor="position">役職</label>
          <input type="text" id="position" name="position" />
        </li>
        {phoneNumbers.map((phoneNumber, index) => (
          <li key={index} className='manageAccount-section-text-item'>
            <label htmlFor={`phone-${index}`}>電話番号</label>
            <input
              type="text"
              id={`phone-${index}`}
              name={`phone-${index}`}
              value={phoneNumber}
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
              value={email}
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
              value={fax}
              onChange={(e) => handleInputChange(e, 'fax', index)}
            />
            <button onClick={() => handleAddRemoveInput('fax', index, 'remove')}>-</button>
            {faxes.length - 1 === index && <button onClick={() => handleAddRemoveInput('fax', index, 'add')}>+</button>}
          </li>
        ))}
        <li className='manageAccount-section-text-item'>
          <label htmlFor="postalCode">郵便番号</label>
          <input type="text" id="postalCode" name="postalCode" />
        </li>
        <li className='manageAccount-section-text-item'>
          <label htmlFor="currentAddress">現在所</label>
          <input type="text" id="currentAddress" name="currentAddress" />
        </li>
        <li className='manageAccount-section-text-item'>
          <label htmlFor="currentAddressKana">現在所（フリガナ）</label>
          <input type="text" id="currentAddressKana" name="currentAddressKana" />
        </li>
      </ul>
    </div>
  );
};

export default WorkInforPage;
