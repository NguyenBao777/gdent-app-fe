
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Modal = ({ type, setModal }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center bg-black/50 fixed top-0 left-0 bottom-0 right-0 z-30">
            {type === "success" ? (
                <div className="bg-white rounded-md p-2 shadow-md flex items-center justify-center gap-4 flex-col">
                    <div className="flex items-center gap-4">
                        <AiOutlineCheckCircle className="text-2xl text-green-600" />
                        <p className="text-textColor text-lg">Đặt hàng thành công.</p>
                    </div>

                    <div className="flex items-center justify-center rounded-md text-white bg-blue-600 px-4 py-1 cursor-pointer" onClick={() => navigate("/", { replace: true })}>
                        Trở về trang chủ
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-md p-2 shadow-md flex items-center justify-center gap-4 flex-col">
                    <div className="flex items-center gap-4">
                        <AiOutlineCheckCircle className="text-2xl text-green-600" />
                        <p className="text-textColor text-lg">Đặt hàng không thành công.</p>
                    </div>

                    <div className="flex items-center justify-center rounded-md text-white bg-blue-600 px-4 py-1 cursor-pointer" onClick={() => setModal("")}>
                        Đóng
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal
