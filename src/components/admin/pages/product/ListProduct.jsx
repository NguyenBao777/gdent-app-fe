import { Link, NavLink } from "react-router-dom";
import { AdminSearch, AdminHeader, Pagination, Footer } from "../../../../components";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { deleteProduct, getAllProduct, getOneBrand, getOneCategory } from "../../../../utils/hepperApi";
import { serverPublic } from "../../../../utils/serverPublic";
import { numberFormat } from "../../../../utils/format";
import { useStateValue } from "../../../../context/StateProvider";

const ProductTableItem = ({ data, index, setListProduct }) => {

    const [productCategory, setProudctCategory] = useState("");
    const [productBrand, setProudctBrand] = useState("");
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [context, dispatch] = useStateValue();


    useEffect(() => {
        getOneCategory(data.category_id).then((res) => {
            setProudctCategory(res.data.message);
        });

        getOneBrand(data.brand_id).then((res) => {
            setProudctBrand(res.data.message);
        });
    }, []);

    const handleDelete = (e, id, filesname) => {
        const oldImages = filesname.filter((image) => (image !== null && image !== undefined));
        deleteProduct(id, oldImages).then((res) => {
            setShowAlertDelete(false);
            getAllProduct("admin").then((res) => {
                if (res.data.success) setListProduct(res.data.message);
            })
        });

    }

    return (
        <tr className="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {index}
            </th>
            <td className="py-4 px-6">
                <div className="w-full h-full flex items-center gap-2">
                    <img src={`${serverPublic}images/product/${data?.product_image_1}`} alt="" className="object-cover w-16 h-10" />
                    {data?.product_image_2 && (
                        <img src={`${serverPublic}images/product/${data?.product_image_2}`} alt="" className="object-cover w-16 h-10" />
                    )}
                    {data?.product_image_3 && (
                        <img src={`${serverPublic}images/product/${data?.product_image_3}`} alt="" className="object-cover w-16 h-10" />
                    )}
                </div>
            </td>
            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                {data?.product_name}
            </td>
            <td className="py-4 px-6">
                {data?.product_qty}
            </td>
            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                {numberFormat(data?.product_listed_price)} VNĐ
            </td>
            <td className="py-4 px-6 text-center">
                {data.product_status == 1 ? (
                    <span className="py-1 px-2 text-xs cursor-pointer text-white bg-green-600 rounded-full">
                        Hiển thị
                    </span>

                ) : (
                    <span className="py-1 px-2 text-xs cursor-pointer text-white bg-gray-600 rounded-full">
                        Đã ẩn
                    </span>
                )}
            </td>
            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                {productCategory?.category_name}
            </td>
            <td className="py-4 px-6">
                {productBrand?.brand_name}
            </td>
            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center relative">
                {context.admin?.admin_role === "admin" && (
                    <div className="flex flex-col items-center justify-center gap-4 w-full">
                        <Link to={{ pathname: `editproduct/${data.id}` }} className="flex items-center justify-center bg-green-600 px-4 py-1 rounded-md mb-2 w-[60px]">
                            <AiOutlineEdit className="text-2xl text-white" />
                        </Link>
                        <button className="flex items-center justify-center bg-red-600 px-4 py-1 rounded-md w-[60px] relative"
                            onClick={() => setShowAlertDelete(true)}
                        >
                            <AiOutlineDelete className="text-2xl text-white" />
                        </button>
                        {showAlertDelete && (
                            <div className="absolute z-20 top-24 left-0 translate-x-[-50%] w-225 rounded-md bg-white shadow-md px-4 py-2">
                                <p className="text-sm">Are you sure want <span className="tex-red-600 font-semibold"> delete this category </span>?</p>
                                <div className="flex items-center justify-center gap-6 mt-2">
                                    <button className="flex item-center justify-center border-none outline-none bg-green-600 text-white text-xs rounded-full px-4 py-1"
                                        onClick={(e) => handleDelete(e, data.id, [data.product_image_1, data?.product_image_2, data?.product_image_3])}
                                    >
                                        yes
                                    </button>
                                    <button className="flex item-center justify-center border-none outline-none bg-gray-600 text-white text-xs rounded-full px-4 py-1"
                                        onClick={() => setShowAlertDelete(false)}
                                    >
                                        no
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </td>
        </tr>
    )
}

const ListProduct = () => {
    const [listProduct, setListProduct] = useState([]);
    const [context, dispatch] = useStateValue();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    // get currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = listProduct.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        getAllProduct("admin").then((res) => {
            if (res.data.success) {
                setListProduct(res.data.message);
            }
        })
    }, []);

    return (
        <div className="w-screen">
            <AdminHeader />
            <div className="w-full flex flex-col items-center justify-center gap-4 mt-20">
                <div className="w-full flex items-center justify-center gap-4">
                    {context.admin?.admin_role === "admin" && (
                        <NavLink to="addproduct" className="w-9 h-9 p-2 flex items-center justify-center border border-gray-500 rounded-sm hover:shadow-md duration-150 transition-all ease-in-out bg-primary">
                            <AiOutlinePlus className="text-2xl" />
                        </NavLink>
                    )}
                    {/* <AdminSearch /> */}
                    <h4 className="text-3xl text-orange-600 font-semibold p-4 text-center">Danh sách Sản Phẩm</h4>
                </div>
                <div className="w-full overflow-auto relative shadow-md sm:rounded-sm">
                    <table className="w-[1400px] h-420 xl:w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    #
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Hình ảnh
                                </th>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    Tên sản phẩm
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Số lượng
                                </th>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    Giá bán
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Tình trạng
                                </th>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    Danh mục
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Thương hiệu
                                </th>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItem?.length > 0 && currentItem.map((product, index) => (
                                <ProductTableItem key={index} index={index} data={product} setListProduct={setListProduct} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination itemsPerPage={itemsPerPage} totalPages={listProduct.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <Footer />
            </div>
        </div>
    )
}

export default ListProduct