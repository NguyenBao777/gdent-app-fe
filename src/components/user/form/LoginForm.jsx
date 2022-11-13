import { motion } from 'framer-motion'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import isEmpty from 'validator/lib/isEmpty';
import { actionType } from '../../../context/reducer';
import { useStateValue } from '../../../context/StateProvider';
import Alert from '../../../utils/alert';
import { userLogin } from '../../../utils/hepperApi';

const LoginForm = ({ setIsLogin, setLogin }) => {
    const [showPassword, setShowPassword] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [msgValidation, setMsgValidation] = useState("");
    const [alertBox, setAlertBox] = useState("");
    const [context, dispatch] = useStateValue();
    const validation = () => {
        const msg = {};

        if (isEmpty(username)) {
            msg.username = "Vui lòng nhập Username.";
        }

        if (isEmpty(password)) {
            msg.password = "Vui lòng nhập Password.";
        }

        setMsgValidation(msg);
        setTimeout(() => setMsgValidation(""), 1500);

        if (Object.keys(msg).length > 0) return true;

        return false;
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validation()) return;
        // handleSubmit
        userLogin(username, password).then((res) => {
            if (res.data.success) {
                setAlertBox({
                    type: "success",
                    message: "Đăng nhập thành công"
                });
                setTimeout(() => { setAlertBox("") }, 1500);


                // initial state
                setUsername("");
                setPassword("");
                dispatch({
                    type: actionType.SET_USER,
                    user: res.data.message[0]
                });
                if (rememberMe) localStorage.setItem("user", JSON.stringify(res.data.message[0]));
                setLogin(false);
            } else {
                setAlertBox({
                    type: "error",
                    message: "Sai tài khoản hoặc mật khẩu"
                });
                setTimeout(() => { setAlertBox("") }, 1500);

            }
        });
    }

    return (
        <motion.form className="flex flex-col items-center justify-center gap-2 py-4 px-2 w-full"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5 }}
            onSubmit={(e) => handleSubmit(e)}>
            {alertBox !== "" && (<Alert alert={alertBox} />)}
            <h4 className="text-center text-textColor font-semibold text-xl">Đăng Nhập</h4>
            <div className="w-full">
                <label htmlFor="user_username" className="text-md font-semibold text-textColor">Tài khoản:</label>
                <input id="user_username" value={username} name="user_username" type="text" placeholder="User Name" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-gray-500 bg-gray-300 outline-none"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.username ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.username}
                </p>
            </div>
            <div className="w-full relative">
                <label htmlFor="use_passwor" className="text-md font-semibold text-textColor">Mật khẩu:</label>
                <input id="user_passwor" name="user_passwor" value={password} type={showPassword ? "text" : "password"} placeholder="Password" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-gray-500 bg-gray-300 outline-none"
                    autoComplete='true'
                    onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword && (
                    <AiFillEyeInvisible className="absolute text-black/50 top-8 right-1 text-2xl cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                )}
                {!showPassword && (
                    <AiFillEye className="absolute text-black/50 top-8 right-1 text-2xl cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                )}
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.password ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.password}
                </p>
            </div>

            <div className="w-full flex items-center gap-2">
                <input id="remember" type="checkbox" placeholder="Password" className="w-4 h-4 cursor-pointer"
                    onChange={() => setRememberMe(!rememberMe)} />

                <label htmlFor="remember" className="text-md font-semibold text-textColor">Nhớ đăng nhập</label>
            </div>
            <button type="submit" className="flex items-center justify-center bg-blue-400/75 text-white hover:shadow-md rounded-md px-4 py-2 text-base outline-none">
                Đăng nhập
            </button>
            <p className="text-textColor text-sm">Chưa có tài khoản? <span className="text-blue-600/40 cursor-pointer" onClick={() => setIsLogin(false)}> Đăng ký nhanh</span></p>
            {/* <div className="border-t border-gray-300 p-2 w-full">
                <button className="w-full cursor-pointer hover:shadow-md flex items-center justify-center gap-2 px-4 py-2 bg-gray-400 hover:bg-gray-300 transition-all duration-150 ease-in-out rounded-md">
                    <FcGoogle className="text-2xl" />
                    Đăng nhập với Google
                </button>
            </div> */}
        </motion.form>
    )
}

export default LoginForm