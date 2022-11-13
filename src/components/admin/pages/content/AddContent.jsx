import { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { AdminHeader, Footer } from "../../../../components";
import Alert from "../../../../utils/alert";
import { addNewContent } from "../../../../utils/hepperApi";

const AddContent = () => {
    const [alertBox, setAlertBox] = useState("");
    const [msgValidation, setMsgValidation] = useState("");
    const [contentTitle, setContentTitle] = useState("");
    const [contentDesc, setContentDesc] = useState("");
    const validation = () => {
        const msg = {}

        if (isEmpty(contentTitle)) {
            msg.name = "Vui lòng điền Tên.";
        }

        if (isEmpty(contentDesc)) {
            msg.desc = "Vui lòng điền Mô tả.";
        }

        setMsgValidation(msg);
        setTimeout(() => setMsgValidation(""), 1500);

        if (Object.keys(msg).length > 0) return true;

        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        // handleSubmit

        addNewContent(contentTitle, contentDesc).then((res) => {
            if (res.data.success) {
                setAlertBox({
                    type: "success",
                    message: "Thêm nội dung thành công"
                });
                setTimeout(() => { setAlertBox(""); }, 1500)
                // set initial state
                setContentTitle("");
                setContentDesc("");
            } else {
                setAlertBox({
                    type: "error",
                    message: "Thêm nội dung không thành công"
                });
                setTimeout(() => { setAlertBox(""); }, 1500)
            }
        });
    };


    return (
        <div className="w-full">
            <AdminHeader />
            <div className="w-full flex flex-col items-center justify-center gap-4 mt-20 relative">
                {alertBox !== "" && (<Alert alert={alertBox} />)}
                <h4 className="text-textColor text-xl font-semibold">Thêm Nội dung</h4>
                <form className="w-3/4 flex justify-center flex-wrap border border-gray-500 rounded-sm py-2 px-4" encType="multipart/form-data"
                    onSubmit={(e) => handleSubmit(e)}
                >

                    <div className="w-full flex justify-center flex-col gap-2">
                        <label htmlFor="content_title">Tiêu đề Nội dung:</label>
                        <input type="text" value={contentTitle} id="content_title" name="content_title" placeholder="Title" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                            onChange={(e) => setContentTitle(e.target.value)}
                        />
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.name ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.name}
                        </p>
                    </div>



                    <div className="w-full flex justify-center flex-col gap-2">
                        <label htmlFor="content_desc">Mô Tả Nội dung:</label>
                        <textarea id="content_desc" value={contentDesc} rows="4" name="content_desc" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                            onChange={(e) => setContentDesc(e.target.value)}
                        />
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.desc ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.desc}
                        </p>
                    </div>


                    <button type="submit" className="flex items-center justify-center rounded-md hover:shadow-md transition-all duration-150 ease-in-out text-white px-4 py-1 cursor-pointer bg-green-600">
                        Thêm Nội dung
                    </button>
                </form>

            </div>
            <Footer />
        </div>
    )
}

export default AddContent