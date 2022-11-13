import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Header } from '../../../components';
import { useStateValue } from '../../../context/StateProvider';
import { deleteUserAddress, getQuanHuyen, getQuanHuyenById, getTinhThanhpho, getTinhThanhphoById, getUserAddress, getXaphuongThitran, getXaphuongThitranById, updateUser } from '../../../utils/hepperApi';
import { serverPublic } from '../../../utils/serverPublic';
import NotLogin from "../../../assets/img/NotLogin.png";
import { AiOutlineCloudUpload, AiTwotoneDelete } from 'react-icons/ai';
import { BsTrash } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import Alert from '../../../utils/alert';

const UserProfile = () => {
    const [context, dispatch] = useStateValue();
    const [showEdit, setShowEdit] = useState(false);
    const [listAddress, setListAddress] = useState([]);
    const [imageTemp, setImageTemp] = useState("");
    const [user, setUser] = useState(null);
    const [msgValidation, setMsgValidation] = useState("");
    const [userPhone, seUserPhone] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [tinhThanhpho, setTinhThanhpho] = useState([]);
    const [tinhThanhphoID, setTinhThanhphoID] = useState(null);
    const [tinhThanhphoName, setTinhThanhphoName] = useState("");
    const [quanHuyen, setQuanHuyen] = useState([]);
    const [quanHuyenID, setQuanHuyenID] = useState(null);
    const [quanHuyenName, setQuanHuyenName] = useState("");
    const [xaphuongThitran, setXaphuongThitran] = useState([]);
    const [xaphuongThitranID, setXaphuongThitranID] = useState(null);
    const [xaphuongThitranName, setXaphuongThitranName] = useState("");
    const [file, setFile] = useState(null);
    const [alertBox, setAlertBox] = useState("");
    const navigate = useNavigate();
    const validation = () => {
        const msg = {}

        const checkNull = (field) => {
            if (field === null) return true;

            return false;
        }

        if (!user.user_phone) {
            if (isEmpty(userPhone)) {
                msg.phone = "Vui lòng nhập số điện thoại.";
            }
        }
        if (!user.user_image) {
            if (isEmpty(imageTemp)) {
                msg.img = "Vui lòng thêm Ảnh cá nhân.";
            }
        }


        if (isEmpty(userAddress)) {
            msg.address = "Vui lòng nhập Địa chỉ.";
        }


        if (checkNull(tinhThanhphoID)) {
            msg.address = "Vui lòng nhập đầy đủ Địa chỉ.";
        }

        if (checkNull(quanHuyenID)) {
            msg.address = "Vui lòng nhập đầy đủ Địa chỉ.";
        }

        if (checkNull(xaphuongThitranID)) {
            msg.address = "Vui lòng nhập đầy đủ Địa chỉ.";
        }

        setMsgValidation(msg);
        setTimeout(() => setMsgValidation(""), 1500);

        if (Object.keys(msg).length > 0) return true;

        return false;
    }
    useEffect(() => {
        if (context.user) {
            setUser(context.user);
            getTinhThanhpho().then((res) => {
                setTinhThanhpho(res.data.message);
            });
            getUserAddress(context.user?.id).then((res) => {
                if (res.data.success) setListAddress(res.data.message);
            });
        } else {
            navigate("/", { replace: true });
        }
    }, []);

    useEffect(() => {
        if (tinhThanhphoID !== null) {
            getTinhThanhphoById(tinhThanhphoID).then((res) => {
                setTinhThanhphoName(res.data.message.name);
            });
        }
        getQuanHuyen(tinhThanhphoID).then((res) => {
            setQuanHuyen(res.data.message);
        });

        if (quanHuyenID !== null) {
            getQuanHuyenById(quanHuyenID).then((res) => {
                setQuanHuyenName(res.data.message.name);
            })
        }
        getXaphuongThitran(quanHuyenID).then((res) => {
            setXaphuongThitran(res.data.message);
        });

        if (xaphuongThitranID !== null) {
            getXaphuongThitranById(xaphuongThitranID).then((res) => {
                setXaphuongThitranName(res.data.message.name);
            });
        }
    }, [tinhThanhphoID, quanHuyenID, xaphuongThitranID]);

    const handleUploadImage = (e) => {
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

        setFile(e.target.files[0]);
        const imgTemp = URL.createObjectURL(e.target.files[0]);
        setImageTemp(imgTemp);

    }

    const handleDelete = (id) => {
        deleteUserAddress(id).then((res) => {
            getUserAddress(context.user?.id).then((res) => {
                if (res.data.success) setListAddress(res.data.message);
            });
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        // handleSubmit
        const formData = new FormData();
        if (file) {
            formData.append("user_image", file);
            formData.append("old_image", user.user_image);
        }
        formData.append("user_id", user.id);
        formData.append("user_phone", userPhone);
        formData.append("user_address", userAddress);
        formData.append("tinhthanhpho_id", tinhThanhphoID);
        formData.append("tinhthanhpho_name", tinhThanhphoName);
        formData.append("quanhuyen_id", quanHuyenID);
        formData.append("quanhuyen_name", quanHuyenName);
        formData.append("xaphuongthitran_id", xaphuongThitranID);
        formData.append("xaphuongthitran_name", xaphuongThitranName);
        updateUser(formData).then((res) => {
            if (res.data.success) {
                setAlertBox({
                    type: "success",
                    message: "Cập nhật tài khoản thành công"
                });
                setTimeout(() => { setAlertBox("") }, 1500)
            } else {
                setAlertBox({
                    type: "error",
                    message: "Cập nhật tài khoản không thành công"
                });
                setTimeout(() => { setAlertBox("") }, 1500)
            }
        });
    };

    return (
        <div className="w-full">
            <Header />
            {user && (
                <div className="w-full flex flex-wrap items-center justify-center gap-4 mt-24 transition-all duration-150 ease-in-out">
                    <div className="p-4 flex flex-col items-center gap-2 w-full md:w-1/3 bg-white rounded-md shadow-md transition-all duration-150 ease-in-out">
                        {alertBox !== "" && (<Alert alert={alertBox} />)}
                        <div className="relative">
                            <img className="w-16 h-16 rounded-full shadow-md"
                                src={user.user_image ? `${serverPublic}images/user/${user.user_image}` : NotLogin} alt="img" />

                            <span className="w-4 h-4 rounded-full border-2 border-white shadow-sm shadow-green-500 bg-green-600 absolute top-12 right-0"></span>
                        </div>

                        <p className="text-2xl font-semibold">{user.user_name}</p>

                        <p className="text-base text-textColor">@{user.user_username}</p>

                        <div className="flex items-center justify-center gap-2">
                            <p className="text-base text-textColor">Số điện thoại:</p>
                            <p className="text-base font-semibold">{user.user_phone ? user.user_phone : "Chưa cập nhật"}</p>
                        </div>


                        {listAddress.length > 0 && (
                            <div className="flex flex-col gap-2 items-center justify-center">
                                {listAddress.map((address, i) => (
                                    <div key={i} className="flex items-center gap-3 justify-between relative">
                                        <p>{i + 1}.</p>
                                        <p>
                                            {address?.user_address},
                                            {""}{address?.xaphuongthitran_name},
                                            {""}{address?.quanhuyen_name},
                                            {""}{address?.tinhthanhpho_name}
                                        </p>
                                        <button className="flex items-center justify-center p-2 rounded-md text-white bg-red-600"
                                            onClick={() => handleDelete(address.id)}
                                        >
                                            <BsTrash className="text-xl " />
                                        </button>

                                    </div>
                                ))}
                            </div>
                        )}

                        <button className="flex items-center justify-center px-4 py-1 text-white bg-green-600 rounded-md"
                            onClick={() => setShowEdit(!showEdit)}
                        >
                            Cập nhật hồ sơ
                        </button>

                    </div>
                    {showEdit && (
                        <div className="w-full md:w-1/2 p-2 shadow-md">
                            <motion.form className="flex flex-wrap items-center justify-between gap-4 border border-gray-500 rounded-sm bg-primary/50 p-4" encType="multipart/form-data"
                                initial={{ opacity: 0.5, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0.5, scale: 0 }}
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                <div className="w-full flex items-center justify-between gap-2">
                                    <div>

                                        <div className="border-2 border-dotted border-gray-300 bg-gray-300/50 w-40 h-40 rounded-md p-1">
                                            {imageTemp !== "" ? (
                                                <div className="w-full h-full rounded-md overflow-hidden bg-white relative">
                                                    <img src={imageTemp} className="object-cover w-full h-full" alt="" />
                                                    <span className="w-6 h-6 flex items-center justify-center rounded-full p-1 bg-red-600 absolute top-1 right-1 cursor-pointer"
                                                        onClick={() => setImageTemp("")}
                                                    >
                                                        <AiTwotoneDelete className="text-white text-2xl font-semibold" />
                                                    </span>
                                                </div>
                                            ) : (
                                                <label htmlFor="user_image" className="w-full h-full flex items-center justify-center cursor-pointer">
                                                    <AiOutlineCloudUpload className="text-3xl text-white" />
                                                </label>
                                            )}
                                            <input type="file" name="user_image" id="user_image" hidden onChange={(e) => handleUploadImage(e)} />
                                        </div>
                                        <p className="text-red-700 font-light ml-2 text-xs italic">
                                            <span className={`${msgValidation?.img ? "visible" : "invisible"}`}>* </span>
                                            {msgValidation?.img}
                                        </p>
                                    </div>

                                    <div className="w-1/2">
                                        <p className="text-2xl font-semibold">{user.user_name}</p>
                                        <p className="text-base text-textColor">@{user.user_username}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center gap-4">
                                    <div className="w-full">
                                        <label htmlFor="user_phone" className="text-md font-semibold text-textColor">Số điện thoại:</label>
                                        <input id="user_phone" value={userPhone} name="user_phone" type="text" placeholder="035x xxx xxx" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-gray-500 bg-gray-300 outline-none"
                                            onChange={(e) => seUserPhone(e.target.value)}
                                        />
                                        <p className="text-red-700 font-light ml-2 text-xs italic">
                                            <span className={`${msgValidation?.phone ? "visible" : "invisible"}`}>* </span>
                                            {msgValidation?.phone}
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="user_username" className="text-md font-semibold text-textColor">Địa chỉ:</label>
                                        <textarea id="user_username" value={userAddress} name="user_username" type="text" placeholder="User Name" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-gray-500 bg-gray-300 outline-none"
                                            onChange={(e) => setUserAddress(e.target.value)}
                                        />
                                        <p className="text-red-700 font-light ml-2 text-xs italic">
                                            <span className={`${msgValidation?.address ? "visible" : "invisible"}`}>* </span>
                                            {msgValidation?.address}
                                        </p>
                                    </div>
                                    <div className="w-full flex flex-wrap justify-between gap-2">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <label htmlFor="category_brand">Tỉnh/Thành phố:</label>
                                            <select value={tinhThanhphoID} id="category_brand" name="category_brand" className="py-2 px-4 rounded-sm bg-white outline-none cursor-pointer"
                                                onChange={(e) => { setTinhThanhphoID(e.target.value) }}
                                            >
                                                <option value="">----------</option>
                                                {tinhThanhpho && tinhThanhpho.map((option, i) => (
                                                    <option key={i} value={option.id}>{option.name}</option>
                                                ))}
                                            </select>
                                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                                <span className={`${msgValidation?.brand ? "visible" : "invisible"}`}>* </span>
                                                {msgValidation?.brand}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-center justify-evenly gap-2">
                                            <label htmlFor="category_product">Quận/Huyện:</label>
                                            <select value={quanHuyenID} id="category_product" name="category_product" disabled={tinhThanhphoID ? false : true} className="py-2 px-4 rounded-sm bg-white outline-none cursor-pointer"
                                                onChange={(e) => {
                                                    setQuanHuyenID(e.target.value);
                                                    // setQuanHuyenName(e.target.value.name);
                                                }}
                                            >
                                                <option value="">----------</option>
                                                {quanHuyen && quanHuyen.map((option, i) => (
                                                    <option key={i} value={option.id}>{option.name}</option>
                                                ))}
                                            </select>
                                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                                <span className={`${msgValidation?.category ? "visible" : "invisible"}`}>* </span>
                                                {msgValidation?.category}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-center justify-evenly gap-2">
                                            <label htmlFor="category_product">Xã phường/Thị trấn:</label>
                                            <select value={xaphuongThitranID} id="category_product" disabled={quanHuyenID ? false : true} name="category_product" className="py-2 px-4 rounded-sm bg-white outline-none cursor-pointer"
                                                onChange={(e) => {
                                                    setXaphuongThitranID(e.target.value);
                                                    // setXaphuongThitranName(e.target.value.name);
                                                }}
                                            >
                                                <option value="">----------</option>
                                                {xaphuongThitran && xaphuongThitran.map((option, i) => (
                                                    <option key={i} value={option.id}>{option.name}</option>
                                                ))}

                                            </select>
                                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                                <span className={`${msgValidation?.status ? "visible" : "invisible"}`}>* </span>
                                                {msgValidation?.status}
                                            </p>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-150 px-4 py-1 flex items-center justify-center rounded-md shadow-dm bg-green-500 hover:bg-green-600 text-white transition-all duration-150 ease-in-out">
                                        Cập nhật
                                    </button>
                                </div>
                            </motion.form>
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}

export default UserProfile