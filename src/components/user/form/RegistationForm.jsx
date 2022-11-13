import { motion } from 'framer-motion';
import { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { Spinner } from "../../../components";
import Alert from '../../../utils/alert';
import { checkDuplicateUsername, userRegistation } from '../../../utils/hepperApi';

const RegistationForm = ({ setIsLogin }) => {
    const [msgValidation, setMsgValidation] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertBox, setAlertBox] = useState("");
    const validation = () => {
        const msg = {};

        function checkPasswrod(password, confirmPassword) {
            if (password === confirmPassword) return true;

            return false;
        }

        const checkSpecialCharacters = (field) => {
            const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
            if (field.match(format)) {
                return true;
            } else {
                return false;
            }
        }

        if (checkSpecialCharacters(username)) {
            msg.username = "Tài khoản không thể chứa ký tự đặc biệt.";
        }

        if (isEmpty(name)) {
            msg.name = "Vui lòng nhập Họ Tên.";
        }

        if (isEmpty(username)) {
            msg.username = "Vui lòng nhập Username.";
        }

        if (isEmpty(password)) {
            msg.password = "Vui lòng nhập Password.";
        }

        if (!checkPasswrod(password, confirmPassword)) {
            msg.password = "Password không trùng khớp.";
        }
        setMsgValidation(msg);
        setTimeout(() => setMsgValidation(""), 1500);

        if (Object.keys(msg).length > 0) return true;

        return false;
    }

    const handleUsername = (value) => {
        const msg = {};
        setUsername(value);
        if (value !== "") {
            setLoading(true);
            checkDuplicateUsername(value).then((res) => {
                if (res.data.success) {
                    msg.username = "Tài khoản đã tồn tại.";
                    setMsgValidation(msg);
                } else {
                    setMsgValidation("");
                }
                setLoading(false);
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (msgValidation !== "") return;
        if (validation()) return;
        // handleSubmit
        userRegistation(name, username, password).then((res) => {
            if (res.data.success) {
                setAlertBox({
                    type: "success",
                    message: "Tạo tài khoản thành công"
                });
                setTimeout(() => { setAlertBox("") }, 1500);

                // initial state
                setName("");
                setUsername("");
                setPassword("");
                setConfirmPassword("");
            } else {
                setAlertBox({
                    type: "error",
                    message: "Tạo tài khoản không thành công"
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
            <h4 className="text-center text-textColor font-semibold text-xl">Đăng Ký</h4>
            <div className="w-full">
                <label htmlFor="name" className="text-md font-semibold text-textColor">Họ và Tên:</label>
                <input id="name" value={name} name="user_name" type="text" placeholder="name" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-gray-500 bg-gray-300 outline-none"
                    onChange={(e) => setName(e.target.value)}
                />
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.name ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.name}
                </p>
            </div>
            <div className="w-full relative">
                <label htmlFor="username" className="text-md font-semibold text-textColor">Tài khoản:</label>
                <input id="username" value={username} name="user_username" type="text" placeholder="Username" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-gray-500 bg-gray-300 outline-none"
                    onChange={(e) => handleUsername(e.target.value)}
                />
                {loading && (
                    <Spinner />
                )}
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.username ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.username}
                </p>
            </div>
            <div className="w-full">
                <label htmlFor="password" className="text-md font-semibold text-textColor">Mật khẩu:</label>
                <input id="password" value={password} name="user_password" type="password" placeholder="Password" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-gray-500 bg-gray-300 outline-none" autoComplete={password.toString()}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.password ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.password}
                </p>
            </div>
            <div className="w-full mb-4">
                <label htmlFor="confirm_password" className="text-md font-semibold text-textColor">Xác nhận Mật khẩu:</label>
                <input id="confirm_password" name='confirm_password' value={confirmPassword} type="password" placeholder="Confirm Password" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-gray-500 bg-gray-300 outline-none" autoComplete={confirmPassword.toString()}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="flex items-center justify-center bg-blue-400/75 text-white hover:shadow-md rounded-md px-4 py-2 text-base outline-none">
                Đăng ký
            </button>
            <p className="text-textColor text-sm"><span className="text-blue-600/40 cursor-pointer" onClick={() => setIsLogin(true)}> Trở lại đăng nhập</span></p>
        </motion.form>
    )
}

export default RegistationForm