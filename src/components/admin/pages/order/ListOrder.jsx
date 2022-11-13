import { Link, NavLink } from "react-router-dom";
import { AdminSearch, AdminHeader, Pagination, Footer } from "../../../../components";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineFolderView } from "react-icons/ai";
import { useEffect, useState } from "react";
// import { getAllOrder, deleteOrder } from "../../../../utils/hepperApi";
import { serverPublic } from "../../../../utils/serverPublic";
import { useStateValue } from "../../../../context/StateProvider";
import { actionType } from "../../../../context/reducer";
import { deleteOrder, getAllOrder } from "../../../../utils/hepperApi";

const OrderTableItem = ({ data, id, setListOrder }) => {

    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [context, dispatch] = useStateValue();

    const handleShowDeleteItem = (e) => {
        e.stopPropagation();
        setShowAlertDelete(false);
    }

    const handleDelete = (e, order_code) => {
        e.stopPropagation();
        deleteOrder(order_code).then((res) => {
            setShowAlertDelete(false);
            getAllOrder().then((res) => {
                setListOrder(res.data.message);
            });
        });
    }

    return (
        <tr className="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {data.id}
            </th>
            <td className="py-4 px-6 text-center">
                {data.order_code}
            </td>
            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                {data.order_name}
            </td>
            <td className="py-4 px-6 text-center">
                {data.order_phone}
            </td>
            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                {data.order_address},
                {" "}{data.xaphuongthitran_name},
                {" "}{data.quanhuyen_name},
                {" "}{data.tinhthanhpho_name}
            </td>
            <td className="py-4 px-6 text-center">
                {data.order_total} VNĐ
            </td>
            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                {data.order_status === 1 && (
                    <span className="py-1 px-2 text-xs cursor-pointer text-white bg-green-600 rounded-full">
                        Đơn hàng mới
                    </span>

                )}
                {data.order_status === 0 && (
                    <span className="py-1 px-2 text-xs cursor-pointer text-white bg-gray-600 rounded-full">
                        Đã giao hàng
                    </span>
                )}
                {data.order_status === 2 && (
                    <span className="py-1 px-2 text-xs cursor-pointer text-white bg-orange-600 rounded-full">
                        Hẹn giao lại
                    </span>
                )}
            </td>

            <td className="py-4 px-6 text-center">
                <Link to={{ pathname: `orderdetail/${data.order_code}` }} className="flex items-center justify-center w-[60px] px-4 py-1 rounded-md mb-2 shadow-md bg-green-600">
                    <AiOutlineFolderView className="text-2xl text-white" />
                </Link>
                {context.admin?.admin_role === "admin" && (
                    <>

                        {/* <Link to={{ pathname: `editOrder/${data.id}` }} className={`flex items-center justify-center w-[60px] px-4 py-1 rounded-md mb-2 shadow-md ${data.order_status === 0 ? "pointer-events-none bg-gray-600" : "bg-green-600"}`}>
                            <AiOutlineEdit className="text-2xl text-white" />
                        </Link> */}
                        <button className="flex items-center justify-center w-[60px] bg-red-600 px-4 py-1 rounded-md relative shadow-md" onClick={(e) => setShowAlertDelete(true)}>
                            <AiOutlineDelete className="text-2xl text-white" />
                            {showAlertDelete && (
                                <div className="absolute top-8 left-0 translate-x-[-50%] w-225 rounded-md bg-white shadow-md px-4 py-2">
                                    <p className="text-sm">Are you sure want <span className="tex-red-600 font-semibold"> delete this Order </span>?</p>
                                    <div className="flex items-center justify-center gap-6 mt-2">
                                        <button className="flex item-center justify-center border-none outline-none bg-green-600 text-white text-xs rounded-full px-4 py-1"
                                            onClick={(e) => handleDelete(e, data.order_code)}
                                        >
                                            yes
                                        </button>
                                        <button className="flex item-center justify-center border-none outline-none bg-gray-600 text-white text-xs rounded-full px-4 py-1"
                                            onClick={(e) => handleShowDeleteItem(e)}
                                        >
                                            no
                                        </button>
                                    </div>
                                </div>
                            )}
                        </button>
                    </>

                )}
            </td>
        </tr>
    )
}


const ListOrder = () => {
    const [listOrder, setListOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    // get currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = listOrder.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        getAllOrder().then((res) => {
            setListOrder(res.data.message);
        });

    }, []);



    return (
        <div className="w-screen">
            <AdminHeader />
            <div className="w-full flex flex-col items-center justify-center gap-4 mt-20">
                <div className="w-full flex items-center justify-center gap-4">
                    {/* <AdminSearch /> */}
                    <h4 className="text-3xl text-orange-600 font-semibold p-4 text-center">Danh sách Đơn Hàng</h4>
                </div>


                <div className="w-full overflow-auto relative shadow-md sm:rounded-sm">
                    <table className="w-[1400px] h-420 text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    #
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Mã đơn hàng
                                </th>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    Tên người nhận
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Số điện thoại
                                </th>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    Địa chỉ giao hàng
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Tổng đơn hàng
                                </th>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800  text-center">
                                    Tình trạng
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItem?.length > 0 && currentItem.map((item, index) => (
                                <OrderTableItem data={item} key={index} setListOrder={setListOrder} />
                            ))}

                        </tbody>
                    </table>
                </div>
                <Pagination itemsPerPage={itemsPerPage} totalPages={listOrder.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <Footer />
            </div>
        </div>
    )
}

export default ListOrder