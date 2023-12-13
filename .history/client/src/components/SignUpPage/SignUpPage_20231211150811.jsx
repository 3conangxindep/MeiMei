import React, { useState } from 'react';
import SetTimes from './SetTimes';
import GenderTheme from './GenderTheme';
import './SignUpPage.css';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import bcrypt from 'bcryptjs';

const img = 'meimei_img.jpg';
const SignUpPage = () => {
    const http = axios.create({
        baseURL: "http://10.200.3.10:8000",

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
                "http://localhost:8000/api/user",
                formData
            );
            console.log("Registration successful:", register);
            console.log(user.data.id_card);

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
            history.push(`/main/${user.data.id_card}`);
            console.log("dang nhap thanh cong")
        } catch (error) {
            setErrorMessage("IDカードかメールアドレスか既に登録しています");
            console.error("Register failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='border-bg'>
            {/* bachround color*/}
            <div className='signup-bg'>
                <div className='Container-signUp'>
                    <div className='SignUpBorder'>
                        <h4 className='SignUp'>新規登録</h4>
                        <form onSubmit={handleSignup}>
                            <div className='SignUpForm'>
                                <div className='FormGroup'>
                                    <input
                                        type="text"
                                        maxLength={6}
                                        minLength={6}
                                        style={{ width: '40%' }}
                                        className='FormInput'
                                        id='text'
                                        value={idCard}
                                        onChange={(e) => setIdCard(e.target.value)}
                                        // placeholder="123456"
                                        required
                                    />
                                    <label for="text" className='Label-sign'>ID カード</label>
                                </div>
                                <div className='FormGroup'>
                                    <input
                                        type="text"
                                        className='FormInput'
                                        id='name'
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        // placeholder="MeiMei"
                                        required
                                    />
                                    <label for="text" className='Label-sign'>名前</label>
                                </div>
                                <div className='FormGroup'>
                                    <input
                                        type="email"
                                        className='FormInput'
                                        id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label for='email' className='Label-sign'>メールアドレス</label>
                                </div>
                                <div className='FormGroup'>
                                    <input
                                        type="password"
                                        className='FormInput'
                                        id='pass'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label for="pass" className='Label-sign'>パスワード</label>
                                </div>
                                <div className='settime'>
                                    <SetTimes
                                        setCurrentYear={setBirthYear}
                                        setCurrentMonth={setBirthMonth}
                                        setCurrentDay={setBirthDay}
                                    />
                                </div>
                                <div>
                                    <GenderTheme setSelectedOption={setGender}></GenderTheme>
                                </div>

                                <button className='FormButton' type='submit'>新規登録</button>
                            </div>
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
                    <div className='Appname'>
                        MeiMei
                        <div className='image'>
                            <img src={img} alt=" image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
