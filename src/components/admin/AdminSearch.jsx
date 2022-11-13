import React from 'react'
import { AiOutlineClear } from "react-icons/ai";
const AdminSearch = () => {
    return (
        <div className="flex items-center justify-center">
            <input type="text" placeholder='Nhập từ khóa tìm kiếm...' className="border border-gray-300 rounded-md p-2 bg-transparent text-xl text-textColor outline-none focus-within:border-gray-500 focus-within:bg-white focus-within:text-headingColor focus-within:drop-shadow-md transtion-all duration-150 ease-in-out w-full md:w-460"
            // onInput={(e) => setInputValue(e.target.value)}
            // onFocus={() => setFocusInput(!focusInput)}
            // onBlur={() => setFocusInput(false)}
            />
            <button className="flex items-center justify-center p-2">
                <AiOutlineClear className="text-2xl" />
            </button>


        </div>
    )
}

export default AdminSearch