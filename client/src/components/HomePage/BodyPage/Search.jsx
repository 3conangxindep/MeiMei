import React, { useState } from 'react';
import './Search.css';

<<<<<<< HEAD
const Search = () => {
    // Dữ liệu ví dụ
    const initialData = [
        { id: 1, name: 'huyen trang', email: 'huyentrang@example.com' },
        { id: 2, name: 'trang kieu', email: 'trangkieu@example.com' },
        { id: 3, name: 'nhi', email: 'nhi@example.com' },
        { id: 4, name: 'yen nhi', email: 'yennhi@example.com' },
        { id: 5, name: 'trang nhi', email: 'trangnhi@example.com' },
    ];

    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        const filteredData = initialData.filter(
            item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setData(filteredData);
=======
const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        // Lưu searchTerm vào localStorage
        localStorage.setItem('searchTerm', searchTerm);
        // const search = localStorage.getItem('searchTerm');
        // console.log(search)
        // window.location.reload();
        onSearch(searchTerm);
>>>>>>> 5644c4466969afe0214d8f60170aaaca6c6f4e04
    };

    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };

    return (
<<<<<<< HEAD
        <div className="box-border relative flex w-2/4 h-full SearchContainer">
=======
        <div className="box-border relative flex w-9/12 h-full bg-[#ECFF8C] bg-opacity-[65%] border border-[#ECFF8C] rounded-2xl hover:border hover:border-green-300 focus:border-green-300 focus:border hover:shadow-md hover:shadow-green-300">
>>>>>>> 5644c4466969afe0214d8f60170aaaca6c6f4e04
            <div className='float-left w-full'>
                <input
                    className='w-full p-1.5 text-sm text-[#002629] placeholder-[#002629] font-bold rounded-xl bg-transparent focus:outline-none'
                    type="text"
                    placeholder="検索"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
            <div className='absolute right-0 flex items-center justify-center w-8 h-8 transition duration-150 ease-in-out border border-[#ECFF8C] rounded-full bg-[#36735B] hover:bg-opacity-70 hover:border-green-300 hover:shadow-md hover:shadow-green-300'>
                <button
                    onClick={handleSearch}
                >
                    <img
                        className='w-5 object-over'
                        src='https://cdn-icons-png.flaticon.com/128/711/711319.png' alt=''
                    />
                </button>
            </div>
        </div>
    );
};

export default Search;