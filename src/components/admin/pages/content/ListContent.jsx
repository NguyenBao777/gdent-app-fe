import { Link, NavLink } from "react-router-dom";
import { AdminSearch, AdminHeader, Pagination, Footer } from "../../../../components";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getAllContent, deleteContent, editContent } from "../../../../utils/hepperApi";


const ContentTableItem = ({ data, id, setListContent }) => {

    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [showAlertEdit, setShowAlertEdit] = useState(false);
    const [contentTitle, setContentTitle] = useState(data.content_title);
    const [contentDesc, setContentDesc] = useState(data.content_desc);
    const handleShowDeleteItem = (e) => {
        e.stopPropagation();
        setShowAlertDelete(false);
    }

    const handleDelete = (e, id) => {
        e.stopPropagation();
        deleteContent(id).then((data) => {
            setShowAlertDelete(false);
            getAllContent().then((res) => {
                setListContent(res.data.message)
            });
        });
    }

    const handleEdit = (id) => {
        editContent(id, contentTitle, contentDesc).then((res) => {
            setContentTitle(res.data.message.content_title);
            setContentDesc(res.data.message.content_desc);
            if (res.data.success) {
                setShowAlertEdit("success");
            } else {
                setShowAlertEdit("false");
            }
            setTimeout(() => { setShowAlertEdit(false); }, 1500);
        });
    }

    return (
        <tr className="border-b border-gray-200 dark:border-gray-700" key={id}>
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 text-center">
                {data.id}
            </th>
            <td className="py-4 px-6 text-center">
                <input type="text" className="border-none outline-none p-4 w-150" value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} />
            </td>
            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800  text-center">
                <textarea rows={6} className="border-none bg-transparent outline-none w-full h-full" value={contentDesc} onChange={(e) => setContentDesc(e.target.value)} />
            </td>


            <td className="py-4 px-6 text-center">
                <div className="w-full flex flex-col items-center jstify-center gap-3">

                    <div className="flex items-center justify-center cursor-pointer w-[60px] bg-green-600 px-4 py-1 rounded-md mb-2 shadow-md relative"
                        onClick={() => handleEdit(data.id)}
                    >
                        <AiOutlineEdit className="text-2xl text-white" />
                        {showAlertEdit && (
                            <div className="absolute -top-4 -right-16 bg-white p-4 rounded-md shadow-md">
                                {showAlertEdit === "success" ? (
                                    <AiOutlineCheck className="text-2xl text-green-600" />
                                ) : (
                                    <AiOutlineClose className="text-2xl text-red-600" />
                                )}
                            </div>
                        )}
                    </div>
                    <button className="flex items-center justify-center w-[60px] bg-red-600 px-4 py-1 rounded-md relative shadow-md" onClick={(e) => setShowAlertDelete(true)}>
                        <AiOutlineDelete className="text-2xl text-white" />
                        {showAlertDelete && (
                            <div className="absolute z-20 top-8 left-0 translate-x-[-50%] w-225 rounded-md bg-white shadow-md px-4 py-2">
                                <p className="text-sm">Are you sure want <span className="tex-red-600 font-semibold"> delete this Content </span>?</p>
                                <div className="flex items-center justify-center gap-6 mt-2">
                                    <button className="flex item-center justify-center border-none outline-none bg-green-600 text-white text-xs rounded-full px-4 py-1"
                                        onClick={(e) => handleDelete(e, data.id)}
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
                </div>

            </td>
        </tr>
    )
}
const ListContent = () => {
    const [listContent, setListContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    // get currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = listContent.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        getAllContent().then((res) => {
            setListContent(res.data.message);
        });
    }, []);


    return (
        <div className="w-screen">
            <AdminHeader />
            <div className="w-full flex flex-col items-center justify-center gap-4 mt-20">
                <div className="w-full flex items-center justify-center gap-4">
                    <NavLink to="addContent" className="w-9 h-9 p-2 flex items-center justify-center border border-gray-500 rounded-sm hover:shadow-md duration-150 transition-all ease-in-out bg-primary">
                        <AiOutlinePlus className="text-2xl" />
                    </NavLink>
                    {/* <AdminSearch /> */}
                    <h4 className="text-3xl text-orange-600 font-semibold p-4 text-center">Danh sách Nội Dung</h4>
                </div>


                <div className="w-full overflow-auto h-420 relative shadow-md sm:rounded-sm">
                    <table className="w-[1400px] xl:w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center">
                                    #
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Tiêu đề Nội Dung
                                </th>
                                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-center text-center">
                                    Mô tả Nội Dung
                                </th>
                                <th scope="col" className="py-3 px-6 text-center">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItem?.length > 0 && currentItem.map((item, index) => (
                                <ContentTableItem data={item} key={index} setListContent={setListContent} />
                            ))}

                        </tbody>
                    </table>
                </div>
                <Pagination itemsPerPage={itemsPerPage} totalPages={listContent.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <Footer />
            </div>
        </div>
    )
}

export default ListContent