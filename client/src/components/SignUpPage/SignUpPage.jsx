import React, { useState } from 'react';
import SetTimes from './SetTimes';
import GenderTheme from './GenderTheme';
import '../SignUpPage/SignUpPage.css';

const SignUpPage = () => {
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthYear, setBirthYear] = useState(''); 

    const [FirstnameErrorMessage, setFirstnameErrorMessage] = useState('');
    const [LastnameErrorMessage, setLastnameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const handleSignup = () => {
        if (email === '' || password === '' || Firstname === '' || Lastname === '') {
            if (email === '') {
                setEmailErrorMessage('メールアドレスを入力してください');
            }
            if (password === '') {
                setPasswordErrorMessage('パスワードを入力してください');
            }
            if (Firstname === '') {
                setFirstnameErrorMessage('名（ファーストネーム）を入力してください');
            }
            if (Lastname === '') {
                setLastnameErrorMessage('姓（ラストネーム）を入力してください');
            }
            return;
        }

        console.log('新規登録：', Firstname, Lastname, email, password, selectedGender, birthMonth, birthDay, birthYear);
    };

    return (
        <div className='Container'>
            <div className='SignUpBorder'>
                <h2 className='FormHeader'>新規登録</h2>
                <div className='SignUpForm'>
                    <div className='FormGroup'>
                        <label className='FormLabel'>姓</label>
                        <input
                            type="text"
                            className='FormInput'
                            value={Lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        {FirstnameErrorMessage && <p className='FormError'>{FirstnameErrorMessage}</p>}
                    </div>
                    <div className='FormGroup'>
                        <label className='FormLabel'>名</label>
                        <input
                            type="text"
                            className='FormInput'
                            value={Firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        {LastnameErrorMessage && <p className='FormError'>{LastnameErrorMessage}</p>}
                    </div>
                    <div className='FormGroup'>
                        <label className='FormLabel'>メールアドレス</label>
                        <input
                            type="email"
                            className='FormInput'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailErrorMessage && <p className='FormError'>{emailErrorMessage}</p>}
                    </div>
                    <div className='FormGroup'>
                        <label className='FormLabel'>パスワード</label>
                        <input
                            type="password"
                            className='FormInput'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordErrorMessage && <p className='FormError'>{passwordErrorMessage}</p>}
                    </div>
                    
                    <SetTimes
                        setCurrentMonth={setBirthMonth}
                        setCurrentDay={setBirthDay}
                        setCurrentYear={setBirthYear}
                    />
                   
                    <GenderTheme setSelectedOption={setSelectedGender}></GenderTheme>
                </div>
                <button className='FormButton' onClick={handleSignup}>新規登録</button><br />
                <a href="#">ログイン</a><br />
            </div>
        </div>
    );
};

export default SignUpPage;
