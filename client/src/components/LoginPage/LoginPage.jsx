import React, { useState } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const handleLogin =() => {
        if (email === '' || password === '') {
            if (email === '') {
                setEmailErrorMessage('メールアドレスを入力してください');
            }
            if (password === '') {
                setPasswordErrorMessage('パスワードを入力してください');
            }
            return;
        }

        console.log('ログイン：', email, password);
    };
    return (
        <div className='Container'>
            <div className='LoginBorder'>
                <h2 className='FormHeader'>ログイン</h2>
                <div className='LoginForm'>
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
                </div>
                <button className='FormButton' onClick={handleLogin}>ログイン</button><br />
                <button className='FormButton'><Link to="/SignUpPage">新規登録</Link></button><br />
            </div>
        </div>
    );
};

export default LoginPage;
