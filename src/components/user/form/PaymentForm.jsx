import { useState } from 'react';
import { useStateValue } from '../../../context/StateProvider';
import { serverPublic } from '../../../utils/serverPublic';
import { addNewOrder } from '../../../utils/hepperApi';
import { Modal } from '../../../components';
import { actionType } from '../../../context/reducer';
import { numberFormat } from '../../../utils/format';


const PaymentItem = ({ data }) => {

    return (
        <div className="w-full flex justify-evenly items-center gap-4 rounded-md hover:bg-white transition-all duration-150 ease-in-out p-2">
            <img className="w-8 h-8 object-cover" src={`${serverPublic}images/product/${data.product_image_1}`} alt="" />
            <div className="flex flex-1 flex-col justify-center">
                <p className="text-textColor font-semibold">{data.product_name}</p>
                <p className="text-textColor text-sm">Số lượng: x{data.qty}</p>
            </div>
            <p className="text-textColor font-semibold text-md">{numberFormat(data.product_listed_price * data.qty)} VNĐ</p>
        </div>
    )
}

const PaymentForm = ({ activeStep, setActiveStep }) => {
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [context, dispatch] = useStateValue();
    const [success, setSuccess] = useState(false);
    const [modal, setModal] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        const order = {
            "user_id": context.user?.id || null,
            "order_name": context.info_order.order_name,
            "order_phone": context.info_order.order_phone,
            "order_address": context.info_order.order_address,
            "tinhthanhpho_id": context.info_order.tinhthanhpho_id,
            "tinhthanhpho_name": context.info_order.tinhthanhpho_name,
            "quanhuyen_id": context.info_order.quanhuyen_id,
            "quanhuyen_name": context.info_order.quanhuyen_name,
            "xaphuongthitran_id": context.info_order.xaphuongthitran_id,
            "xaphuongthitran_name": context.info_order.xaphuongthitran_name,
            "order_total": context.cart.reduce((total, currentValue) => {

                return total + (currentValue.product_listed_price * currentValue.qty);
            }, 0),

            "payment_method": paymentMethod,
            "cart": context.cart

        }

        addNewOrder(order).then((res) => {
            if (res.data.success) {
                dispatch({
                    type: actionType.SET_CART,
                    cart: []
                });
                setModal("success");
            } else {
                setModal("error");
            }
        });
    }


    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    }

    return (
        <form className="w-full p-2 flex justify-center flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
            {modal !== "" && (
                <Modal type={modal} setModal={setModal} />
            )}
            <h4 className="text-black text-2xl w-full">Order Sumary</h4>
            <div className="w-full flex max-h-420 overflow-y-auto items-center flex-col gap-3">
                {context.cart.length > 0 && context.cart.map((item, i) => (
                    <PaymentItem data={item} key={i} />
                ))}
            </div>
            <div className="w-full flex items-center justify-between mt-4 boder-b-2 border-gray-500">
                <p className="text-textColor font-semibold">Total</p>
                <p className="text-textColor">{numberFormat(context.cart.reduce((total, currentValue) => {

                    return total + (currentValue.product_listed_price * currentValue.qty);
                }, 0))} VNĐ</p>
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="flex justify-center items-center gap-2">
                    <input type="radio" className="w-4 h-4 cursor-pointer" defaultChecked value="COD" name="payment-method" onSelect={(e) => handlePaymentMethod(e)} />
                    <p className="text-textColor">COD</p>
                </div>
                {/* <div className="flex justify-center items-center gap-2">
                    <input type="radio" className="w-4 h-4 cursor-pointer" value="credit-card" name="payment-method" onSelect={(e) => handlePaymentMethod(e)} />
                    <p className="text-textColor">Thẻ tín dụng</p>
                </div> */}
            </div>
            {paymentMethod === "credit-card" && !success && (
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="w-full flex items-center gap-4">
                        <div className="flex flex-1 justify-center flex-col gap-2">
                            <label htmlFor="customer-name">Tên chủ thẻ:</label>
                            <input type="text" placeholder="Card Hoilder Name" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out required:border-red-500" />
                        </div>
                        <div className="w-150 flex justify-center flex-col gap-2">
                            <label htmlFor="customer-name">Ngày hết hạn:</label>
                            <input type="password" placeholder="** / **" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out required:border-red-500" />
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-4">
                        <div className="flex flex-1 justify-center flex-col gap-2">
                            <label htmlFor="customer-name">Số thẻ:</label>
                            <input type="text" placeholder="Card Number" required className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out required:border-red-500" />
                        </div>
                        <div className="w-150 flex justify-center flex-col gap-2">
                            <label htmlFor="customer-name">CVC:</label>
                            <input type="password" placeholder="Security Code" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out required:border-red-500" />
                        </div>
                    </div>

                </div>
            )}
            <div className="w-full flex justify-between items-center">
                <button className="flex items-center justify-center rounded-md bg-white border border-gray-500 shadow-sm px-4 py-1 uppercase" onClick={() => setActiveStep(activeStep - 1)}>
                    Back
                </button>

                <button type="submit" className="flex items-center justify-center rounded-md bg-blue-800 shadow-sm text-white px-4 py-1 uppercase">
                    Thanh toán
                </button>
            </div>
        </form>
    )
}

export default PaymentForm