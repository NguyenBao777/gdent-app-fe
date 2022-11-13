import { Link, NavLink } from "react-router-dom";
import { AdminHeader, Pagination, Footer } from "../../../../components";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getAllBrand, deleteBrand } from "../../../../utils/hepperApi";
import { serverPublic } from "../../../../utils/serverPublic";
import { useStateValue } from "../../../../context/StateProvider";

const BrandTableItem = ({ data, id, setListBrand }) => {

    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [context, dispatch] = useStateValue();


    const handleDelete = (e, id, filename) => {
        e.stopPropagation();
        deleteBrand(id, filename).then((data) => {
            setShowAlertDelete(false);
            getAllBrand().then((res) => {
                setListBrand(res.data.message);
            });
        });
    }

    return (
        <tr className="border-b border-gray-200 dark:border-gray-700" key={id}>
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {data.id}
            </th>
            <td className="py-4 px-6 text-center">
                <img src={`${serverPublic}images/brand/${data.brand_image}`} alt="" className="object-cover w-275 h-150 m-auto" />
            </td>
            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                {data.brand_name}
            </td>
            <td className="py-4 px-6 text-center">
                {data.brand_desc}
            </td>
            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                {data.brand_status === 1 ? (
                    <span className="py-1 px-2 text-xs cursor-pointer text-white bg-green-600 rounded-full">
                        Hiển thị
                    </span>

                ) : (
                    <span className="py-1 px-2 text-xs cursor-pointer text-white bg-gray-600 rounded-full">
                        Đã ẩn
                    </span>
                )}
            </td>

            <td className="py-4 px-6 text-center">
                {context.admin?.admin_role === "admin" && (
                    <div className="relative w-full flex flex-col gap-4 items-center justify-center">
                        <Link to={{ pathname: `editBrand/${data.id}` }} className="flex items-center justify-center w-[60px] bg-green-600 px-4 py-1 rounded-md mb-2 shadow-md">
                            <AiOutlineEdit className="text-2xl text-white" />
                        </Link>
                        <button className="flex items-center justify-center w-[60px] bg-red-600 px-4 py-1 rounded-md shadow-md" onClick={(e) => setShowAlertDelete(true)}>
                            <AiOutlineDelete className="text-2xl text-white" />
                        </button>
                        {showAlertDelete && (
                            <div className="absolute z-30 top-24 left-0 translate-x-[-50%] w-225 rounded-md bg-white shadow-md px-4 py-2">
                                <p className="text-sm">Are you sure want <span className="tex-red-600 font-semibold"> delete this Brand </span>?</p>
                                <div className="flex items-center justify-center gap-6 mt-2">
                                    <button className="flex item-center justify-center border-none outline-none bg-green-600 text-white text-xs rounded-full px-4 py-1"
                                        onClick={(e) => handleDelete(e, data.id, data.brand_image)}
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
const ListBrand = () => {
    const [listBrand, setListBrand] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [context, dispatch] = useStateValue();
    // get currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = listBrand.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        getAllBrand().then((res) => {
            setListBrand(res.data.message);
        });
    }, []);



    return (
        <div className="w-screen">
            <AdminHeader />
            <div className="w-full flex flex-col items-center justify-center gap-4 mt-20">
                <div className="w-full flex items-center justify-center gap-4">
                    {context.admin?.admin_role === "admin" && (
                        <NavLink to="addBrand" className="w-9 h-9 p-2 flex items-center justify-center border border-gray-500 rounded-sm hover:shadow-md duration-150 transition-all ease-in-out bg-primary">
                            <AiOutlinePlus className="text-2xl" />
                        </NavLink>
                    )}
                    {/* <AdminSearch /> */}
                    <h4 className="text-3xl text-orange-600 font-semibold p-4 text-center">Danh sách Thương Hiệu</h4>
                </div>


                <div className="w-full overflow-auto h-420 relative shadow-md sm:rounded-sm">
                    <table className="w-[1600px] text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    #
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Hình ảnh
                                </th>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    Tên Danh Mục
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Mô tả Danh Mục
                                </th>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    Tình trạng
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItem?.length > 0 && currentItem.map((item, index) => (
                                <BrandTableItem data={item} key={index} />
                            ))}

                        </tbody>
                    </table>
                </div>
                <Pagination itemsPerPage={itemsPerPage} totalPages={listBrand.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <Footer />
            </div>
        </div>
    )
}

export default ListBrand