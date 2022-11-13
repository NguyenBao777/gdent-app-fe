import { useEffect, useState } from "react";
import { AiOutlineCloudUpload, AiTwotoneDelete } from "react-icons/ai";
import isEmpty from "validator/lib/isEmpty";
import { AdminHeader, Footer } from "../../../../components";
import { updateNews, getOneNews } from "../../../../utils/hepperApi";
import Alert from "../../../../utils/alert";
import { useParams } from "react-router-dom";
import { serverPublic } from "../../../../utils/serverPublic";

const EditNews = () => {
    const [alertBox, setAlertBox] = useState("");
    const [newsImage, setNewsImage] = useState("");
    const [newsName, setNewsName] = useState("");
    const [newsDesc, setNewsDesc] = useState("");
    const [msgValidation, setMsgValidation] = useState("");
    const [file, setFile] = useState(null);
    const [oldImage, setOldImage] = useState(null);
    const id = useParams().id;

    useEffect(() => {
        getOneNews(id).then((res) => {
            if (res.data.success) {
                setNewsImage(`${serverPublic}images/news/${res.data.message.news_image}`);
                setNewsName(res.data.message.news_name);
                setNewsDesc(res.data.message.news_desc);

            }
        })
    }, []);

    const validation = () => {
        const msg = {}
        if (isEmpty(newsName)) {
            msg.name = "Vui lòng điền Tên";
        }

        if (isEmpty(newsDesc)) {
            msg.desc = "Vui lòng điền Mô tả";
        }


        if (isEmpty(newsImage)) {
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
        setNewsImage(tempImage);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        // handleSubmit
        const formData = new FormData();
        if (file) {
            formData.append("news_image", file);
        }
        formData.append("news_id", id);
        formData.append("old_image", oldImage);
        formData.append("news_name", newsName);
        formData.append("news_desc", newsDesc);
        updateNews(formData).then((res) => {
            if (res.data.success === true) {
                setAlertBox({
                    type: "success",
                    message: "Sửa Tin Tức thành công"
                });

                setTimeout(() => { setAlertBox("") }, 1500)
                // set initial state
                setFile(null);
            } else {
                setAlertBox({
                    type: "error",
                    message: "Sửa Tin Tức không thành công"
                });
                setTimeout(() => { setAlertBox("") }, 1500)
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
                <h4 className="text-textColor text-xl font-semibold">Sửa Tin Tức</h4>
                <div className="w-full flex justify-center flex-wrap border border-gray-500 rounded-sm">
                    <div className="w-full md:w-1/2 p-2 flex flex-col gap-4">

                        <div className="w-full p-1 bg-primary h-420 rounded-sm border-2 border-dotted border-gray-500 transition-all duration-150 ease-in-out relative">
                            {newsImage && (
                                <div className="w-full h-full flex items-center justify-center cursor-pointer absolute top-0 left-0">
                                    <img src={newsImage} className="object-cover w-full h-full rounded-sm " alt="" />
                                    <span className="p-2 w-8 h-8 rounded-full flex items-center justify-center  bg-red-600 cursor-pointer absolute top-2 right-2">
                                        <AiTwotoneDelete className="text-2xl text-white" onClick={() => setNewsImage(null)} />
                                    </span>
                                </div>
                            )}
                            <label htmlFor="News_image" className="w-full h-full flex items-center justify-center cursor-pointer">
                                <AiOutlineCloudUpload className="text-[40px] text-black/50" />
                            </label>
                            <input type="file" id='News_image' name="News_image" hidden onChange={(e) => handleUploadImage(e)} />
                        </div>
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.img ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.img}
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="news-name">Tên Tin Tức:</label>
                            <input type="text" value={newsName} id="news_name" name="news_name" placeholder="Tên Tin Tức *" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setNewsName(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.name ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.name}
                            </p>
                        </div>
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="news_desc">Mô Tả Tin Tức:</label>
                            <textarea id="news_desc" value={newsDesc} rows="4" name="news_desc" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setNewsDesc(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.desc ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.desc}
                            </p>
                        </div>
                    </div>
                </div>

                <button type="submit" className="flex items-center justify-center outline-none rounded-md hover:shadow-md transition-all duration-150 ease-in-out text-white px-4 py-1 cursor-pointer bg-green-600">
                    Sửa Tin Tức
                </button>
            </form>
            <Footer />
        </div>
    )
}

export default EditNews