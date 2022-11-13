import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import BgImg from "../../../assets/img/bg-img/login-bg.png";
import isEmpty from "validator/lib/isEmpty";
import Alert from "../../../utils/alert";
import { adminLogin, adminUpdateOnl } from "../../../utils/hepperApi";
import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";


const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState("password");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [msgValidation, setMsgValidation] = useState("");
    const [alertBox, setAlertBox] = useState("");
    const [context, dispatch] = useStateValue();
    const navigate = useNavigate();

    const validation = () => {
        const msg = {}

        if (isEmpty(username)) {
            msg.username = "Vui lòng điền Username";
        }

        if (isEmpty(password)) {
            msg.password = "Vui lòng điền Password";
        }

        setMsgValidation(msg);
        setTimeout(() => setMsgValidation(""), 1000);

        if (Object.keys(msg).length > 0) return true;

        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;

        adminLogin(username, password).then((res) => {
            if (res.data.success) {
                dispatch({
                    type: actionType.SET_ADMIN,
                    admin: res.data.message
                });
                adminUpdateOnl(res.data.message.id, "yes").then((res) => {
                    navigate("/dashboard", { replace: true });
                });
            } else {
                setAlertBox({
                    type: "error",
                    message: "Sai tài khoản hoặc mật khẩu."
                });
                setTimeout(() => setAlertBox(""), 1500);
            }
        })


    }

    return (
        <div className="w-full h-full bg-black relative">
            <img src={BgImg} className="w-full h-full object-cover" />
            <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center bg-cardOverlay ">
                {alertBox !== "" && (<Alert alert={alertBox} />)}
                <section className="h-full">
                    <div className="container px-6 py-4 h-full">
                        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                            <div className="md:w-6/12 lg:w-6/12 mb-4 md:mb-0">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                    className="w-300 md:w-full"
                                    alt="Phone image"
                                />
                            </div>
                            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                                <form className="bg-primary px-4 py-2 rounded-sm" onSubmit={(e) => handleSubmit(e)}>
                                    <h4 className="text-center text-textColor text-lg font-semibold mb-4">Đăng Nhập</h4>
                                    {/* <!-- Email input --> */}
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-transparent focus-within:bg-white focus-within:shadow-md bg-clip-padding border-b border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <p className="text-red-700 font-light ml-2 text-xs italic">
                                            <span className={`${msgValidation?.username ? "visible" : "invisible"}`}>* </span>
                                            {msgValidation?.username}
                                        </p>
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="mb-6 relative">
                                        <input
                                            type={showPassword}
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-transparent focus-within:bg-white focus-within:shadow-md bg-clip-padding border-b border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Password"
                                            autoComplete="true"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <p className="text-red-700 font-light ml-2 text-xs italic">
                                            <span className={`${msgValidation?.password ? "visible" : "invisible"}`}>* </span>
                                            {msgValidation?.password}
                                        </p>
                                        {showPassword === "password" ? (
                                            <AiFillEye className="text-2xl text-blue-600 absolute top-3 right-2 cursor-pointer" onClick={() => setShowPassword("text")} />
                                        ) : (
                                            <AiFillEyeInvisible className="text-2xl text-blue-600 absolute top-3 right-2 cursor-pointer" onClick={() => setShowPassword("password")} />
                                        )}
                                    </div>


                                    <button
                                        type="submit"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >
                                        Đăng nhập
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AdminLogin
