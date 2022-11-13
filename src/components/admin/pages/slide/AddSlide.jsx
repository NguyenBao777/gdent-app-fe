import { useState } from "react";
import { AiOutlineCloudUpload, AiTwotoneDelete } from "react-icons/ai";
import isEmpty from "validator/lib/isEmpty";
import { AdminHeader, Footer } from "../../../../components";
import { addNewSlide } from "../../../../utils/hepperApi";
import Alert from "../../../../utils/alert";

const AddSlide = () => {
    const [alertBox, setAlertBox] = useState("");
    const [slideImage, setSlideImage] = useState("");
    const [slideName, setSlideName] = useState("");
    const [slideDesc, setSlideDesc] = useState("");
    const [slideStatus, setSlideStatus] = useState("");
    const [msgValidation, setMsgValidation] = useState("");
    const [file, setFile] = useState(null);

    const validation = () => {
        const msg = {}
        if (isEmpty(slideName)) {
            msg.name = "Vui lòng điền Tên";
        }

        if (isEmpty(slideDesc)) {
            msg.desc = "Vui lòng điền Mô tả";
        }

        if (isEmpty(slideStatus)) {
            msg.status = "Vui lòng thêm Trạng thái";
        }

        if (isEmpty(slideImage)) {
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
        setSlideImage(tempImage);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        // handleSubmit
        const formData = new FormData();
        formData.append("slide_image", file);
        formData.append("slide_name", slideName);
        formData.append("slide_desc", slideDesc);
        formData.append("slide_status", slideStatus);
        addNewSlide(formData).then((res) => {
            if (res.data.success === true) {
                setAlertBox({
                    type: "success",
                    message: "Thêm Slide thành công"
                });
                setTimeout(() => { setAlertBox(null) }, 1500);

                // set initial state
                setSlideName("");
                setSlideDesc("");
                setSlideStatus("");
                setSlideImage(null);
                setFile(null);
            } else {
                setAlertBox({
                    type: "error",
                    message: "Thêm Slide không thành công"
                });
                setTimeout(() => { setAlertBox(null) }, 1500);
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
                <h4 className="text-textColor text-xl font-semibold">Thêm Slide</h4>
                <div className="w-full flex justify-center flex-wrap border border-gray-500 rounded-sm">
                    <div className="w-full md:w-1/2 p-2 flex flex-col gap-4">

                        <div className="w-full p-1 bg-primary h-420 rounded-sm border-2 border-dotted border-gray-500 transition-all duration-150 ease-in-out relative">
                            {slideImage && (
                                <div className="w-full h-full flex items-center justify-center cursor-pointer absolute top-0 left-0">
                                    <img src={slideImage} className="object-cover w-full h-full rounded-sm " alt="" />
                                    <span className="p-2 w-8 h-8 rounded-full flex items-center justify-center  bg-red-600 cursor-pointer absolute top-2 right-2">
                                        <AiTwotoneDelete className="text-2xl text-white" onClick={() => setSlideImage(null)} />
                                    </span>
                                </div>
                            )}
                            <label htmlFor="slide_image" className="w-full h-full flex items-center justify-center cursor-pointer">
                                <AiOutlineCloudUpload className="text-[40px] text-black/50" />
                            </label>
                            <input type="file" id='slide_image' name="slide_image" hidden onChange={(e) => handleUploadImage(e)} />
                        </div>
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.img ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.img}
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="slide_name">Tên Slide:</label>
                            <input type="text" value={slideName} id="slide_name" name="slide_name" placeholder="Tên Slide *" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setSlideName(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.name ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.name}
                            </p>
                        </div>
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="slide_desc">Mô Tả Slide:</label>
                            <textarea id="slide_price" value={slideDesc} rows="4" name="slide_desc" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setSlideDesc(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.desc ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.desc}
                            </p>
                        </div>

                        <div className="w-full">
                            <label htmlFor="slide_status">Tình Trạng:</label>
                            <select className="py-2 px-4 w-auto rounded-sm bg-white outline-none cursor-pointer" name="slide_status"
                                value={slideStatus}
                                onChange={(e) => setSlideStatus(e.target.value)}>
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
                    Thêm Slide
                </button>
            </form>
            <Footer />
        </div>
    )
}

export default AddSlide