import { useEffect, useState } from "react";
import { Spinner } from "../../../components";
import { AiOutlineCloudUpload, AiFillDelete } from "react-icons/ai";
import { adminRegister, checkDuplicateAdmin } from "../../../utils/hepperApi";
import BgImg from "../../../assets/img/bg-img/login-bg.png";
import Alert from "../../../utils/alert";
import isEmpty from "validator/lib/isEmpty";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../context/StateProvider";


const AdminRegister = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [alertBox, setAlertBox] = useState("");
    const [msgValidation, setMsgValidation] = useState("");
    const [uploadImg, setUploadImg] = useState("");
    const [file, setFile] = useState(null);
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [context, dispatch] = useStateValue();
    const navigate = useNavigate();

    useEffect(() => {
        if (!context.admin) navigate("/dashboard/login", { replace: true });
    }, []);

    const validation = () => {
        const msg = {}

        const isConfirmPassword = (password, confirm_password) => {
            if (password !== confirm_password) return true;

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
            msg.name = "Vui lòng điền Tên";
        }

        if (isEmpty(phone)) {
            msg.phone = "Vui lòng điền số điện thoại";
        }

        if (isEmpty(username)) {
            msg.username = "Vui lòng điền Username";
        }

        if (isEmpty(password)) {
            msg.password = "Vui lòng điền Password";
        }

        if (isConfirmPassword(password, confirmPassword)) {
            msg.password = "Mật khẩu không trùng khớp";
        }

        if (isEmpty(uploadImg)) {
            msg.img = "Vui lòng thêm một ảnh";
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
            checkDuplicateAdmin(value).then((res) => {
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


    const handleRegister = async (e) => {
        e.preventDefault();
        if (msgValidation !== "") return;
        if (validation()) return;
        // Register
        const formData = new FormData();
        formData.append("admin_profile", file);
        formData.append("admin_name", name);
        formData.append("admin_phone", phone);
        formData.append("admin_username", username);
        formData.append("admin_password", password);
        formData.append("admin_role", "shipper");
        adminRegister(formData).then((res) => {
            if (res.data.success) {
                setAlertBox({
                    type: "success",
                    message: "Đăng ký tài khoản thành công"
                })
                setTimeout(() => setAlertBox(""), 1500);
                // success

                setName("");
                setPhone("");
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                setUploadImg("");
            } else {
                setAlertBox({
                    type: "error",
                    message: "Đăng ký tài khoản không thành công"
                })
                setTimeout(() => setAlertBox(""), 1500);
            }


        });
    }

    const handleUploadImg = (e) => {
        const msg = {};
        const typeOfFile = () => {
            const type = e.target.files[0].type;
            if (type === "image/png" || type === "image/jpeg" || type === "image/gif") return true;
            return false;
        }

        if (!typeOfFile()) {
            msg.img = "Chỉ chấp nhận file png/jpeg/gif";
            setMsgValidation(msg);
            setTimeout(() => setMsgValidation(""), 1000);
        }

        if (Object.keys(msg).length > 0) return true;

        // 
        setLoader(true);
        setFile(e.target.files[0]);
        setUploadImg(URL.createObjectURL(e.target.files[0]))

        setLoader(false);
    }


    return (
        <div className="w-full h-full bg-black relative">
            <img src={BgImg} className="w-full h-full object-cover" />
            <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center bg-cardOverlay ">
                {alertBox !== "" && (<Alert alert={alertBox} />)}
                <section className="w-3/4 h-full">
                    <div className="container px-6 py-4 h-full">
                        <form className="flex justify-center items-center flex-wrap h-full text-gray-800" encType="multipart/form-data" onSubmit={(e) => handleRegister(e)}>
                            <div className="w-full md:w-1/3 p-2 flex flex-col items-start md:items-end justify-center">
                                <div className="relative w-[80px] md:w-[150px] h-[80px] md:h-[150px] bg-primary  border-2 border-dotted border-gray-500">
                                    {uploadImg !== "" && (
                                        <div className="absolute z-10 top-0 left-0 w-full h-full bg-white flex items-center justify-center">
                                            {loader ? (

                                                <Spinner />
                                            ) : (
                                                <>
                                                    <span className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white cursor-pointer" onClick={() => setUploadImg("")}>
                                                        <AiFillDelete className="text-base" />
                                                    </span>
                                                    <img src={uploadImg} alt="" className="object-corver w-full h-full" />
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <label htmlFor="upload-img" className="flex items-center justify-center w-full h-full cursor-pointer">
                                        <AiOutlineCloudUpload className="text-3xl" />
                                        <input type="file" name="admin_profile" id="upload-img" hidden onChange={(e) => handleUploadImg(e)} />
                                    </label>
                                </div>
                                <p className="text-red-700 font-light ml-2 text-xs italic">
                                    <span className={`${msgValidation?.img ? "visible" : "invisible"}`}>* </span>
                                    {msgValidation?.img}
                                </p>

                            </div>
                            <div className="w-full md:w-2/3 flex justify-end">
                                <div className="w-full bg-primary px-4 py-2 rounded-sm">
                                    <h4 className="text-center text-textColor text-lg font-semibold mb-4">Đăng Ký</h4>

                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-transparent focus-within:bg-white focus-within:shadow-md bg-clip-padding border-b border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Name"
                                            name="admin_name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <p className="text-red-700 font-light ml-2 text-xs italic">
                                            <span className={`${msgValidation?.name ? "visible" : "invisible"}`}>* </span>
                                            {msgValidation?.name}
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-transparent focus-within:bg-white focus-within:shadow-md bg-clip-padding border-b border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Phone number"
                                            name="admin_phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <p className="text-red-700 font-light ml-2 text-xs italic">
                                            <span className={`${msgValidation?.phone ? "visible" : "invisible"}`}>* </span>
                                            {msgValidation?.phone}
                                        </p>
                                    </div>

                                    {/* <!-- Email input --> */}
                                    <div className="mb-6 relative">
                                        <input
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-transparent focus-within:bg-white focus-within:shadow-md bg-clip-padding border-b border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Username"
                                            name="admin_username"
                                            value={username}
                                            onChange={(e) => handleUsername(e.target.value)}
                                        />
                                        {loading && (<Spinner y={3} />)}
                                        <p className="text-red-700 font-light ml-2 text-xs italic">
                                            <span className={`${msgValidation?.username ? "visible" : "invisible"}`}>* </span>
                                            {msgValidation?.username}
                                        </p>
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="flex flex-wrap items-center justify-between">

                                        <div className="w-1/2 pr-1">
                                            <input
                                                type="password"
                                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-transparent focus-within:bg-white focus-within:shadow-md bg-clip-padding border-b border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                placeholder="Password"
                                                name="admin_password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />

                                        </div>

                                        <div className="w-1/2 pl-1">
                                            <input
                                                type="password"
                                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-transparent focus-within:bg-white focus-within:shadow-md bg-clip-padding border-b border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                placeholder="Confrim password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                        <p className="mb-6 text-red-700 font-light ml-2 text-xs w-full italic">
                                            <span className={`${msgValidation?.password ? "visible" : "invisible"}`}>* </span>
                                            {msgValidation?.password}
                                        </p>
                                    </div>

                                    {/* <div className="flex justify-between items-center mb-6">

                                        <Link to="/register" className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">
                                            Forgot password?
                                        </Link>
                                    </div> */}


                                    <button
                                        type="submit"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >
                                        Đăng ký
                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AdminRegister