import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        // Lưu searchTerm vào localStorage
        localStorage.setItem('searchTerm', searchTerm);
        // const search = localStorage.getItem('searchTerm');
        // console.log(search)
        // window.location.reload();
        onSearch(searchTerm);
    };

    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="box-border relative flex w-2/4 h-full SearchContainer">
            <div className='float-left w-full'>
                <input
                    className='FormInput w-full p-1.5 text-sm text-white placeholder-white'
                    type="text"
                    placeholder="検索"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
            <div className='absolute right-0 w-12 h-12 rounded-full'>
                <button
                    className='flex items-center justify-center w-full p-2 placeholder-white transition duration-150 ease-in-out border border-gray-300 bg-clip-padding-box rounded-r-md FormInput hover:outline-none hover:box-shadow-outline-blue focus:border-blue-300 focus:outline-none focus:box-shadow-outline-blue'
                    onClick={handleSearch}
                >
                    <img
                        className='w-auto'
                        src='https://cdn-icons-png.flaticon.com/128/711/711319.png' alt=''
                    />
                </button>
            </div>
        </div>
    );
};

export default Search;