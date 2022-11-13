import { useEffect, useState } from "react";
import { AiOutlineCloudUpload, AiTwotoneDelete } from "react-icons/ai";
import isEmpty from "validator/lib/isEmpty";
import { AdminHeader, Footer } from "../../../../components";
import { updateBrand, getOneBrand } from "../../../../utils/hepperApi";
import Alert from "../../../../utils/alert";
import { useNavigate, useParams } from "react-router-dom";
import { serverPublic } from "../../../../utils/serverPublic";
import { useStateValue } from "../../../../context/StateProvider";

const EditBrand = () => {
    const [alertBox, setAlertBox] = useState("");
    const [brandImage, setBrandImage] = useState("");
    const [brandName, setBrandName] = useState("");
    const [brandDesc, setBrandDesc] = useState("");
    const [brandStatus, setBrandStatus] = useState("");
    const [oldImage, setOldImage] = useState(null);
    const [msgValidation, setMsgValidation] = useState("");
    const [file, setFile] = useState(null);
    const [context, dispatch] = useStateValue();
    const id = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        if (context.admin?.admin_role === "admin") {
            getOneBrand(id).then((res) => {
                setBrandImage(`${serverPublic}images/brand/${res.data.message.brand_image}`);
                setBrandName(res.data.message.brand_name);
                setBrandDesc(res.data.message.brand_desc);
                setBrandStatus(res.data.message.brand_status);
                setOldImage(res.data.message.brand_image);
            });
        } else {
            navigate("/dashboard", { replace: true });
        }
    }, []);

    const validation = () => {
        const msg = {}
        if (isEmpty(brandName)) {
            msg.name = "Vui lòng điền Tên";
        }

        if (isEmpty(brandDesc)) {
            msg.desc = "Vui lòng điền Mô tả";
        }

        // if (isEmpty(brandStatus)) {
        //     msg.status = "Vui lòng thêm Trạng thái";
        // }

        if (isEmpty(brandImage)) {
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
        setBrandImage(tempImage);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        // handleSubmit
        const formData = new FormData();
        if (file) {
            formData.append("brand_image", file);
        }
        formData.append("brand_id", id);
        formData.append("brand_image", oldImage);
        formData.append("brand_name", brandName);
        formData.append("brand_desc", brandDesc);
        formData.append("brand_status", brandStatus);
        updateBrand(formData).then((res) => {
            if (res.data.success === true) {
                setAlertBox({
                    type: "success",
                    message: "sửa thương hiệu thành công."
                });
                setTimeout(() => { setAlertBox(""); }, 1500)
                // set initial state
                setFile(null);
            } else {
                setAlertBox({
                    type: "error",
                    message: "sửa thương hiệu không thành công."
                });
                setTimeout(() => { setAlertBox(""); }, 1500)
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
                <h4 className="text-textColor text-xl font-semibold">Sửa Thương Hiệu</h4>
                <div className="w-full flex justify-center flex-wrap border border-gray-500 rounded-sm">
                    <div className="w-full md:w-1/2 p-2 flex flex-col gap-4">

                        <div className="w-full p-1 bg-primary h-420 rounded-sm border-2 border-dotted border-gray-500 transition-all duration-150 ease-in-out relative">
                            {brandImage && (
                                <div className="w-full h-full flex items-center justify-center cursor-pointer absolute top-0 left-0">
                                    <img src={brandImage} className="object-cover w-full h-full rounded-sm " alt="" />
                                    <span className="p-2 w-8 h-8 rounded-full flex items-center justify-center  bg-red-600 cursor-pointer absolute top-2 right-2">
                                        <AiTwotoneDelete className="text-2xl text-white" onClick={() => setBrandImage(null)} />
                                    </span>
                                </div>
                            )}
                            <label htmlFor="brand_image" className="w-full h-full flex items-center justify-center cursor-pointer">
                                <AiOutlineCloudUpload className="text-[40px] text-black/50" />
                            </label>
                            <input type="file" id='brand_image' name="brand_image" hidden onChange={(e) => handleUploadImage(e)} />
                        </div>
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.img ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.img}
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="brand_name">Tên Thương Hiệu:</label>
                            <input type="text" value={brandName} id="brand_name" name="brand_name" placeholder="Tên Thương Hiệu *" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setBrandName(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.name ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.name}
                            </p>
                        </div>
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="brand_desc">Mô Tả Thương Hiệu:</label>
                            <textarea id="brand_desc" value={brandDesc} rows="4" name="brand_desc" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setBrandDesc(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.desc ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.desc}
                            </p>
                        </div>

                        <div className="w-full">
                            <label htmlFor="brand_status">Tình Trạng:</label>
                            <select className="py-2 px-4 w-auto rounded-sm bg-white outline-none cursor-pointer" name="brand_status"
                                value={brandStatus}
                                onChange={(e) => setBrandStatus(e.target.value)}>
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
                    Sửa Thương Hiệu
                </button>
            </form>
            <Footer />
        </div>
    )
}

export default EditBrand