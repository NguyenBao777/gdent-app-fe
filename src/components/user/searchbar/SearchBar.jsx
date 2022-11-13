import { useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { Link } from "react-router-dom";
import { searchProduct } from "../../../utils/hepperApi";
import { serverPublic } from "../../../utils/serverPublic";
import DataNotFound from "../../../assets/img/DataNotFound.png";
import { numberFormat } from "../../../utils/format";

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const [focusInput, setFocusInput] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = (e) => {
        if (e.target.value !== "") {
            setInputValue(e.target.value);
            searchProduct(inputValue).then((res) => {
                setSearchResult(res.data.message);
            })
        } else {
            setInputValue(e.target.value);
            setSearchResult([]);
        }




    }

    const handleCloseSearch = () => {
        if (searchResult.length > 0) return;

        setFocusInput(false);
        setSearchResult([]);
    }

    return (
        <div className="w-full flex items-cente justify-center relative" >
            <input type="text" value={inputValue} placeholder='Nhập từ khóa tìm kiếm...' className="border border-gray-300 rounded-md p-2 bg-transparent text-xl text-textColor outline-none focus-within:border-gray-500 focus-within:bg-white focus-within:text-headingColor focus-within:drop-shadow-md transtion-all duration-150 ease-in-out w-full md:w-460"
                onInput={(e) => handleSearch(e)}
                onFocus={() => setFocusInput(true)}
                onBlur={handleCloseSearch}
            />
            <button className="flex items-center justify-center p-2"
                onClick={() => {
                    setInputValue("")
                    setFocusInput(false)
                    setSearchResult([]);
                }}>
                <AiOutlineClear className="text-2xl" />
            </button>

            {focusInput && (
                <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-md flex flex-col items-center gap-4 py-2 w-300 md:w-460 lg:left-44 h-300 overflow-y-auto shadow-md" onClick={(e) => { e.stopPropagation() }}>
                    {searchResult.length > 0 ? (
                        searchResult.map((product) => (
                            <Link to={`/productdetail/${product.id}`} className="w-full flex items-center gap-4 p-2 cursor-pointer hover:bg-primary transition-all duration-150 ease-in-out">
                                <div className="border border-gray-300 rounded-md p-1">
                                    <img src={`${serverPublic}images/product/${product.product_image_1}`} alt="" className="object-cover w-[60px]" />
                                </div>
                                <div className="flex flex-1 flex-col gap-2 justify-center">
                                    <h4 className="text-sm text-textColor font-semibold">{product?.product_name}</h4>
                                    <p className="text-sm text-black"> {product?.product_listed_price == "0" ? (
                                        "Liên hệ"
                                    ) : (
                                        numberFormat(product?.product_listed_price) + " VNĐ"
                                    )}</p>
                                </div>
                            </Link>

                        ))
                    ) : (
                        <img src={DataNotFound} alt="" className="object-cover w-full h-full" />
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar
