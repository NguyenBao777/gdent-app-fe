import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

import { AdminHeader, Pagination, Footer } from '../../components';
import { useStateValue } from '../../context/StateProvider';
import Alert from '../../utils/alert';
import { deleteAdmin, editAdmin, getAllAdmin, getTotalSale } from '../../utils/hepperApi';
import { serverPublic } from '../../utils/serverPublic';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { numberFormat } from '../../utils/format';
import { NavLink } from 'react-router-dom';
registerLocale("vi", vi);

const AdminTableItem = ({ data, index, setAlertBox, setListAdmin }) => {
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [context, dispatch] = useStateValue();
    const [showEdit, setShowEdit] = useState(false);
    const [adminpassword, setAdminpassword] = useState("");
    const [adminRole, setAdminRole] = useState(data.admin_role);

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteAdmin(data.id, data.admin_image).then((res) => {
            if (res.data.success) {
                getAllAdmin().then((res) => {
                    if (res.data.success) {
                        setListAdmin(res.data.message);
                        setAlertBox({
                            type: "success",
                            message: "Xóa admin thành công"
                        });
                        setShowAlertDelete(false);
                        setTimeout(() => setAlertBox(""), 1500);
                    }
                })


            } else {
                setAlertBox({
                    type: "error",
                    message: "Xóa admin không thành công"
                });
                setTimeout(() => setAlertBox(""), 1500);
            }
        });
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const formData = {
            admin_id: data.id,
            admin_password: adminpassword,
            admin_role: adminRole
        }

        editAdmin(formData).then((res) => {
            if (res.data.success) setShowEdit(false);
        })
    }

    return (
        <tr className="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {index + 1}
            </th>
            <td className="py-4 px-6 text-center">
                <div className="flex items-center justify-center w-full relative">
                    <img src={`${serverPublic}images/admin/${data?.admin_image}`} alt="" className="object-cover w-16 h-16 rounded-full" />
                    <span className={`w-4 h-4 border border-white rounded-full absolute top-12 right-10 ${data?.admin_onl === "yes" ? "bg-green-600" : "bg-red-600"}`}></span>

                </div>
            </td>
            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                {data?.admin_name}
            </td>
            <td className="py-4 px-6 text-center">
                {data?.admin_username}
            </td>

            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                {data.admin_status === 1 ? (
                    <span className="py-1 px-2 text-xs cursor-pointer text-white bg-green-600 rounded-full">
                        Đang rãnh
                    </span>

                ) : (
                    <span className="py-1 px-2 text-xs cursor-pointer text-white bg-gray-600 rounded-full">
                        Đang giao hàng
                    </span>
                )}
            </td>
            <td className="py-4 px-6 text-center">
                {data?.admin_role}
            </td>

            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center relative">
                {context.admin?.admin_role === "admin" && context.admin?.id !== data.id && (
                    <div className="w-full flex flex-col items-center justify-center gap-3">
                        <button className="flex items-center justify-center w-[60px] bg-green-600 px-4 py-1 rounded-md mb-2 shadow-md"
                            onClick={() => setShowEdit(!showEdit)}
                        >
                            <AiOutlineEdit className="text-2xl text-white" />
                        </button>
                        {showEdit && (
                            <form className="absolute top-14 -left-6 z-20 translate-x-[-50%] w-300 rounded-md bg-white shadow-md px-4 py-2"
                                onSubmit={(e) => handleEdit(e)}
                            >

                                <div className="flex flex-col justify-center gap-6 mt-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm">Mật khẩu: </p>
                                        <input type="password" autoComplete='true' value={adminpassword} className="p-2 rounded-md border-2 border-gray-600 bg-gray-300 focus-within:shadow-md focus-within:bg-white transition-all duration-150 ease-in-out"
                                            onChange={(e) => setAdminpassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm">Chức vụ: </p>
                                        <select value={adminRole} className="p-2 rounded-md border-2 border-gray-600 bg-gray-300 w-150"
                                            onChange={(e) => setAdminRole(e.target.value)}
                                        >
                                            <option value="">-----------</option>
                                            <option value="admin">admin</option>
                                            <option value="shipper">shipper</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="flex items-center justify-center rounded-md px-4 py-1 text-white bg-green-600 hover:bg-green-800 transition-all duration-150 ease-in-out">
                                        Gửi
                                    </button>
                                </div>
                            </form>
                        )}
                        <button className="flex items-center justify-center w-[60px] bg-red-600 px-4 py-1 rounded-md relative shadow-md" onClick={(e) => setShowAlertDelete(true)}>
                            <AiOutlineDelete className="text-2xl text-white" />
                        </button>
                        {showAlertDelete && (
                            <div className="absolute top-8 left-0 z-20 translate-x-[-50%] w-225 rounded-md bg-white shadow-md px-4 py-2">
                                <p className="text-sm">Are you sure want <span className="tex-red-600 font-semibold"> delete this News </span>?</p>
                                <div className="flex items-center justify-center gap-6 mt-2">
                                    <button className="flex item-center justify-center border-none outline-none bg-green-600 text-white text-xs rounded-full px-4 py-1"
                                        onClick={handleDelete}
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

const AdminDashboard = () => {
    const [listAdmin, setListAdmin] = useState([]);
    const [context, dispatch] = useStateValue();
    const [alertBox, setAlertBox] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [totalSale, setTotalSale] = useState("");
    // get currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = listAdmin.slice(indexOfFirstItem, indexOfLastItem);
    useEffect(() => {
        getAllAdmin().then((res) => {
            if (res.data.success && res.data.message.length > 0) setListAdmin(res.data.message);
        });
        getTotalSale(fromDate, toDate).then((res) => {
            if (res.data.success) {

                const sum = numberFormat(res.data.message.reduce((total, item) => {
                    return total += item.order_total;
                }, 0));
                setTotalSale(sum);
            }
        })
    }, []);

    const filterTotalSale = () => {
        getTotalSale(fromDate, toDate).then((res) => {
            if (res.data.success) {
                const sum = numberFormat(res.data.message.reduce((total, item) => {
                    return total += item.order_total;
                }, 0));
                setTotalSale(sum);
            }
        });
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <AdminHeader />
            {alertBox !== "" && (<Alert alert={alertBox} />)}
            <div className="mt-20 w-[80%] bg-black rounded-md flex flex-wrap items-center justify-center gap-4 p-4">
                <div className="flex-1 flex items-center justify-center gap-4">
                    <RiMoneyDollarCircleLine className="text-3xl text-yellow-600" />
                    <p className="text-lg text-white">{totalSale} VNĐ</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <div className="flex items-center justify-center gap-2">
                        <p className="text-white text-base">Từ:</p>
                        <DatePicker locale={vi} format='yyyy-MM-dd' selected={fromDate} onChange={(date) => setFromDate(date)} />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <p className="text-white text-base">Đến:</p>
                        <DatePicker locale={vi} format='yyyy-MM-dd' selected={toDate} onChange={(date) => setToDate(date)} />
                    </div>
                </div>
                <button className="rounded-md flex items-center justify-center px-4 py-1 text-white bg-green-600 hover:bg-green-800 transition-all duration-150 ease-in-out"
                    onClick={filterTotalSale}
                >
                    Lọc
                </button>
            </div>
            <div className="flex items-center justify-center gap-4">
                {context.admin?.admin_role === "admin" && (
                    <NavLink to="register" className="w-9 h-9 p-2 flex items-center justify-center border border-gray-500 rounded-sm hover:shadow-md duration-150 transition-all ease-in-out bg-primary">
                        <AiOutlinePlus className="text-2xl" />
                    </NavLink>
                )}
                <h4 className="text-3xl text-orange-600 font-semibold p-4 text-center">Danh sách Nhân Viên</h4>
            </div>
            <div className="w-full overflow-auto h-420 relative shadow-md sm:rounded-sm mb-2">
                <table className="w-[1400px] xl:w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                #
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                Hình ảnh
                            </th>
                            <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                Tên Nhân viên
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                Tài khoản
                            </th>
                            <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                Tình trạng
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                Chức vị
                            </th>

                            <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                Thao tác
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentItem?.length > 0 && currentItem.map((item, index) => (
                            <AdminTableItem data={item} index={index} key={index} setAlertBox={setAlertBox} setListAdmin={setListAdmin} />
                        ))}

                    </tbody>
                </table>
            </div>
            <Pagination itemsPerPage={itemsPerPage} totalPages={listAdmin.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <Footer />
        </div>
    )
}

export default AdminDashboard
