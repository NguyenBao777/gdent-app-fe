import { useEffect, useState } from "react";
import { getOrderByID } from "../../../../utils/hepperApi";
import { AdminHeader, AdminSearch, Footer } from "../../../../components";
import { useStateValue } from "../../../../context/StateProvider";
import { AiOutlineDelete, AiOutlineFolderView } from "react-icons/ai";
import { Link } from "react-router-dom";

const OrderTableItem = ({ data, id, setListOrder }) => {

    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [context, dispatch] = useStateValue();

    const handleShowDeleteItem = (e) => {
        e.stopPropagation();
        setShowAlertDelete(false);
    }

    const handleDelete = (e, id, filename) => {
        e.stopPropagation();
        // deleteOrder(id, filename).then((data) => {
        //     setShowAlertDelete(false);
        //     getAllOrder().then((res) => {
        //         setListOrder(res.data.message);
        //     });
        // });
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
                <Link to={`/dashboard/order/orderdetail/${data.order_code}`} className="flex items-center justify-center w-[60px] px-4 py-1 rounded-md mb-2 shadow-md bg-green-600">
                    <AiOutlineFolderView className="text-2xl text-white" />
                </Link>
            </td>
        </tr>
    )
}


const OrderAssigned = () => {
    const [listOrder, setListOrder] = useState([]);
    const [context, dispatch] = useStateValue();

    useEffect(() => {
        getOrderByID(context.admin?.id).then((res) => {
            setListOrder(res.data.message);
        });

    }, []);

    return (
        <div>
            <div className="w-screen">
                <AdminHeader />
                <div className="w-full flex flex-col items-center justify-center gap-4 mt-20">
                    <div className="w-full flex items-center justify-center gap-4">
                        {/* <AdminSearch /> */}
                    </div>


                    <div className="w-full overflow-auto relative shadow-md sm:rounded-sm">
                        <h4 className="text-3xl text-orange-600 font-semibold p-4 text-center">Danh sách Đơn Hàng</h4>
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
                                {listOrder?.length > 0 && listOrder.map((item, index) => (
                                    <OrderTableItem data={item} key={index} setListOrder={setListOrder} />
                                ))}

                            </tbody>
                        </table>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default OrderAssigned
