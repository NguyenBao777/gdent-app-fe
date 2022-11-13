import { useEffect, useState } from "react";
import { AiOutlineCloudUpload, AiTwotoneDelete } from "react-icons/ai";
import isEmpty from "validator/lib/isEmpty";
import { AdminHeader, Footer } from "../../../../components";
import { useStateValue } from "../../../../context/StateProvider";
import Alert from "../../../../utils/alert";
import { addNewProduct } from "../../../../utils/hepperApi";
import { getAllBrand, getAllCategory } from "../../../../utils/hepperApi";

const AddProduct = () => {
    const [alertBox, setAlertBox] = useState("");
    const [uploadImage, setUploadImage] = useState("");
    const [files, setFiles] = useState([]);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productListedPrice, setProductListedPrice] = useState(0);
    const [productQty, setProductQty] = useState(0);
    const [productCategory, setProductCategory] = useState(0);
    const [productBrand, setProductBrand] = useState(0);
    const [productStatus, setProductStatus] = useState(0);
    const [context, dispatch] = useStateValue();
    const [listCategory, setListCategory] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [msgValidation, setMsgValidation] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productOrigin, setProductOrigin] = useState("");
    const [productCode, setProductCode] = useState("");
    const validation = () => {
        const msg = {}

        const moreThanZero = (field) => {
            if (field <= 0) return false;

            return true;
        };


        if (isEmpty(productName)) {
            msg.name = "Vui lòng điền Tên.";
        }

        if (isEmpty(productCode)) {
            msg.code = "Vui lòng nhập Mã Sản Phẩm.";
        }

        if (isEmpty(productOrigin)) {
            msg.origin = "Vui lòng nhập Xuất xứ.";
        }

        if (isEmpty(productDesc)) {
            msg.desc = "Vui lòng điền Mô tả.";
        }

        // if (!moreThanZero(productPrice)) {
        //     msg.price = "Đơn giá phải lớn hơn 0.";
        // }

        // if (!moreThanZero(productListedPrice)) {
        //     msg.listedPrice = "Đơn giá phải lớn hơn 0.";
        // }

        if (!moreThanZero(productQty)) {
            msg.qty = "Số lượng phải lớn hơn 0.";
        }

        if (isEmpty(uploadImage)) {
            msg.img = "Vui lòng thêm một ảnh";
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
        const formData = new FormData();
        files.forEach(file => {
            formData.append("product_image", file);
        })
        formData.append("product_name", productName);
        formData.append("product_desc", productDesc);
        formData.append("product_price", productPrice);
        formData.append("product_listed_price", productListedPrice);
        formData.append("product_qty", productQty);
        formData.append("product_category", productCategory);
        formData.append("product_brand", productBrand);
        formData.append("product_status", productStatus);
        formData.append("product_origin", productOrigin);
        formData.append("product_code", productCode);

        console.log(productCode);

        addNewProduct(formData).then((res) => {
            if (res.data.success) {
                setAlertBox({
                    type: "success",
                    message: "Thêm Sản Phẩm thành công"
                });
                setTimeout(() => { setAlertBox("") }, 1500);
                // set initial state
                setProductName("");
                setProductDesc("");
                setProductPrice(0);
                setProductListedPrice(0);
                setProductQty(0);
                setProductCategory(0);
                setProductBrand(0);
                setProductStatus(0);
                setProductDesc("");
                setUploadImage(null);
                setFiles(null);
                setProductCode("");
                setProductOrigin("");
            } else {
                setAlertBox({
                    type: "error",
                    message: "Thêm Sản Phẩm không thành công"
                });
                setTimeout(() => { setAlertBox("") }, 1500);
            }
        });
    };

    useEffect(() => {
        getAllCategory().then((res) => {
            setListCategory(res.data.message);
        });

        getAllBrand().then((res) => {
            setListBrand(res.data.message);
        });
    }, []);

    const handleUploadImage = (e) => {
        const msg = {};
        const typeOfFile = () => {
            const type = e.target.files[0].type;
            if (type === "image/png" || type === "image/jpeg" || type === "image/gif") return true;
            return false;
        }

        const maxFiles = (arr, target) => {
            if (arr.length > target) return false;

            return true
        }

        if (!typeOfFile()) {
            msg.img = "Chỉ chấp nhận file png/jpeg/gif";
            setMsgValidation(msg);
            setTimeout(() => setMsgValidation(""), 1000);
        }

        if (!maxFiles(e.target.files, 3)) {
            msg.img = "Bạn chỉ có thể upload tối đa 3 files 1 lần";
            setMsgValidation(msg);
            setTimeout(() => setMsgValidation(""), 1000);
        }

        if (Object.keys(msg).length > 0) return true;

        setFiles([...e.target.files]);
        const tempImage = URL.createObjectURL(e.target.files[0]);
        setUploadImage(tempImage);
    }

    return (
        <div className="w-full">
            <AdminHeader />
            <div className="w-full flex flex-col items-center justify-center gap-4 mt-20 relative">
                {alertBox !== "" && (<Alert alert={alertBox} />)}
                <h4 className="text-textColor text-xl font-semibold">Thêm Sản Phẩm</h4>
                <form className="w-full flex justify-center flex-wrap border border-gray-500 rounded-sm py-2" encType="multipart/form-data"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="w-full md:w-1/2 p-2 flex flex-col gap-4">
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="product_name">Tên Sản Phẩm:</label>
                            <input type="text" value={productName} id="product_name" name="product_name" placeholder="Name" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.name ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.name}
                            </p>
                        </div>
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="product_code">Mã Sản Phẩm:</label>
                            <input type="text" value={productCode} id="product_code" name="product_code" placeholder="EK4" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setProductCode(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.code ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.code}
                            </p>
                        </div>
                        <div className="w-full p-1 bg-primary h-420 rounded-sm border-2 border-dotted border-gray-500 transition-all duration-150 ease-in-out relative">
                            {uploadImage && (
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer">
                                    <img src={uploadImage} className="object-cover w-full h-full rounded-sm " alt="" />
                                    <span className="p-2 w-8 h-8 rounded-full flex items-center justify-center  bg-red-600 cursor-pointer absolute top-2 right-2"
                                        onClick={() => setUploadImage("")}
                                    >
                                        <AiTwotoneDelete className="text-2xl text-white" />
                                    </span>
                                </div>
                            )}
                            <label htmlFor="product_image" className="w-full h-full flex items-center justify-center cursor-pointer">
                                <AiOutlineCloudUpload className="text-[40px] text-black/50" />
                            </label>
                            <input type="file" multiple id='product_image' name="product_image" hidden className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => handleUploadImage(e)}
                            />
                        </div>
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.img ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.img}
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="product_origin">Xuất xứ Sản Phẩm:</label>
                            <input type="text" value={productOrigin} id="product_origin" name="product_origin" placeholder="Korea" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setProductOrigin(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.origin ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.origin}
                            </p>
                        </div>
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="product_desc">Mô Tả Sản Phẩm:</label>
                            <textarea id="product_desc" value={productDesc} rows="4" name="product_desc" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setProductDesc(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.desc ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.desc}
                            </p>
                        </div>
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="product_price">Giá Sản Phẩm:</label>
                            <input type="number" value={productPrice} id="product_price" name="product_price" placeholder="VD: 300.000" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.price ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.price}
                            </p>
                        </div>
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="product_listed_price">Giá Bán Sản Phẩm:</label>
                            <input type="number" value={productListedPrice} id="product_listed_price" name="product_listed_price" placeholder="VD: 100.000" className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setProductListedPrice(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.listedPrice ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.listedPrice}
                            </p>
                        </div>
                        <div className="w-full flex justify-center flex-col gap-2">
                            <label htmlFor="product_qty">Số Lượng Nhập:</label>
                            <input type="number" value={productQty} id="product_qty" placeholder="VD: 10" required className="rounded-sm outline-none bg-transparent focus-within:bg-white focus-within:drop-shadow-md border-b border-gray-500 p-2 text-textColor transiton-all duration-150 ease-in-out"
                                onChange={(e) => setProductQty(e.target.value)}
                            />
                            <p className="text-red-700 font-light ml-2 text-xs italic">
                                <span className={`${msgValidation?.qty ? "visible" : "invisible"}`}>* </span>
                                {msgValidation?.qty}
                            </p>
                        </div>
                        <div className="w-full flex justify-between gap-2">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <label htmlFor="category_brand">Thương Hiệu:</label>
                                <select value={productBrand} id="category_brand" name="category_brand" className="py-2 px-4 rounded-sm bg-white outline-none cursor-pointer"
                                    onChange={(e) => setProductBrand(e.target.value)}
                                >
                                    <option value="">----------</option>
                                    {listBrand && listBrand.map((option, i) => (
                                        <option key={i} value={option.id}>{option.brand_name}</option>
                                    ))}
                                </select>
                                <p className="text-red-700 font-light ml-2 text-xs italic">
                                    <span className={`${msgValidation?.brand ? "visible" : "invisible"}`}>* </span>
                                    {msgValidation?.brand}
                                </p>
                            </div>

                            <div className="flex flex-col items-center justify-evenly gap-2">
                                <label htmlFor="category_product">Danh Mục:</label>
                                <select value={productCategory} id="category_product" name="category_product" className="py-2 px-4 rounded-sm bg-white outline-none cursor-pointer"
                                    onChange={(e) => setProductCategory(e.target.value)}
                                >
                                    <option value="">----------</option>
                                    {listCategory && listCategory.map((option, i) => (
                                        <option key={i} value={option.id}>{option.category_name}</option>
                                    ))}
                                </select>
                                <p className="text-red-700 font-light ml-2 text-xs italic">
                                    <span className={`${msgValidation?.category ? "visible" : "invisible"}`}>* </span>
                                    {msgValidation?.category}
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-evenly gap-2">
                                <label htmlFor="category_product">Trạng Thái:</label>
                                <select value={productStatus} id="category_product" name="category_product" className="py-2 px-4 rounded-sm bg-white outline-none cursor-pointer"
                                    onChange={(e) => setProductStatus(e.target.value)}
                                >
                                    <option value="">----------</option>
                                    <option value="1">Hiển thị</option>
                                    <option value="0">Ẩn</option>

                                </select>
                                <p className="text-red-700 font-light ml-2 text-xs italic">
                                    <span className={`${msgValidation?.status ? "visible" : "invisible"}`}>* </span>
                                    {msgValidation?.status}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="flex items-center justify-center rounded-md hover:shadow-md transition-all duration-150 ease-in-out text-white px-4 py-1 cursor-pointer bg-green-600">
                        Thêm sản phẩm
                    </button>
                </form>

            </div>
            <Footer />
        </div>
    )
}

export default AddProduct