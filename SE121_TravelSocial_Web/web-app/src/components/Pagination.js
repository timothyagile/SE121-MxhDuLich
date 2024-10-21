import React, { useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {

    const totalPages = Math.max(4, Math.ceil(totalItems / itemsPerPage));
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [startPage, setStartPage] = useState(1); // Trang đầu tiên hiển thị trong 4 ô
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        onPageChange(newPage);
  
        // Cập nhật ô bắt đầu nếu cần
        if (newPage < startPage) {
          setStartPage(startPage - 1);
        }
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        onPageChange(newPage);
  
        // Cập nhật ô bắt đầu nếu cần
        if (newPage >= startPage + 4) {
          setStartPage(startPage + 1);
        }
      }
    };
  
    const handlePageClick = (page) => {
      setCurrentPage(page);
      onPageChange(page);
    };

    return (
        <div className="pagination flex items-center justify-center gap-2 mt-4">
          <IoIosArrowDropleft
            className={`w-1 cursor-pointer ${currentPage === 1 ? 'text-gray-400' : ''}`}
            onClick={handlePrevPage}
          />
    
          {Array.from({ length: 4}, (_, index) => {
            const pageNumber = startPage + index; // Tính số trang cho mỗi ô
    
            return (
              <span
                key={pageNumber}
                className={`page cursor-pointer px-2 py-1 rounded ${
                  currentPage === pageNumber ? 'bg-blue-important text-white' : 'bg-gray-200 text-black'
                }`}
                onClick={() => handlePageClick(pageNumber)}
                style={{ minWidth: '12px', textAlign: 'center' }}
              >
                {pageNumber <= totalPages ? pageNumber : ''}
              </span>
            );
          })}
    
          <IoIosArrowDropright
            className={ `w-1 cursor-pointer ${
              currentPage === totalPages ? 'text-gray-400' : ''
            }`}
            onClick={handleNextPage}
          />
        </div>
    )
}

export default Pagination;