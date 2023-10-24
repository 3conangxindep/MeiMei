import React, { Fragment, useState } from 'react';
import './LoginPage.css';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";


const LoginPage = () => {
    const history = useHistory();
    const http = axios.create({
        baseURL: "http://localhost:8000",
    
        headers: {
          "X-Requested-with": "XMLHttpRequest",
        },
    
        withCredentials: true,
    });
  
  //handle Login
  const [user, setUser] = useState(
    localStorage.hasOwnProperty("currentUser") === true
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const csrf = await http.get("/sanctum/csrf-cookie");
      const login = await http.post("/api/login", {
        email: email,
        password: password
      });

      const current = localStorage.setItem(
        "currentUser",
        JSON.stringify(login)
      );

      setUser(login);
      history.push('/main');
      console.log("dang nhap thanh cong")
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

    return (
        <Fragment>
            <div className='Container'>
                <div className='LoginBorder'>
                    <h2 className='FormHeader'>ログイン</h2>
                    <form onSubmit={handleLogin}>
                        <div className='LoginForm'>
                            <div className='FormGroup'>
                                <label className='FormLabel'>メールアドレス</label>
                                    <input
                                        type="email"
                                        className='FormInput'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="meimei@gmail.com"
                                        required
                                    />
                                
                            </div>
                            <div className='FormGroup'>
                                <label className='FormLabel'>パスワード</label>
                                    <input
                                        type="password"
                                        className='FormInput'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="******"
                                        required
                                    />
                                
                            </div>
                        </div>
                        <button className='FormButton' type='submit'>ログイン</button><br />
                        <button className='FormButton'><Link to="/SignUpPage">新規登録</Link></button><br />
                    </form>
                    {loading && (
                        <div role="status" className="pt-4 flex">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
            
        </Fragment>
    );
};

export default LoginPage;
