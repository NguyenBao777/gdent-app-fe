import { useEffect, useState } from 'react'
import { AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai'
import { FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useStateValue } from '../../context/StateProvider';
import { serverPublic } from '../../utils/serverPublic';
import { adminUpdateOnl, getOrderByID } from '../../utils/hepperApi';
import { actionType } from "../../../src/context/reducer";
import Logo from "../..//assets/img/logo.png";

const AdminHeader = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [context, dispatch] = useStateValue();
    const [showLogout, setShowLogout] = useState(false);
    const [listOrder, setListOrder] = useState([]);
    const navigate = useNavigate();

    const newListOrder = listOrder.filter((order) => order?.order_status !== 0);

    const adminLogout = () => {
        adminUpdateOnl(context.admin?.id, "no").then((res) => {
            if (res.data.success) dispatch({
                type: actionType.SET_ADMIN,
                admin: null
            });
        })
    }

    useEffect(() => {
        getOrderByID(context.admin?.id).then((res) => {
            setListOrder(res.data.message);
        });

    }, []);

    useEffect(() => {
        if (!context.admin)
            navigate("/dashboard/login", { replace: true });

    }, [context.admin]);

    return (
        <header className="fixed z-20 top-0 left-0 w-full flex items-center justify-between gap-2 px-2 py-1 bg-primary">
            <nav className="flex flex-1 items-center gap-4">
                <NavLink to="/dashboard" className="flex items-center justify-center">
                    <img src={Logo} className="object-cover w-150" alt="" />
                </NavLink>
                <ul className="hidden w-full lg:flex gap-4 items-center">
                    <li className="px-2 py-1">
                        <NavLink to="/dashboard/product" className={({ isActive }) => isActive ? "text-textHover" : ""}>Sản Phẩm</NavLink>
                    </li>
                    <li className="px-2 py-1">
                        <NavLink to="/dashboard/category" className={({ isActive }) => isActive ? "text-textHover" : ""}>Danh Mục</NavLink>
                    </li>
                    <li className="px-2 py-1">
                        <NavLink to="/dashboard/brand" className={({ isActive }) => isActive ? "text-textHover" : ""}>Thương Hiệu</NavLink>
                    </li>
                    {context.admin?.admin_role === "shipper" && (
                        <li className="px-2 py-1 relative">
                            {newListOrder?.length > 0 && (
                                <span className="w-4 h-4 rounded-full bg-red-600 absolute -top-1 right-0"></span>
                            )}
                            <NavLink to="/dashboard/orderassigned" className={({ isActive }) => isActive ? "text-textHover" : ""}>Đơn hàng cần giao</NavLink>
                        </li>
                    )}
                    {context.admin?.admin_role === "admin" && (
                        <>
                            <li className="px-2 py-1">
                                <NavLink to="/dashboard/order" className={({ isActive }) => isActive ? "text-textHover" : ""}>Đặt Mua</NavLink>
                            </li>
                            <li className="px-2 py-1">
                                <NavLink to="/dashboard/slide" className={({ isActive }) => isActive ? "text-textHover" : ""}>Slide</NavLink>
                            </li>
                            <li className="px-2 py-1">
                                <NavLink to="/dashboard/news" className={({ isActive }) => isActive ? "text-textHover" : ""}>News</NavLink>
                            </li>
                            <li className="px-2 py-1">
                                <NavLink to="/dashboard/content" className={({ isActive }) => isActive ? "text-textHover" : ""}>Content</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <div className="w-225 flex items-center justify-center p-2 gap-4 relative">
                <motion.button whileTap={{ scale: 0.75 }} className="flex items-center justify-center h-8 w-8 rounded-full hover:shadow-md transition-all duration-150 ease-in-out"
                    onClick={() => setShowLogout(!showLogout)}
                >
                    <img src={`${serverPublic}images/admin/${context.admin?.admin_image}`} className="object-cover h-8 w-8 rounded-full" alt="" />
                </motion.button>
                <div className="">
                    <p className="text-md font-semibold text-textColor">{context.admin?.admin_name}</p>
                    <p className="text-base text-textColor">{context.admin?.admin_role}</p>
                </div>
                {showLogout && (
                    <motion.div className="bg-white shadow-md rounded-sm py-2 px-4 absolute top-16 right-8 flex flex-col items-center justify-center gap-4"
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        exit={{ y: 200 }}
                    >
                        <div className="w-full px-4 hover:bg-gray-300 transition-all duration-150 ease-in-out text-center text-lg font-semibold text-textColor">
                            <Link to="/userprofile" className="">Hồ sơ cá nhân</Link>
                        </div>
                        <motion.button whileTap={{ scale: 0.75 }} className={`flex items-center justify-center py-1 px-4 bg-red-600 rounded-md text-white text-lg font-semibold`}
                            onClick={adminLogout}
                        >
                            Đăng Xuất
                            <AiOutlineLogout className="ml-2 text-xl" />
                        </motion.button>
                    </motion.div>
                )}
                <div className={`lg:hidden cursor-pointer duration-150 transition-all ${showMenu ? "rotate-90" : ""}`} onClick={() => setShowMenu(!showMenu)}>
                    <AiOutlineMenu className="text-2xl" />
                </div>
            </div>
            {showMenu && (
                <motion.div className="w-350 h-screen absolute top-0 right-0 bg-white z-12 p-2 shadow-md"
                    initial={{ opacity: 0.5, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0.5, x: 200 }}
                >
                    <div className="w-full flex items-center px-4 py-2 justify-end">
                        <button className="flex items-center justify-center p-2 h-6 w-6 rounded-full bg-red-600 shadow-md transtion-all duration-15- ease-in-out"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <FaTimes className="text-2xl text-white" />
                        </button>
                    </div>

                    <ul className="flex flex-col w-full justify-center gap-4 mt-10">
                        <li className="w-full text-center text-lg hover:bg-gray-300 transition-all duration-150 ease-in-out px-2 py-1">
                            <NavLink to="/dashboard/product" className={({ isActive }) => isActive ? "text-textHover" : ""}>Sản Phẩm</NavLink>
                        </li>
                        <li className="w-full text-center text-lg hover:bg-gray-300 transition-all duration-150 ease-in-out px-2 py-1">
                            <NavLink to="/dashboard/category" className={({ isActive }) => isActive ? "text-textHover" : ""}>Danh Mục</NavLink>
                        </li>
                        <li className="w-full text-center text-lg hover:bg-gray-300 transition-all duration-150 ease-in-out px-2 py-1">
                            <NavLink to="/dashboard/brand" className={({ isActive }) => isActive ? "text-textHover" : ""}>Thương Hiệu</NavLink>
                        </li>
                        {context.admin?.admin_role === "shipper" && (
                            <li className="w-full text-center text-lg hover:bg-gray-300 transition-all duration-150 ease-in-out px-2 py-1 relative">
                                <span className="w-4 h-4 rounded-full bg-red-600 absolute top-3 right-3"></span>
                                <NavLink to="/dashboard/orderassigned" className={({ isActive }) => isActive ? "text-textHover" : ""}>Đơn hàng cần giao</NavLink>
                            </li>
                        )}
                        {context.admin?.admin_role === "admin" && (
                            <>
                                <li className="w-full text-center text-lg hover:bg-gray-300 transition-all duration-150 ease-in-out px-2 py-1">
                                    <NavLink to="/dashboard/order" className={({ isActive }) => isActive ? "text-textHover" : ""}>Đặt Mua</NavLink>
                                </li>
                                <li className="w-full text-center text-lg hover:bg-gray-300 transition-all duration-150 ease-in-out px-2 py-1">
                                    <NavLink to="/dashboard/slide" className={({ isActive }) => isActive ? "text-textHover" : ""}>Slide</NavLink>
                                </li>
                                <li className="w-full text-center text-lg hover:bg-gray-300 transition-all duration-150 ease-in-out px-2 py-1">
                                    <NavLink to="/dashboard/news" className={({ isActive }) => isActive ? "text-textHover" : ""}>News</NavLink>
                                </li>
                                <li className="w-full text-center text-lg hover:bg-gray-300 transition-all duration-150 ease-in-out px-2 py-1">
                                    <NavLink to="/dashboard/cotent" className={({ isActive }) => isActive ? "text-textHover" : ""}>Cotent</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </motion.div>
            )}
        </header>
    )
}

export default AdminHeader