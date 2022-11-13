import { Link, NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillFacebook, AiFillGooglePlusSquare, AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="w-full border-t-2 border-gray-500 mt-4">
            <div className="flex flex-wrap items-start gap-4 p-6">
                <div className="">
                    <h4 className="text-blue-600 mb-2 text-lg uppercase">CÔNG TY TNHH THIẾT BỊ Y TẾ GDENT</h4>
                    <p className="text-textColor text-sm">
                        <span className="font-semibold text-black">Địa chỉ: </span>
                        195 Lê Cao Lãng, P. Phú Thạnh, Q. Tân Phú, TP. HCM
                    </p>
                    <p className="text-textColor text-sm">
                        <span className="font-semibold text-black">Văn phòng Hà Nội: </span>
                        Phòng 701, 702, tầng 7, tòa nhà 03, Ngõ 115, Nguyễn Khang, Phường Yên Hòa, Quận Cầu Giấy, Hà Nội.
                    </p>
                    <div className="flex items-center gap-4">
                        <p className="text-textColor text-sm">
                            <span className="font-semibold text-black">Tel: </span>
                            (028) 38 606 607
                        </p>
                        <p className="text-textColor text-sm">
                            <span className="font-semibold text-black">Fax: </span>
                            1(028) 38 606 607
                        </p>
                        <p className="text-textColor text-sm">
                            <span className="font-semibold text-black">Hotline: </span>
                            0938 68 38 22
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-textColor text-sm">
                            <span className="font-semibold text-black">Email: </span>
                            info@gdent.vn
                        </p>
                        <p className="text-textColor text-sm">
                            <span className="font-semibold text-black"> Website: </span>
                            www.gdent.vn
                        </p>
                    </div>
                    <p className="text-[12px] text-textColor">© 2019. GPDKKD: 0315403683 do sở KH & ĐT TP.HCM cấp ngày 21/11/2018. Email: info@gdent.vn.</p>
                </div>

                <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-between p-2 border-b border-gray-500">
                        <h4 className=" text-lg text-blue-600 uppercase">Hợp tác</h4>
                    </div>
                    <NavLink to="/" className="flex items-center justify-between gap-2 p-2 border-b border-gray-300 text-textColor hover:text-blue-600 transition-all duration-150 ease-in-out">
                        <IoIosArrowForward className="text-base" />
                        <p className=" text-sm">Hướng dẫn mua hàng</p>
                    </NavLink>
                    <NavLink to="/" className="flex items-center justify-between gap-2 p-2 border-b border-gray-300 text-textColor hover:text-blue-600 transition-all duration-150 ease-in-out">
                        <IoIosArrowForward className="text-base" />
                        <p className=" text-sm">Thông tin khuyến mãi</p>
                    </NavLink>
                    <NavLink to="/" className="flex items-center justify-between gap-2 p-2 border-b border-gray-300 text-textColor hover:text-blue-600 transition-all duration-150 ease-in-out">
                        <IoIosArrowForward className="text-base" />
                        <p className=" text-sm">Thông tin thanh toán</p>
                    </NavLink>
                    <NavLink to="/" className="flex items-center justify-between gap-2 p-2 border-b border-gray-300 text-textColor hover:text-blue-600 transition-all duration-150 ease-in-out">
                        <IoIosArrowForward className="text-base" />
                        <p className=" text-sm">Chăm sóc khách hàng</p>
                    </NavLink>
                </div>

                <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-between p-2 border-b border-gray-500">
                        <h4 className=" text-lg text-blue-600 uppercase">HỖ TRỢ KHÁCH HÀNG</h4>
                    </div>
                    <NavLink to="/" className="flex items-center justify-between gap-2 p-2 border-b border-gray-300 text-textColor hover:text-blue-600 transition-all duration-150 ease-in-out">
                        <IoIosArrowForward className="text-base" />
                        <p className=" text-sm">Chính sách bảo mật</p>
                    </NavLink>
                    <NavLink to="/" className="flex items-center justify-between gap-2 p-2 border-b border-gray-300 text-textColor hover:text-blue-600 transition-all duration-150 ease-in-out">
                        <IoIosArrowForward className="text-base" />
                        <p className=" text-sm">Chính sách giao hàng</p>
                    </NavLink>
                    <NavLink to="/" className="flex items-center justify-between gap-2 p-2 border-b border-gray-300 text-textColor hover:text-blue-600 transition-all duration-150 ease-in-out">
                        <IoIosArrowForward className="text-base" />
                        <p className=" text-sm">Quy định đổi trả hàng</p>
                    </NavLink>
                    <NavLink to="/" className="flex items-center justify-between gap-2 p-2 border-b border-gray-300 text-textColor hover:text-blue-600 transition-all duration-150 ease-in-out">
                        <IoIosArrowForward className="text-base" />
                        <p className=" text-sm">Chính sách bảo hành</p>
                    </NavLink>
                </div>
            </div>
            <div className="w-full bg-blue-500 text-white p-6 flex justify-between items-center">
                <p className="text-sm">Copyright © 2019. GDENT Co. All rights reserved. Designed by VTP ™</p>

                <div className="flex items-center justify-between gap-4">
                    <Link to="/"><AiFillTwitterSquare className="text-blue-300 text-2xl drop-shadow-lg" /></Link>
                    <Link to="/"><AiFillFacebook className="text-blue-900 text-2xl drop-shadow-lg" /></Link>
                    <Link to="/"><AiFillGooglePlusSquare className="text-orange-700 text-2xl drop-shadow-lg" /></Link>
                    <Link to="/"><AiFillLinkedin className="text-blue-700 text-2xl drop-shadow-lg" /></Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
