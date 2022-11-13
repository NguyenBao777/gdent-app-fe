import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { assignedOrder, getAdminByStatus, getOrderByCode, getOrderDetail, handleOrder } from '../../../../utils/hepperApi';
import { AdminHeader, Footer } from '../../../../components';
import { useStateValue } from '../../../../context/StateProvider';
import { serverPublic } from '../../../../utils/serverPublic';
import Alert from '../../../../utils/alert';
import { numberFormat } from '../../../../utils/format';

const OrderDetail = () => {
    const [listOrderDetail, setListOrderDetail] = useState([]);
    const [context, dispatch] = useStateValue();
    const [listShipper, setListShipper] = useState([]);
    const [order, setOrder] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");
    const [shipper, setShipper] = useState(null);
    const [alertBox, setAlertBox] = useState("");
    const code = useParams().code;

    useEffect(() => {
        getOrderDetail(code).then((res) => {
            if (res.data.success) setListOrderDetail(res.data.message);
        });
        getOrderByCode(code).then((res) => {
            if (res.data.success) {
                setOrder(res.data.message);
                setOrderStatus(res.data.message?.order_status);
                if (res.data.message?.shipper_id) setShipper(res.data.message?.shipper_id)
            }
        });
        if (context.admin?.admin_role === "admin") {
            getAdminByStatus().then((res) => {
                if (res.data.success) {
                    setListShipper(res.data.message);
                };
            });
        }
    }, []);

    const assignOrder = () => {
        assignedOrder(order.id, shipper).then((res) => {
            if (res.data.success) {
                setAlertBox({
                    type: "success",
                    message: "Giao nhiệm vụ thành công"
                });
                setTimeout(() => setAlertBox(""), 1500);
            } else {
                setAlertBox({
                    type: "error",
                    message: "Giao nhiệm vụ không thành công"
                });
                setTimeout(() => setAlertBox(""), 1500);
            }
        });
    }

    const shiperHandleOrder = () => {
        handleOrder(order.id, orderStatus, order.shipper_id).then((res) => {
            if (res.data.success) {
                setAlertBox({
                    type: "success",
                    message: "Xác nhận thành công"
                });
                setTimeout(() => setAlertBox(""), 1500);
                getOrderByCode(code).then((res) => {
                    if (res.data.success) {
                        setOrder(res.data.message);
                    }
                });
            } else {
                setAlertBox({
                    type: "error",
                    message: "Xác nhận không thành công"
                });
                setTimeout(() => setAlertBox(""), 1500);
            }
        });
    }


    return (
        <div className="w-full">
            <AdminHeader />
            <div className="w-full mt-20 flex flex-col items-center gap-4 px-2 relative">
                {alertBox !== "" && (<Alert alert={alertBox} />)}
                <div className="w-full md:w-3/4 border border-gray-600 p-4 rounded-md flex flex-col items-center gap-4">
                    <h4 className="text-xl w-full font-semibold text-center text-gray-600 border-b border-gray-600 pb-4">
                        Mã vận đơn: <span className="text-green-600">{order.order_code}</span>
                    </h4>
                    <div className="w-full">
                        <div className="w-full flex flex-wrap items-center justify-start gap-8">
                            <p className="text-xs md:text-base text-textColor">
                                Tên người nhận: {order.order_name}
                            </p>
                            <p className="text-xs md:text-base text-textColor">
                                Số điện thoại người nhận: {order.order_phone}
                            </p>
                            <p className="text-xs md:text-base text-textColor">
                                Phương thức thanh toán: {order.payment_method}
                            </p>
                        </div>
                        <p className="text-xs md:text-base text-textColor">
                            Địa chỉ người nhận: {order.order_address},
                            {" "}{order.xaphuongthitran_name},
                            {" "}{order.quanhuyen_name},
                            {" "}{order.tinhthanhpho_name}
                        </p>
                    </div>
                    <div className="w-full">
                        {listOrderDetail.length > 0 && listOrderDetail.map((orderDetail, i) => (
                            <div className="flex items-center gap-4 bg-gray-200/75 px-4 py-2">
                                <img src={`${serverPublic}images/product/${orderDetail.product_image}`} alt="" className="object-cover w-150 rounded-md" />
                                <div className="flex flex-1 flex-col justify-center gap-4">
                                    <p className="text-base">Tên sản phẩm: {orderDetail.product_name}</p>
                                    <p className="text-sm">Số lượng: {orderDetail.sale_qty}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs md:text-base text-textColor w-full text-end">
                        Tổng đơn: {numberFormat(order.order_total)} VNĐ
                    </p>
                </div>
                {context.admin?.admin_role === "admin" && (
                    <div className="flex gap-4 items-center w-full md:w-3/4">
                        <select name="shipper" value={shipper} className="p-2 rounded-md bg-gray-300 border-gray-600 outline-none"
                            disabled={order.order_status === 0 ? true : false}
                            onChange={(e) => setShipper(e.target.value)}
                        >
                            <option value="">-------------</option>
                            {listShipper.length > 0 && listShipper.map((shipper, i) => (
                                <option value={shipper.id} key={i}>{shipper.admin_name}</option>
                            ))}
                        </select>
                        <div className="flex items-center justify-center text-white bg-blue-400 hover:bg-blue-600 transition-all duration-150 rounded-md cursor-pointer px-4 py-1"
                            onClick={assignOrder}
                        >
                            Giao nhiệm vụ
                        </div>
                    </div>
                )}

                {context.admin?.admin_role === "shipper" && (
                    <div className="flex gap-4 items-center w-full md:w-3/4">
                        <select name="shipper" value={orderStatus} className="p-2 rounded-md bg-gray-300 border-gray-600 outline-none"
                            disabled={order.order_status === 0}
                            onChange={(e) => setOrderStatus(e.target.value)}
                        >
                            <option value="1">----------</option>
                            {order.order_status === 1 && (
                                <>
                                    <option value="2">Hẹn giao lại</option>
                                    <option value="0">Đã giao hàng</option>
                                </>
                            )}
                            {order.order_status === 2 && (
                                <>
                                    <option value="2">Hẹn giao lại</option>
                                    <option value="0">Đã giao hàng</option>
                                </>
                            )}
                            {order.order_status === 0 && (
                                <option value="0">Đã giao hàng</option>
                            )}
                        </select>
                        <div className="flex items-center justify-center text-white bg-blue-400 hover:bg-blue-600 transition-all duration-150 rounded-md cursor-pointer px-4 py-1"
                            disabled={order.order_status === 0}
                            onClick={shiperHandleOrder}
                        >
                            Xác nhận
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default OrderDetail
