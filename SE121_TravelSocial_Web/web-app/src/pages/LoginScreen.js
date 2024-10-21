// LoginScreen.js
import React from 'react';
import '../styles/LoginScreen.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginScreen() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //API CHECK ĐĂNG NHẬP

  const handleLogin = async () => {
    // try {
    //   const response = await fetch('http://localhost:5000/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     throw new Error(data.message || 'Đăng nhập thất bại');
    //   }

    //   // Điều hướng dựa trên role
    //   if (data.role === 'admin') {
    //     navigate('/dashboard/admin');
    //   } else if (data.role === 'business') {
    //     navigate('/dashboard/business');
    //   }
    // } catch (error) {
    //   setError(error.message);
    // }
    try {
      // Tạm thời sử dụng dữ liệu tĩnh thay vì gọi API thực
      const mockResponse = {
        email: 'admin@example.com',
        role: 'business', // Thay đổi thành 'business' để test
      };
  
      // Giả lập điều hướng dựa trên role
      if (mockResponse.role === 'admin') {
        navigate('/dashboard/admin');
      } else if (mockResponse.role === 'business') {
        navigate('/dashboard/business');
      }
    } catch (error) {
      setError('Lỗi đăng nhập tạm thời.');
    }
  };
  

  return (
    <div className="container">
      <div className="image-section">
        <img src={require('../assets/images/frameTravel.png')} alt="Travel" className="background-image" />
      </div>
      <div className="login-section ">
        <img src="" alt="Logo" className="logo" />
        <h2>Chào mừng bạn trở lại 👋</h2>
        <p class="mb-8 text-grey-300">Vui lòng đăng nhập</p>
        <form class="w-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email" 
              placeholder="Abc@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="checkbox-group">
            <div className="remember-group">
              <input type="checkbox" id="remember"/>
              <label class=" flex flex-wrap content-around align-center mb-0" htmlFor="remember">Nhớ mật khẩu</label>
            </div>
            
            <a href="#" className="forgot-password">Quên mật khẩu?</a>
          </div>
          <button type="submit" className="login-button" onClick={handleLogin} >Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;