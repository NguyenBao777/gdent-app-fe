import { useEffect, useState } from 'react'
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { BiCategoryAlt } from "react-icons/bi";
import { MdAddShoppingCart, MdPreview } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { Header, Body, Footer } from '../../../components';
import { actionType } from '../../../context/reducer';
import { useStateValue } from '../../../context/StateProvider';
import { getAllBrand, getAllCategory, getOneProduct } from '../../../utils/hepperApi';
import { numberFormat } from '../../../utils/format';
import { serverPublic } from '../../../utils/serverPublic';

const ProductDetail = () => {
    const [imgSrc, setImgSrc] = useState("");
    const [productItem, setProductItem] = useState("");
    const [filterBrand, setFilterBrand] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [context, dispatch] = useStateValue([]);
    const id = useParams();
    useEffect(() => {
        getOneProduct(id).then((res) => {
            if (res.data.success) {
                setProductItem(res.data.message);

            }
        })
    }, []);

    useEffect(() => {

        setImgSrc(`${serverPublic}images/product/${productItem?.product_image_1}`);

        getAllBrand().then((res) => {
            if (res.data.success) setFilterBrand(res.data.message.filter((brand) => (brand.id === productItem.brand_id)));
        });

        getAllCategory().then((res) => {
            if (res.data.success) setFilterCategory(res.data.message.filter((category) => (category.id === productItem.category_id)));
        })

    }, [productItem]);

    const handleAddToCart = () => {
        const exist = context.cart.find((item) => item.id === productItem.id);
        if (exist) {
            dispatch({
                type: actionType.SET_CART,
                cart: context.cart.map((item) => item.id === productItem.id ? { ...exist, qty: exist.qty + 1 } : item)
            });
        } else {
            dispatch({
                type: actionType.SET_CART,
                cart: [...context.cart, { ...productItem, qty: 1 }]
            });
        }


    }

    return (
        <div className="w-full">
            <Header />
            <Body>

                <div className="flex flex-wrap justify-center">
                    <div className="w-full md:w-1/2 p-2 flex justify-center gap-4">
                        <div className="flex flex-col items-center gap-4">
                            <img src={`${serverPublic}images/product/${productItem?.product_image_1}`} className="objec-cover h-20 w-20 border border-gray-300 cursor-pointer"
                                onClick={(e) => setImgSrc(e.target.src)} />
                            {productItem.product_image_2 && (
                                <img src={`${serverPublic}images/product/${productItem?.product_image_2}`} alt="" className="objec-cover h-20 w-20 border border-gray-300 cursor-pointer" onClick={(e) => setImgSrc(e.target.src)} />
                            )}
                            {productItem.product_image_3 && (
                                <img src={`${serverPublic}images/product/${productItem?.product_image_3}`} alt="" className="objec-cover h-20 w-20 border border-gray-300 cursor-pointer" onClick={(e) => setImgSrc(e.target.src)} />
                            )}
                        </div>
                        <div className="flex items-center justify-center h-340 w-340 border border-gray-300 drop-shadow-md">
                            <img src={imgSrc} alt="" className="object-cover w-full h-full transition-all duration-150 ease-in-out" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-2 flex flex-col gap-4">
                        <h4 className="text-textColor text-2xl uppercase font-semibold w-full border-b border-gray-500">{productItem?.product_name}</h4>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-4">
                                <BiCategoryAlt className="text-2xl text-green-300" />
                                <p className="text-sm text-green-300">{filterCategory[0]?.category_name}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <MdPreview className="text-2xl text-green-300" />
                                <p className="text-sm text-green-300">{productItem?.product_sold_qty === null ? 0 : productItem?.product_sold_qty}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center gap-4">
                            <p className="text-xl text-textColor"> {productItem?.product_listed_price == "0" ? (
                                "Liên hệ"
                            ) : (
                                numberFormat(productItem?.product_listed_price) + " VNĐ"
                            )}</p>
                            <p className="text-base text-textColor">Mã sản phẩm: <span className="font-semibold">{productItem?.product_code}</span></p>
                            <div className="flex items-center gap-4">
                                <p className="text-base text-textColor">Thương hiệu: <span className="font-semibold">{filterBrand[0]?.brand_name}</span></p>
                                <p className="text-base text-textColor">Xuất xứ: <span className="font-semibold capitalize">{productItem?.product_origin}</span></p>
                            </div>
                            <p className="text-base text-textColor">Tình trạng: {
                                productItem?.product_qty > 0 ? (
                                    <span className="text-sm px-4 py-1 bg-green-600 text-white rounded-full">Còn hàng</span>
                                ) : (
                                    <span className="text-sm px-4 py-1 bg-gray-600 text-white rounded-full">Tạm hết hàng</span>
                                )}</p>

                            <div className="p-2 rounded-sm border border-gray-300">
                                {productItem?.product_desc}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center justify-center cursor-pointer p-2 text-textColor bg-gray-300 hover:bg-gray-400 hover:shadow-md duration-150 transition-all ease-in-out rounded-full h-8 w-8"
                                onClick={handleAddToCart}>
                                <MdAddShoppingCart className="text-2xl" />
                            </button>
                            <button className="flex items-center justify-center px-4 py-1 text-white bg-green-600 rounded-md shadow-md">
                                Liên hệ
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <p className="text-textColor text-sm flex items-center">
                                <AiFillPhone className="mr-2" />
                                Tư vấn: 0938 68 38 22 | (028) 38 606 607
                            </p>
                            <p className="text-textColor text-sm flex items-center">
                                <AiOutlineMail className="mr-2" />
                                info@gdent.vn
                            </p>
                        </div>
                    </div>
                </div>
            </Body>
            <Footer />
        </div>
    )
}

export default ProductDetail