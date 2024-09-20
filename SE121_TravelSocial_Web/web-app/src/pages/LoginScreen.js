// LoginScreen.js
import React from 'react';
import '../styles/LoginScreen.css';

function LoginScreen() {
  return (
    <div className="container">
      <div className="image-section">
        <img src="your-image-url-here" alt="Travel" className="background-image" />
      </div>
      <div className="login-section">
        <img src="your-logo-url-here" alt="Logo" className="logo" />
        <h2>Chào mừng bạn trở lại 👋</h2>
        <p>Vui lòng đăng nhập</p>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="nhubaole@example.com" />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Nhớ mật khẩu</label>
            <a href="#" className="forgot-password">Quên mật khẩu?</a>
          </div>
          <button type="submit" className="login-button">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;