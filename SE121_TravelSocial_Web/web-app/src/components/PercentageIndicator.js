import React from 'react';

const PercentageIndicator = ({ percentage }) => {
  const isDecrease = percentage < 0;
  const formattedPercentage = `${Math.abs(percentage)}%`;

  return (
    
      <div className="flex flex-wrap justify-end items-center bg-blue-200 rounded-lg ">
        {/* SVG mũi tên dựa theo trạng thái tăng/giảm */}
        <svg
          className={`w-4 h-4 ${
            isDecrease ? 'text-red-400 rotate-180' : 'text-green-400'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 3l-7 7h4v7h6v-7h4l-7-7z"></path>
        </svg>

        {/* Nội dung phần trăm với màu sắc động */}
        <span
          className={`ml-2 bottom-5 ${
            isDecrease ? 'text-red-400' : 'text-green-400'
          }`}
        >
          {formattedPercentage}
        </span>
      </div>
  );
};

export default PercentageIndicator;
