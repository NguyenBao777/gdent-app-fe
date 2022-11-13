import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { MdAddShoppingCart } from "react-icons/md";
import { useEffect, useState } from 'react';
import { getHotProduct } from '../../../utils/hepperApi';
import { serverPublic } from '../../../utils/serverPublic';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from '../../../context/reducer';
import { numberFormat } from '../../../utils/format';

export const ProductItem = ({ data }) => {
    const [context, dispatch] = useStateValue([]);

    const handleAddToCart = () => {
        const exist = context.cart.find((item) => item.id === data.id);
        if (exist) {
            dispatch({
                type: actionType.SET_CART,
                cart: context.cart.map((item) => item.id === data.id ? { ...exist, qty: exist.qty < exist.product_qty ? exist.qty + 1 : exist.qty } : item)
            });
        } else {
            dispatch({
                type: actionType.SET_CART,
                cart: [...context.cart, { ...data, qty: 1 }]
            });
        }


    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-primary transition-all duration-200 ease-in-out">
            <img className="w-full object-cover" src={`${serverPublic}images/product/${data.product_image_1}`} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{data.product_name.length > 20 ? data.product_name.slice(0, 18) + "..." : data.product_name}</div>
                <p className="text-gray-700 text-base">
                    {data.product_listed_price === "0" ? (
                        "Liên hệ"
                    ) : (
                        numberFormat(data.product_listed_price) + " VNĐ"
                    )}
                </p>
                <p className="text-gray-700 text-base">
                    {data.product_desc.length > 60 ? data.product_desc.slice(0, 60) + "..." : data.product_desc}
                </p>
                <div className="flex items-center justify-between gap-4 mt-2">
                    <Link to={`/productdetail/${data.id}`} className="flex items-center justify-center cursor-pointer rounded-md px-4 py-2 text-white bg-green-500 hover:bg-green-600 hover:shadow-md transition-all duration-150">
                        Xem chi tiết
                    </Link>
                    {data?.product_qty > 0 && (
                        <button className="flex items-center justify-center cursor-pointer p-2 text-textColor bg-gray-300 hover:bg-gray-400 hover:shadow-md duration-150 transition-all ease-in-out rounded-full h-8 w-8"
                            disabled={data.product_qty <= 0 ? true : false}
                            onClick={handleAddToCart}>
                            <MdAddShoppingCart className="text-2xl" />
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
}

const ProductContainer = () => {
    const options = {
        margin: 10,
        autoWidth: true,
        center: true,
        loop: true,
        responsiveClass: true,
        nav: false,
        dots: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 2,
            },
            1000: {
                items: 4,

            }
        }
    }
    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        getHotProduct().then((res) => {
            if (res.data.success) {
                setListProduct(res.data.message);
            }
        });
    }, [])

    return (

        <OwlCarousel {...options} className="flex items-center justify-center">
            {listProduct.length > 0 && listProduct.map((product, index) => (
                <ProductItem data={product} key={index} />
            ))}

        </OwlCarousel>
    )
}

export default ProductContainer
