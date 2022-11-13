import { Header, Footer, Body } from "../../index";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../context/StateProvider";
import { serverPublic } from "../../../utils/serverPublic";
import { actionType } from "../../../context/reducer";
import { motion } from "framer-motion";
import { numberFormat } from "../../../utils/format";

const CartItem = ({ data }) => {
    const [context, dispatch] = useStateValue();

    const handleQty = (action) => {
        if (action === "increase") {
            dispatch({
                type: actionType.SET_CART,
                cart: context.cart.map((item) => item.id === data.id ? { ...item, qty: item.qty == 99 ? item.qty : item.qty + 1 } : item)
            });
        } else {
            dispatch({
                type: actionType.SET_CART,
                cart: context.cart.map((item) => item.id === data.id ? { ...item, qty: item.qty == 1 ? item.qty : item.qty - 1 } : item)
            });
        }
    }

    const removeCart = () => {
        dispatch({
            type: actionType.SET_CART,
            cart: context.cart.filter((item) => (item.id !== data.id))
        });
    }

    return (
        <motion.div className="px-2 py-4 border border-gray-200 flex flex-col items-center justify-center gap-6 rounded-md hover:drop-shadow-md bg-white transition-all duration-150 ease-in-out w-350"
            initial={{ opacity: 0.2, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.2, y: -500 }}
        >
            <img src={`${serverPublic}images/product/${data.product_image_1}`} alt="" className="w-full h-150 object-cover drop-shadow-md" />
            <div className="flex items-center justify-between gap-4 w-full">
                <p className="flex-1 text-md text-textColor">{data.product_name}</p>
                <p className="text-base text-gray-500 font-semibol">{numberFormat(data.product_listed_price)} VNĐ</p>
            </div>
            <div className="flex items-center gap-4 w-full">
                <div className="flex justify-center items-center gap-1">
                    <button className="flex items-center justify-center p-2 w-6 h-6 rounded-md hover:bg-gray-300 transition-all duration-150 ease-in-out"
                        onClick={() => handleQty("decrease")}
                    >
                        <AiOutlineMinus className=" text-md" />
                    </button>
                    <p className="flex items-center text-sm text-textColor justify-center p-1 w-8 h-8">{data.qty}</p>
                    <button className="flex items-center justify-center p-2 w-6 h-6 rounded-md hover:bg-gray-300 transition-all duration-150 ease-in-out"
                        onClick={() => handleQty("increase")}
                    >
                        <AiOutlinePlus className=" text-md" />
                    </button>
                </div>
                <button className="flex items-center justify-center cursor-pointer text-white bg-red-500 rounded-md px-6 py-1 hover:bgg-red-300 hover:shadow-md transiton-all duration-150 ease-in-out uppercase"
                    onClick={removeCart}
                >
                    Remove
                </button>
            </div>
        </motion.div>
    )
}

const Cart = () => {
    const [context, dispatch] = useStateValue([]);

    const emptyCart = () => {
        dispatch({
            type: actionType.SET_CART,
            cart: []
        });
    }

    return (
        <div className="w-full h-full">
            <Header />
            <Body className="bg-primary">
                <div className="w-full flex flex-wrap items-center justify-center xl:justify-stretch gap-4 h-600 overflow-y-auto">
                    {context.cart.length <= 0 ? (
                        <div className="w-full flex flex-col items-center fustify-center gap-6 p-4">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="" className="w-[350px] object-cover" />
                            <div className="text-2xl text-textColor">Giỏ hàng đang trống</div>
                        </div>
                    ) : (

                        context.cart && context.cart.map((cartItem, index) => (
                            <CartItem data={cartItem} key={index} />
                        ))
                    )}
                </div>
                <div className="flex items-center my-4 border-t-2 border-gray-300 justify-between p-4 flex-wrap gap-4 md:gap-0">
                    <p className="text-xl text-textColor w-1/2">
                        Subtotal: {numberFormat(context.cart.reduce((total, item) => {

                            return total + (item.qty * item.product_listed_price)
                        }, 0))}  VNĐ
                    </p>
                    <div className="flex justify-between items-center w-full md:w-1/2">
                        <button className="flex items-center justify-center cursor-pointer text-white bg-red-500 rounded-md px-6 py-1 hover:bgg-red-300 hover:shadow-md transiton-all duration-150 ease-in-out uppercase"
                            onClick={emptyCart}
                        >
                            Empty Cart
                        </button>
                        <Link to="/checkout" className={`flex items-center justify-center cursor-pointer text-white  rounded-md px-6 py-1 hover:bgg-red-300 hover:shadow-md transiton-all duration-150 ease-in-out uppercase ${context.cart.length > 0 ? "bg-blue-500" : "pointer-events-none bg-gray-500"}`}>
                            Checkout
                        </Link>
                    </div>

                </div>
            </Body>
            <Footer />
        </div>
    )
}

export default Cart