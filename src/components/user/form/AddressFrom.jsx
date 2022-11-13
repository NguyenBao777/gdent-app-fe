import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import isEmpty from 'validator/lib/isEmpty';
import { actionType } from '../../../context/reducer';
import { useStateValue } from '../../../context/StateProvider';
import { getQuanHuyen, getQuanHuyenById, getTinhThanhpho, getTinhThanhphoById, getUserAddress, getXaphuongThitran, getXaphuongThitranById } from '../../../utils/hepperApi';

const AddressFrom = ({ activeStep, setActiveStep }) => {
    const [msgValidation, setMsgValidation] = useState("");
    const [orderName, setOrderName] = useState("");
    const [orderPhone, setOrderPhone] = useState("");
    const [orderAddress, setOrderAddress] = useState("");
    const [tinhThanhpho, setTinhThanhpho] = useState([]);
    const [tinhThanhphoID, setTinhThanhphoID] = useState(null);
    const [tinhThanhphoName, setTinhThanhphoName] = useState("");
    const [quanHuyen, setQuanHuyen] = useState([]);
    const [quanHuyenID, setQuanHuyenID] = useState(null);
    const [quanHuyenName, setQuanHuyenName] = useState("");
    const [xaphuongThitran, setXaphuongThitran] = useState([]);
    const [xaphuongThitranID, setXaphuongThitranID] = useState(null);
    const [xaphuongThitranName, setXaphuongThitranName] = useState("");
    const [context, dispatch] = useStateValue();
    const [listAddress, setListAddress] = useState([]);

    const handleSelectedAddress = (address) => {
        setOrderName(context.user?.user_name);
        setOrderPhone(context.user?.user_phone);
        setOrderAddress(address?.user_address);
        setTinhThanhphoID(address?.tinhthanhpho_id);
        setQuanHuyenID(address?.quanhuyen_id);
        setXaphuongThitranID(address?.xaphuongthitran_id);
    }

    useEffect(() => {
        getTinhThanhpho().then((res) => {
            if (res.data.success) setTinhThanhpho(res.data.message);
        });
        if (context.user) {
            getUserAddress(context.user.id).then((res) => {
                if (!res.data.success) {
                    setActiveStep(1);
                } else {
                    setListAddress(res.data.message);
                }
            })
        }
    }, []);

    useEffect(() => {
        getUserAddress(context.user?.id).then((res) => {
            if (!res.data.success) {
                setActiveStep(1);
            } else {
                setListAddress(res.data.message);
            }
        })
    }, [context.user]);

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

    const validation = () => {
        const msg = {}

        const checkNull = (field) => {
            if (field === null) return true;

            return false;
        }


        if (isEmpty(orderPhone)) {
            msg.phone = "Vui lòng nhập số điện thoại.";
        }

        if (isEmpty(orderName)) {
            msg.name = "Vui lòng nhập Tên.";
        }


        if (isEmpty(orderAddress)) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        //  setActiveStep(activeStep + 1)
        dispatch({
            type: actionType.SET_INFO_ORDER,
            info_order: {
                user_id: context.user?.id || null,
                order_name: orderName,
                order_phone: orderPhone,
                order_address: orderAddress,
                tinhthanhpho_id: tinhThanhphoID,
                tinhthanhpho_name: tinhThanhphoName,
                quanhuyen_id: quanHuyenID,
                quanhuyen_name: quanHuyenName,
                xaphuongthitran_id: xaphuongThitranID,
                xaphuongthitran_name: xaphuongThitranName,
            }
        });

        setActiveStep(activeStep + 1);
    }

    return (
        <form className="w-full p-2 flex justify-center flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
        >
            {context.user && (
                <div className="flex flex-col items-center justify-center gap-2 w-full">
                    {listAddress.length > 0 && listAddress.map((address, index) => (
                        <div key={index} className="flex justify-center items-center gap-2 w-full">
                            <input type="radio" className="w-4 h-4 cursor-pointer" name="address" onClick={() => handleSelectedAddress(address)} />
                            <p className="flex-1 text-textColor">
                                {address.user_address},
                                {" "}{address.xaphuongthitran_name},
                                {" "}{address.quanhuyen_name},
                                {" "}{address.tinhthanhpho_name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            <h4 className="text-black text-2xl w-full">Shipping Address</h4>
            <div className="w-full flex justify-center flex-col gap-2">
                <label htmlFor="customer-name">Tên người nhận:</label>
                <input type="text" value={orderName} placeholder="Name*" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                    onChange={(e) => setOrderName(e.target.value)}
                />
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.name ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.name}
                </p>
            </div>
            <div className="w-full flex justify-center flex-col gap-2">
                <label htmlFor="customer-name">Số điện thoại:</label>
                <input type="text" value={orderPhone} placeholder="Phone Number*" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                    onChange={(e) => setOrderPhone(e.target.value)}
                />
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.phone ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.phone}
                </p>
            </div>
            <div className="w-full flex justify-center flex-col gap-2">
                <label htmlFor="customer-name">Địa chỉ:</label>
                <input type="text" value={orderAddress} placeholder="Địa chỉ" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                    onChange={(e) => setOrderAddress(e.target.value)}
                />
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.address ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.address}
                </p>
            </div>
            <div className="w-full flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-col items-center justify-center gap-2">
                    <label htmlFor="customer-name">Tỉnh/ Thành phố:</label>
                    <select value={tinhThanhphoID} className="py-2 px-4 rounded-sm bg-white outline-none"
                        onChange={(e) => setTinhThanhphoID(e.target.value)}
                    >
                        <option value="">----------</option>
                        {tinhThanhpho.length > 0 && tinhThanhpho.map((option, i) => (
                            <option value={option.id} key={i}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col items-center justify-evenly gap-2">
                    <label htmlFor="customer-name">Quận/ Huyện:</label>
                    <select value={quanHuyenID} className="py-2 px-4 rounded-sm bg-white outline-none"
                        disabled={tinhThanhphoID ? false : true}
                        onChange={(e) => setQuanHuyenID(e.target.value)}
                    >
                        <option value="">----------</option>
                        {quanHuyen.length > 0 && quanHuyen.map((option, i) => (
                            <option value={option.id} key={i}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col items-center justify-evenly gap-2">
                    <label htmlFor="customer-name">Xã phường/ Thị trấn:</label>
                    <select value={xaphuongThitranID} className="py-2 px-4 rounded-sm bg-white outline-none"
                        disabled={quanHuyenID ? false : true}
                        onChange={(e) => setXaphuongThitranID(e.target.value)}
                    >
                        <option value="">----------</option>
                        {xaphuongThitran.length > 0 && xaphuongThitran.map((option, i) => (
                            <option value={option.id} key={i}>{option.name}</option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="w-full flex justify-between items-center">
                <NavLink to="/cart" className="flex items-center justify-center rounded-md bg-white border border-gray-500 shadow-sm px-4 py-1 uppercase">
                    Back to cart
                </NavLink>

                <button type="submit" className="flex items-center justify-center rounded-md bg-blue-800 shadow-sm text-white px-4 py-1 uppercase">
                    Next
                </button>
            </div>
        </form>
    )
}

export default AddressFrom