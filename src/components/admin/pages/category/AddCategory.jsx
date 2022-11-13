import { useState } from "react";
import { AiOutlineCloudUpload, AiTwotoneDelete } from "react-icons/ai";
import isEmpty from "validator/lib/isEmpty";
import { AdminHeader, Footer } from "../../../../components";
import { addNewCategory, getAllCategory } from "../../../../utils/hepperApi";
import Alert from "../../../../utils/alert";
import { useStateValue } from "../../../../context/StateProvider";
import { actionType } from "../../../../context/reducer";

const AddCategory = () => {
    const [alertBox, setAlertBox] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const [categoryStatus, setCategoryStatus] = useState("");
    const [msgValidation, setMsgValidation] = useState("");
    const [file, setFile] = useState(null);
    const [context, dispatch] = useStateValue();

    const validation = () => {
        const msg = {}
        if (isEmpty(categoryName)) {
            msg.name = "Vui lòng điền Tên";
        }

        if (isEmpty(categoryDesc)) {
            msg.desc = "Vui lòng điền Mô tả";
        }

        if (isEmpty(categoryStatus)) {
            msg.status = "Vui lòng thêm Trạng thái";
        }

        if (isEmpty(categoryImage)) {
            msg.img = "Vui lòng thêm một ảnh";
        }

        setMsgValidation(msg);
        setTimeout(() => setMsgValidation(""), 1500);

        if (Object.keys(msg).length > 0) return true;

        return false;
    }


    const handleUploadImage = (e) => {
        const msg = {};
        const typeOfFile = () => {
            const type = e.target.files[0].type;
            if (type === "image/png" || type === "image/jpeg" || type === "image/gif") return true;
            return false;
        }

        if (!typeOfFile()) {
            msg.img = "Chỉ chấp nhận file png/jpeg/gif";
            setMsgValidation(msg);
            setTimeout(() => setMsgValidation(""), 1000);
        }

        if (Object.keys(msg).length > 0) return true;

        const tempImage = URL.createObjectURL(e.target.files[0]);
        setFile(e.target.files[0]);
        setCategoryImage(tempImage);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        // handleSubmit
        const formData = new FormData();
        formData.append("category_image", file);
        formData.append("category_name", categoryName);
        formData.append("category_desc", categoryDesc);
        formData.append("category_status", categoryStatus);
        addNewCategory(formData).then((res) => {
            if (res.data.success === true) {
                setAlertBox({
                    type: "success",
                    message: "Thêm Danh Mục thành công"
                });
                setTimeout(() => { setAlertBox(""); }, 1500);
                getAllCategory().then((res) => {
                    dispatch({
                        type: actionType.SET_LIST_CATEGORY,
                        listCategory: res.data.message
                    });
                });
                // set initial state
                setCategoryName("");
                setCategoryDesc("");
                setCategoryStatus("");
                setCategoryImage(null);
                setFile(null);
            } else {
                setAlertBox({
                    type: "error",
                    message: "Thêm Danh Mục không thành công"
                });
                setTimeout(() => { setAlertBox(""); }, 1500);
            }
        });


    }

    return (
        <div className="w-full py-2">
            <AdminHeader />
            <form className="w-full flex flex-col items-center justify-center gap-4 mt-20 relative" encType="multipart/form-data"
                onSubmit={(e) => handleSubmit(e)}
            >
                {alertBox !== "" && (<Alert alert={alertBox} />)}
                <h4 className="text-textColor text-xl font-semibold">Thêm Danh Mục</h4>
                <div className="w-full flex justify-center flex-wrap border border-gray-500 rounded-sm">
                    <div className="w-full md:w-1/2 p-2 flex flex-col gap-4">

                        <div className="w-full p-1 bg-primary h-420 rounded-sm border-2 border-dotted border-gray-500 transition-all duration-150 ease-in-out relative">
                            {categoryImage && (
                                <div className="w-full h-full flex items-center justify-center cursor-pointer absolute top-0 left-0">
                                    <img src={categoryImage} className="object-cover w-full h-full rounded-sm " alt="" />
                                    <span className="p-2 w-8 h-8 rounded-full flex items-center justify-center  bg-red-600 cursor-pointer absolute top-2 right-2">
                                        <AiTwotoneDelete className="text-2xl text-white" onClick={() => setCategoryImage(null)} />
                                    </span>
                                </div>
                            )}
                            <label htmlFor="category_image" className="w-full h-full flex items-center justify-center cursor-pointer">
                                <AiOutlineCloudUpload className="text-[40px] text-black/50" />
                            </label>
                            <input type="file" id='category_image' name="category_image" hidden onChange={(e) => handleUploadImage(e)} />
                        </div>
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.img ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.img}
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="category_name">Tên Danh Mục:</label>
                            <input type="text" value={categoryName} id="category_name" name="category_name" placeholder="Tên Danh mục *" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.name ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.name}
                            </p>
                        </div>
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="category_desc">Mô Tả Danh Mục:</label>
                            <textarea id="category_desc" value={categoryDesc} rows="4" name="category_desc" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setCategoryDesc(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.desc ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.desc}
                            </p>
                        </div>

                        <div className="w-full">
                            <label htmlFor="category_status">Tình Trạng:</label>
                            <select className="py-2 px-4 w-auto rounded-sm bg-white outline-none cursor-pointer" name="category_status"
                                onChange={(e) => setCategoryStatus(e.target.value)}>
                                <option value="">----------</option>
                                <option value="1">Hiện</option>
                                <option value="0">Ẩn</option>
                            </select>
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.status ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.status}
                            </p>
                        </div>
                    </div>
                </div>

                <button type="submit" className="flex items-center justify-center outline-none rounded-md hover:shadow-md transition-all duration-150 ease-in-out text-white px-4 py-1 cursor-pointer bg-green-600">
                    Thêm Danh Mục
                </button>
            </form>
            <Footer />
        </div>
    )
}

export default AddCategory