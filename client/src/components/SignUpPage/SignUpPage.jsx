import React, { useState } from 'react';
import SetTimes from './SetTimes';
import GenderTheme from './GenderTheme';
import './SignUpPage.css';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import bcrypt from 'bcryptjs';
import API_BASE_URL from '../../apiConfig';

const img = 'meimei_img.png';
const SignUpPage = () => {
    const http = axios.create({
        baseURL: `http://${API_BASE_URL}:8000`,

        headers: {
            "X-Requested-with": "XMLHttpRequest",
        },
        withCredentials: true,
    });

    const [user, setUser] = useState(
        localStorage.hasOwnProperty("currentUser") === true
            ? JSON.parse(localStorage.getItem("currentUser"))
            : null
    );
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [idCard, setIdCard] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [idErrorMessage, setIdErrorMessage] = useState('');
    const [genderErrorMessage, setGenderErrorMessage] = useState('');
    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            setIdErrorMessage("");
            setErrorMessage("");
            setGenderErrorMessage("");
            setLoading(true);
            //kiem tra id co phai la so khong
            if (!/^[1-9]\d*$/.test(idCard)) {
                setIdErrorMessage("IDカードは0で始まることか数字ではないことか登録できません");
                return;
            }
    
            // Kiểm tra xem gender có được chọn hay không
            if (!gender) {
                setGenderErrorMessage("性別を選択してください");
                return;
            }
            const formData = new FormData();
            formData.append("id_card", idCard);
            formData.append("user_name", userName);
            formData.append("birthday", birthYear + "-" + birthMonth + "-" + birthDay);
            formData.append("gender", gender);
            formData.append("email", email);
            formData.append("password", await bcrypt.hash(password, 10));
            //formData.append("password", password);
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            const csrf = await http.get("/sanctum/csrf-cookie");
            const register = await http.post(
                `http://${API_BASE_URL}:8000/api/user`,
                formData
            );
            console.log("Registration successful:", register);
            // console.log(user.data.id_card);

            //login after register
            const login = await http.post("/api/login", {
                email: email,
                password: password,
            });
            const current = localStorage.setItem(
                "currentUser",
                JSON.stringify(login)
            );
            setUser(login);
            history.push(`/main/${idCard}`);
            console.log("dang nhap thanh cong")
        } catch (error) {
            setErrorMessage("IDカードかメールアドレスか既に登録しています");
            console.error("Register failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='box-border relative flex items-center justify-center w-full h-screen max-w-full px-2 py-5 bg-green-100'>
            <div className='box-border relative flex flex-col items-center justify-center w-full py-5 bg-green-300 sm:h-full rounded-xl'>
                <p className='absolute text-3xl font-bold text-white left-5 top-5'>MEiMEi</p>
                <div className='w-full h-52 sm:h-auto'></div>
                <img className='absolute sm:top-20 top-11 sm:left-1/2 -left-10 z-999 sm:w-1/2' src={img} alt='' />
                <div className='relative z-10 w-10/12 h-auto p-4 mb-12 bg-white border border-gray-300 border-solid shadow-md sm:w-1/3 rounded-2xl mt-30 shadow-gray-300 sm:inset--1/2'>
                    <h4 className='p-2 text-3xl font-bold text-center border-b border-gray-300 text-green-950 border-b-solid'>新規登録</h4>
                    <form onSubmit={handleSignup}>
                        <ul className='w-full h-full p-2 mt-3'>
                            <li className='FormGroup pt-2'>
                                <input
                                    type="text"
                                    maxLength={6}
                                    minLength={6}
                                    // style={{ width: '40%' }}
                                    className='FormInput'
                                    id='text'
                                    value={idCard}
                                    onChange={(e) => setIdCard(e.target.value)}
                                    // placeholder="123456"
                                    required
                                />
                                <label htmlFor="text" className='Label-sign p-1.5'>ID カード</label>
                            </li>
                            <li className='FormGroup pt-4'>
                                <input
                                    type="text"
                                    className='FormInput'
                                    id='name'
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    // placeholder="MeiMei"
                                    required
                                />
                                <label htmlFor="text" className='Label-sign p-1.5'>名前</label>
                            </li>
                            <li className='FormGroup pt-4'>
                                <input
                                    type="email"
                                    className='FormInput'
                                    id='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor='email' className='Label-sign p-1.5'>メールアドレス</label>
                            </li>
                            <li className='FormGroup pt-4'>
                                <input
                                    type="password"
                                    className='FormInput'
                                    id='pass'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="pass" className='Label-sign p-1.5'>パスワード</label>
                            </li>
                            <li className='settime'>
                                <SetTimes
                                    setCurrentYear={setBirthYear}
                                    setCurrentMonth={setBirthMonth}
                                    setCurrentDay={setBirthDay}
                                />
                            </li>
                            <li>
                                <GenderTheme setSelectedOption={setGender}></GenderTheme>
                            </li>

                            <button className='rounded-lg FormButton' type='submit'>新規登録</button>
                        </ul>
                    </form>
                    {errorMessage && <div className="ml-2 ErrorMessage">{errorMessage}</div>}
                    {idErrorMessage && <div className="ml-2 ErrorMessage">{idErrorMessage}</div>}
                    {genderErrorMessage && <div className="ml-2 ErrorMessage">{genderErrorMessage}</div>}
                    {loading && (
                        <div role="status" className="flex pt-4 ml-2">
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                            <p>Loading...</p>
                        </div>
                    )}
                </div>
                <p className='absolute flex items-center justify-center w-16 h-12 font-bold bg-green-400 border border-green-500 border-solid rounded-full bottom-2 right-2 border-gray'>
                    <Link className='text-white' to='/'>ログイン</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
