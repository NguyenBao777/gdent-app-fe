import React from 'react'

const Pagination = ({ itemsPerPage, totalPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPages / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex items-center justify-center gap-4">
            {pageNumbers.length > 0 && pageNumbers.map((pageNumber, i) => (
                <div key={i} className={`cursor-pointer text-base rounded-sm  w-8 h-8 flex items-center justify-center border border-gray-600  hover:bg-gray-600 hover:text-white hover:shadow-md transition-all duration-150 ease-in-out ${currentPage === pageNumber ? "bg-gray-600 text-white" : "bg-white text-black"}`}
                    onClick={() => setCurrentPage(pageNumber)}
                >
                    {pageNumber}
                </div>
            ))}
        </nav>
    )
}

export default Pagination