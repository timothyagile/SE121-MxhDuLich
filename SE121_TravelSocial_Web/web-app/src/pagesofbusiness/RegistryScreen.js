import React from "react";
import { useNavigate } from "react-router-dom";

const RegistryScreen = () => {
    const navigate = useNavigate();
  
    return (

<body class="bg-blue-100 flex items-center justify-center min-h-screen">
  <div class="bg-white rounded-lg shadow-lg flex max-w-4xl w-full">
   
  <div class="bg-blue-200 p-10 rounded-l-lg flex flex-col items-center justify-center w-1/2">
    <h1 class="text-2xl font-bold mb-4 text-center">
     Chào mừng đến với TravelSocial!
    </h1>
    <p class="text-lg mb-8">
     Bạn muốn đăng ký kinh doanh?
    </p>
    <img alt="Illustration of a person promoting a product on social media" class="w-64 h-64" height="300" src={require('../assets/images/registry1.png')} width="300"/>
   </div>
   
   <div class="p-10 w-1/2">
    <div class="flex items-center mb-6">
     <img alt="Travel Social Logo" class="w-12 h-12 mr-2" height="50" src={require('../assets/images/registry1.png')} width="50"/>
     <h2 class="text-xl font-bold">
      Đăng ký kinh doanh ngay
      <i class="fas fa-pencil-alt">
      </i>
     </h2>
    </div>
    <p class="mb-6 text-gray-500">
     Vui lòng nhập thông tin đăng ký 
    </p>
    <form>
     <div class="mb-4">
        <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Abc@example.com" />
          </div>
      <div class="relative mt-1">
      </div>
     </div>
     <div class="mb-4">
        <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="••••••••" />
        </div>
      <div class="relative mt-1">
      </div>
     </div>
     <div class="mb-4">
        <div className="input-group">
            <label>Nhập lại Mật khẩu</label>
            <input type="password" placeholder="" />
        </div>
      <div class="relative mt-1">
       
      </div>
     </div>
     <div class="mb-4">
        <button className="login-button mb-4" type="submit" onClick={() => navigate("/loginscreen")}>
        Đăng ký ngay
        </button>
     </div>
     
    </form>
   </div>
  </div>
 </body>
    )
}

export default RegistryScreen;