import React from "react";
import "../styles/ChatBusinessScreen.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/DetailLocationScreen.css';
import { FaSearch } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const ChatBusinessScreen =() => {
    const [isFocused, setIsFocused] = useState(false);

    const navigate = useNavigate ();


    return (
        <div class="container">
           <div class="containerformobile">
                <div class="containerlistbusiness widthlistbusiness anti-bg">  
                <div class="flex h-100">
                <div class="w-1/4 bg-list-chat p-4">
                    <h1 class="text-2xl font-bold mb-4">
                    Chat
                    </h1>
                    <div class="relative mb-4">
                    <input
                        className="w-full p-2 pl-10 border br-22 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        
                        placeholder={isFocused ? '' : '     Tìm kiếm'}
                        type="text"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    {!isFocused && (
                        <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                    )}  
                    </div>
                    <div class="flex items-center p-2 bg-white rounded-lg mb-2">
                    <img alt="User avatar" class="w-10 h-10 rounded-full mr-2" height="40" src="https://storage.googleapis.com/a1aa/image/JpjvKYyvHrbHO5vhDU7Snddgv8aH8mWZ6TRjkvsMXvWcdE6E.jpg" width="40"/>
                    <div>
                    <p class="font-medium">
                    Nguyen Phuc Thinh
                    </p>
                    <p class="text-sm text-gray-500">
                    The location was perfect. The staff was...
                    </p>
                    </div>
                    <span class="ml-auto text-xs text-gray-400">
                    24/3
                    </span>
                    </div>
                </div>
                
                <div class="w-3/4 bg-list-chat p-4 flex flex-col ">

  <div class="flex items-center mb-4">
    <img
      alt="User avatar"
      class="w-10 h-10 rounded-full mr-2"
      height="40"
      src="https://storage.googleapis.com/a1aa/image/JpjvKYyvHrbHO5vhDU7Snddgv8aH8mWZ6TRjkvsMXvWcdE6E.jpg"
      width="40"
    />
    <p class="font-medium">Nguyen Phuc Thinh</p>
  </div>

  <div class="flex-1 overflow-y-auto mb-4">
    <div class="mb-4">
      <div class="flex items-start mb-2">
        <img
          alt="User avatar"
          class="w-8 h-8 rounded-full mr-2"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/JpjvKYyvHrbHO5vhDU7Snddgv8aH8mWZ6TRjkvsMXvWcdE6E.jpg"
          width="40"
        />
        <div class="bg-white p-2 rounded-lg">
          <p>xin chào admin, tôi cần hỗ trợ</p>
        </div>
        <span class="ml-2 text-xs text-gray-400">4:00 PM</span>
      </div>
      <div class="flex items-start justify-end mb-2">
        <div class="bg-blue-500 text-white p-2 rounded-lg">
          <p>Ok</p>
        </div>
        <span class="ml-2 text-xs text-gray-400">3:23 PM</span>
      </div>
    </div>
  </div>


  <div class="flex items-center">
    <input
      class="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Type your message..."
      type="text"
    />
    <button class="ml-2 w-1">
      <IoIosSend class="big-icon" />
    </button>
  </div>
</div>

                </div>
                </div>

            </div>
        </div>
    );
};

export default ChatBusinessScreen;