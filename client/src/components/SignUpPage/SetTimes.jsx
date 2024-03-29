import React, { useState } from 'react';
import './SetTimes.css';

const SetTimes = ({ setCurrentMonth, setCurrentDay, setCurrentYear }) => {
  const [currentMonth, setCurrentMonthLocal] = useState(new Date().getMonth() + 1);
  const [currentDay, setCurrentDayLocal] = useState(new Date().getDate());
  const [currentYear, setCurrentYearLocal] = useState(new Date().getFullYear());

  const months = Array.from({ length: 12 }, (_, index) => `${index + 1} 月`);
  const days = Array.from({ length: 31 }, (_, index) => `${index + 1} 日`);
  const years = Array.from({ length: 61 }, (_, index) => `${1970 + index} 年`);

  const handleDateChange = () => {
    if (currentMonth && currentDay && currentYear) {
      setCurrentMonth(parseInt(currentMonth));
      setCurrentDay(parseInt(currentDay));
      setCurrentYear(parseInt(currentYear));
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <label className='font-bold text-green-500 text-sm p-1.5'>生年月日</label>
      <div className='grid w-full h-full grid-cols-3 gap-2'>
        <select className="h-10 col-span-1 rounded-lg content" 
          value={currentYear} 
          onChange={(e) => setCurrentYearLocal(e.target.value)}
        >
          {years.map((year, index) => (
            <option key={index} value={1970 + index}>{year}</option>
          ))}
        </select>       
        <select className="h-10 col-span-1 rounded-lg content"             
          value={currentMonth} 
          onChange={(e) => setCurrentMonthLocal(e.target.value)}
          >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>       
        <select className="h-10 col-span-1 rounded-lg content" 
          value={currentDay} 
          onChange={(e) => setCurrentDayLocal(e.target.value)}
          >
          {days.map((day, index) => (
            <option key={index} value={index + 1}>{day}</option>
          ))}
        </select>
        {handleDateChange()}
      </div>
    </div>
  );
};

export default SetTimes;
