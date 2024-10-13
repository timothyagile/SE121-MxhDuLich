import React, { useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

const Pagination = ({totalPages}) => {

    const [currentPage, setCurrentPage] = useState(1);

    const handlePrevPage = () => {
        if (currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage =() => {
        if(currentPage<totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="pagination">
            <IoIosArrowDropleft 
                className="w-1 cursor-pointer" 
                onClick={handlePrevPage} 
            />
            {Array.from({ length: totalPages }, (_, index) => ( 
                <span 
                    key={index + 1} 
                    className={`page ${currentPage === index + 1 ? 'text-blue-500' : ''}`}
                    onClick={() => setCurrentPage(index + 1)} // Chuyển đến trang khi nhấn
                >
                    {index + 1}
                </span>
            ))}
            <IoIosArrowDropright 
                className="w-1 cursor-pointer" 
                onClick={handleNextPage} 
            />
        </div>
    )
}

export default Pagination;