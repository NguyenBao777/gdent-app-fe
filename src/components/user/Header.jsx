import { Link, NavLink } from "react-router-dom";
import { AiOutlineShopping, AiOutlineLogout, AiOutlineMenu, AiOutlineRight, AiFillPhone, AiOutlineMail, AiFillTwitterSquare, AiFillFacebook, AiFillGooglePlusSquare, AiFillLinkedin, AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "../../assets/img/logo.png";
import { SearchBar, LoginForm, RegistationForm } from "../../components";
import { useStateValue } from "../../context/StateProvider";
import NotLogin from "../../assets/img/NotLogin.png";
import { serverPublic } from "../../utils/serverPublic";
import { actionType } from "../../../src/context/reducer";
import { numberFormat } from "../../utils/format";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [context, dispatch] = useStateValue();
    const [profile, setProfile] = useState(false);
    const [countCart, setCountCart] = useState(0);

    const userLogout = () => {
        dispatch({
            type: actionType.SET_USER,
            user: null
        });
        localStorage.clear();
    }

    const handleLogin = () => {
        if (context.user === null) {
            setLogin(true);
        } else {
            setProfile(!profile);
        }
    }


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== null) dispatch({
            type: actionType.SET_USER,
            user: user
        })
    }, []);

    useEffect(() => {

        const sum = numberFormat(context.cart.reduce((total, currentVal) => {
            return total + currentVal.qty;
        }, 0));
        setCountCart(sum);
        sessionStorage.setItem("cart", JSON.stringify(context.cart));
    }, [context.cart]);

    return (
        <header className="w-full bg-primary flex items-center justify-between py-2 px-4 fixed z-10 top-0 left-0">
            <NavLink to="/">
                <img src={Logo} alt="logo" className="w-auto" />
            </NavLink>

            <SearchBar />

            <div className="flex items-center justify-center gap-4 md:gap-8 ml-6">
                <NavLink to="/cart" className="cursor-pointer relative">
                    <span className="absolute -top-3 -right-3 bg-red-600 h-6 w-6 rounded-full flex items-center justify-center text-xs text-white">{countCart}</span>
                    <span className=""><AiOutlineShopping className="text-xl" /></span>
                </NavLink>
                <div className="w-8 h-8 flexitems-center justify-center cursor-pointer"
                    onClick={handleLogin}
                >
                    {context.user ? (
                        <img src={context.user?.user_image ? `${serverPublic}images/user/${context.user?.user_image}` : NotLogin} alt="" className="object-cover w-8 h-8 rounded-full border boder-gray-500" />
                    ) : (
                        <img src={NotLogin} alt="" className="object-cover w-8 h-8 rounded-full border boder-gray-500" />
                    )}

                    {profile && (
                        <div className="bg-white shadow-md rounded-sm py-2 px-4 absolute top-12 -right-24 -translate-x-[50%] flex flex-col items-center justify-center gap-4">
                            <div className="w-full px-4 hover:bg-gray-300 transition-all duration-150 ease-in-out text-center text-lg font-semibold text-textColor">
                                <Link to="/userprofile" className="">Hồ sơ cá nhân</Link>
                            </div>
                            <motion.button whileTap={{ scale: 0.75 }} className={`flex items-center justify-center py-1 px-4 bg-red-600 rounded-md text-white text-lg font-semibold ${context.user ? "visible" : "invisible"}`}
                                onClick={userLogout}
                            >
                                Đăng Xuất
                                <AiOutlineLogout className="ml-2 text-xl" />
                            </motion.button>
                        </div>
                    )}
                </div>
                <div className={`cursor-pointer duration-150 transition-all ${showMenu ? "rotate-90" : ""}`} onClick={() => setShowMenu(!showMenu)}>
                    <AiOutlineMenu className="text-2xl" />
                </div>
            </div>
            {/* Mobile */}
            {showMenu && (
                <motion.div className="absolute z-10 top-0 right-0 w-340 h-screen py-2 flex flex-col items-center justify-start gap-8 bg-white border border-gray-300"
                    initial={{ x: 200, opacity: 0.5 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 200, opacity: 0.5 }}
                >
                    <div className="w-full flex items-center justify-between gap-4 px-4">
                        {context.user ? (
                            <>
                                <img src={context.user?.user_image ? `${serverPublic}images/user/${context.user?.user_image}` : NotLogin} alt="" className="object-cover w-8 h-8 rounded-full border boder-gray-500" />
                                <h4 className="text-textColor text-lg font-semibold">Xin Chào {context.user.user_name}</h4>
                            </>
                        ) : (
                            <>
                                <img src={NotLogin} alt="" className="object-cover w-8 h-8 rounded-full border boder-gray-500" />
                                <h4 className="text-textColor text-lg font-semibold">Hãy đăng nhập</h4>
                            </>
                        )}


                        <div className="flex items-center justify-center cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                            <AiOutlineRight className="text-2xl" />
                        </div>
                    </div>
                    <ul className="w-full flex flex-1 flex-col items-center justify-center gap-4 text-xl">
                        <li className="w-full px-4 py-2 hover:bg-gray-300 transition-all duration-150 ease-in-out text-center text-lg font-semibold text-textColor">
                            <NavLink className={({ isActive }) => isActive ? "text-textHover" : ""} to="/">
                                Trang Chủ
                            </NavLink>
                        </li>
                        <li className="w-full px-4 py-2 hover:bg-gray-300 transition-all duration-150 ease-in-out text-center text-lg font-semibold text-textColor">
                            <NavLink className={({ isActive }) => isActive ? "text-textHover" : ""} to="/about">
                                Giới Thiệu
                            </NavLink>
                        </li>
                        <li className="w-full px-4 py-2 hover:bg-gray-300 transition-all duration-150 ease-in-out text-center text-lg font-semibold text-textColor">
                            <NavLink className={({ isActive }) => isActive ? "text-textHover" : ""} to="/product">
                                Sản Phẩm
                            </NavLink>
                        </li>
                        <li className="w-full px-4 py-2 hover:bg-gray-300 transition-all duration-150 ease-in-out text-center text-lg font-semibold text-textColor">
                            <NavLink className={({ isActive }) => isActive ? "text-textHover" : ""} to="/service">
                                Dịch Vụ
                            </NavLink>
                        </li>
                    </ul>

                    <motion.button whileTap={{ scale: 0.75 }} className={`flex items-center justify-center py-1 px-4 bg-red-600 rounded-md text-white text-lg font-semibold ${context.user ? "visible" : "invisible"}`}
                        onClick={userLogout}
                    >
                        Đăng Xuất
                        <AiOutlineLogout className="ml-2 text-xl" />
                    </motion.button>

                    <div className="flex flex-col justify-center gap-4 px-2">
                        <p className="text-textColor text-sm flex items-center">
                            <AiFillPhone className="mr-2" />
                            Tư vấn: 0938 68 38 22 | (028) 38 606 607
                        </p>
                        <p className="text-textColor text-sm flex items-center">
                            <AiOutlineMail className="mr-2" />
                            info@gdent.vn
                        </p>
                        {/* <p className="text-textColor text-sm flex items-center">
                            <GrLocation className="mr-2" />
                            195 Lê Cao Lãng, P. Phú Thạnh, Q. Tân Phú, TP. HCM
                        </p> */}

                        <div className="flex items-center justify-between gap-4">
                            <Link to="/"><AiFillTwitterSquare className="text-blue-300 text-2xl" /></Link>
                            <Link to="/"><AiFillFacebook className="text-blue-900 text-2xl" /></Link>
                            <Link to="/"><AiFillGooglePlusSquare className="text-orange-700 text-2xl" /></Link>
                            <Link to="/"><AiFillLinkedin className="text-blue-700 text-2xl" /></Link>
                        </div>
                    </div>
                </motion.div>
            )}
            {login && (
                <motion.div className="absolute top-0 left-0 w-screen h-screen z-11 bg-black/70 flex justify-center items-center"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.5 }}
                >
                    <span className="absolute top-1 right-1 bg-red-600 p-2 h-8 w-8 flex items-center justify-center cursor-pointer rounded-full"
                        onClick={() => setLogin(!login)}
                    >
                        <AiOutlineClose className="text-white text-2xl font-semibold" />
                    </span>
                    <div className="p-4 flex flex-col items-center justify-center bg-white shadow-md w-340 rounded-md">
                        {isLogin ? (
                            <LoginForm setIsLogin={setIsLogin} setLogin={setLogin} />
                        ) : (
                            <RegistationForm setIsLogin={setIsLogin} />
                        )

                        }
                    </div>
                </motion.div>
            )}
        </header>
    )
}

export default Header
