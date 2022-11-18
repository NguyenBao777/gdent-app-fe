import axios from "axios";
import { dateFormat } from "./format";

const baseURL = "https://gdent-app-be.vercel.app/";
// const baseURL = "http://localhost:4000/";

export const getAllAdmin = async () => {
	const res = await axios.get(`${baseURL}admin/getall`);

	return res;
};

export const getAdminByStatus = async () => {
	const res = await axios.get(`${baseURL}admin/getadminbystatus`);

	return res;
};

export const adminLogin = async (username, password) => {
	const res = await axios.get(`${baseURL}admin/login/${username}/${password}`);

	return res;
};

export const adminUpdateOnl = async (id, str) => {
	const data = {
		id: id,
		str: str,
	};
	const res = await axios.put(`${baseURL}admin/updateonl`, data);

	return res;
};

export const adminRegister = async (data) => {
	const res = await axios.post(`${baseURL}admin/register`, data);

	return res;
};
export const checkDuplicateAdmin = async (username) => {
	const res = await axios.get(`${baseURL}admin/checkusername/${username}`);

	return res;
};

export const editAdmin = async (formData) => {
	const res = await axios.put(`${baseURL}admin/edit`, formData);

	return res;
};

export const deleteAdmin = async (id, filename) => {
	const res = await axios.delete(`${baseURL}admin/delete/${filename}/${id}`);

	return res;
};
// category
export const addNewCategory = async (formData) => {
	const res = await axios.post(`${baseURL}category/addnew`, formData);

	return res;
};

export const getAllCategory = async () => {
	const res = await axios.get(`${baseURL}category/getall`);

	return res;
};

export const getOneCategory = async (id) => {
	const res = await axios.get(`${baseURL}category/getone/${id.id}`);

	return res;
};

export const deleteCategory = async (id, filename) => {
	const res = await axios.delete(`${baseURL}category/delete/${filename}/${id}`);

	return res;
};

export const updateCategory = async (formData) => {
	console.log(formData);
	const res = await axios.put(`${baseURL}category/update`, formData);

	return res;
};

// brand
export const addNewBrand = async (formData) => {
	const res = await axios.post(`${baseURL}brand/addnew`, formData);

	return res;
};

export const getAllBrand = async (limit = 0) => {
	const res = await axios.get(`${baseURL}brand/getall/${limit}`);
	return res;
};

export const getOneBrand = async (id) => {
	const res = await axios.get(`${baseURL}brand/getone`, id);

	return res;
};

export const updateBrand = async (formData) => {
	const res = await axios.put(`${baseURL}brand/update`, formData);

	return res;
};

export const deleteBrand = async (id, filename) => {
	const res = await axios.delete(`${baseURL}brand/delete/${filename}/${id}`);

	return res;
};
// Slide
export const addNewSlide = async (formData) => {
	const res = await axios.post(`${baseURL}slide/addnew`, formData);

	return res;
};

export const getAllSlide = async (limit = 0) => {
	const res = await axios.get(`${baseURL}slide/getall/${limit}`);

	return res;
};

export const updateSlide = async (formData) => {
	const res = await axios.put(`${baseURL}slide/update`, formData);

	return res;
};

export const deleteSlide = async (id, filename) => {
	const res = await axios.delete(`${baseURL}Slide/delete/${filename}/${id}`);

	return res;
};

export const getOneSlide = async (id) => {
	const res = await axios.get(`${baseURL}slide/getone/${id}`);

	return res;
};
// News
export const addNewNews = async (formData) => {
	const res = await axios.post(`${baseURL}news/addnew`, formData);

	return res;
};

export const getAllNews = async (limit = 0) => {
	const res = await axios.get(`${baseURL}news/getall/${limit}`);

	return res;
};

export const updateNews = async (formData) => {
	const res = await axios.put(`${baseURL}news/update`, formData);

	return res;
};

export const getOneNews = async (id) => {
	const res = await axios.get(`${baseURL}news/getone/${id}`);

	return res;
};

export const deleteNews = async (id, filename) => {
	const res = await axios.delete(`${baseURL}news/delete/${filename}/${id}`);

	return res;
};

// Products
export const addNewProduct = async (formData) => {
	const res = await axios.post(`${baseURL}product/addnew`, formData);

	return res;
};

export const getAllProduct = async (admin = null) => {
	if (admin === null) {
		const res = await axios.get(`${baseURL}product/getall`);

		return res;
	} else {
		const res = await axios.get(`${baseURL}product/getalladmin`);

		return res;
	}
};

export const getHotProduct = async () => {
	const res = await axios.get(`${baseURL}product/getlimit`);

	return res;
};

export const searchProduct = async (str) => {
	const res = await axios.get(`${baseURL}product/search/${str}`);

	return res;
};

export const getProductByCategory = async (id) => {
	const res = await axios.get(`${baseURL}product/getbycategory/${id}`);

	return res;
};

export const getOneProduct = async (id) => {
	const res = await axios.get(`${baseURL}product/getone/${id.id}`);

	return res;
};

export const updateProduct = async (formData) => {
	const res = await axios.put(`${baseURL}product/update`, formData);

	return res;
};

export const deleteProduct = async (id, filesname) => {
	// console.log(oldImages);
	const res = await axios.delete(`${baseURL}product/delete/${id}`, { data: filesname });

	return res;
};
// Content
export const addNewContent = async (title, desc) => {
	const res = await axios.post(`${baseURL}content/addnew`, { content_title: title, content_desc: desc });

	return res;
};

export const editContent = async (id, title, desc) => {
	const res = await axios.put(`${baseURL}content/update`, { content_id: id, content_title: title, content_desc: desc });

	return res;
};

export const getAllContent = async () => {
	const res = await axios.get(`${baseURL}content/getall`);

	return res;
};

export const deleteContent = async (id, filesname) => {
	const res = await axios.delete(`${baseURL}content/delete/${id}`, { data: filesname });

	return res;
};

/* ------------------------------------ User ------------------------------------*/
export const userRegistation = async (user_name, user_username, user_password) => {
	const formData = {
		user_name: user_name,
		user_username: user_username,
		user_password: user_password,
	};

	const res = await axios.post(`${baseURL}user/registation`, formData);

	return res;
};

export const userLogin = async (user_username, user_password) => {
	const res = await axios.get(`${baseURL}user/login/${user_username}/${user_password}`);

	return res;
};

export const updateUser = async (formData) => {
	const res = await axios.put(`${baseURL}user/update`, formData);

	return res;
};

export const checkDuplicateUsername = async (username) => {
	const res = await axios.get(`${baseURL}user/checkusername/${username}`);

	return res;
};
/* ------------------------------------ Address ------------------------------------*/
export const getTinhThanhpho = async () => {
	const res = await axios.get(`${baseURL}address/tinhthanhpho`);

	return res;
};

export const getTinhThanhphoById = async (id) => {
	const res = await axios.get(`${baseURL}address/tinhthanhphobyid/${id}`);

	return res;
};

export const getQuanHuyen = async (id) => {
	const res = await axios.get(`${baseURL}address/quanhuyen/${id}`);

	return res;
};

export const getQuanHuyenById = async (id) => {
	const res = await axios.get(`${baseURL}address/quanhuyenbyid/${id}`);

	return res;
};

export const getXaphuongThitran = async (id) => {
	const res = await axios.get(`${baseURL}address/xaphuongthitran/${id}`);

	return res;
};

export const getXaphuongThitranById = async (id) => {
	const res = await axios.get(`${baseURL}address/xaphuongthitranbyid/${id}`);

	return res;
};

export const getUserAddress = async (id) => {
	const res = await axios.get(`${baseURL}address/getaddress/${id}`);

	return res;
};

export const deleteUserAddress = async (id) => {
	const res = await axios.delete(`${baseURL}address/detele/${id}`);

	return res;
};
// Order
export const addNewOrder = async (order) => {
	const res = await axios.post(`${baseURL}order/addnew`, order);

	return res;
};

export const getOrderByID = async (id) => {
	const res = await axios.get(`${baseURL}order/getbyid/${id}`);

	return res;
};

export const getOrderByCode = async (code) => {
	const res = await axios.get(`${baseURL}order/getbycode/${code}`);

	return res;
};

export const getAllOrder = async () => {
	const res = await axios.get(`${baseURL}order/getall`);

	return res;
};

export const getOrderDetail = async (code) => {
	const res = await axios.get(`${baseURL}order/orderdetail/${code}`);

	return res;
};

export const assignedOrder = async (orderID, shipperID) => {
	const data = {
		order_id: orderID,
		shipper_id: shipperID,
	};
	const res = await axios.put(`${baseURL}order/assigned`, data);

	return res;
};

export const handleOrder = async (orderID, orderStatus, shipperID) => {
	const data = {
		order_id: orderID,
		order_status: orderStatus,
		shipper_id: shipperID,
	};
	const res = await axios.put(`${baseURL}order/handleorder`, data);

	return res;
};

export const deleteOrder = async (order_code) => {
	const res = await axios.delete(`${baseURL}order/delete/${order_code}`);

	return res;
};

export const getTotalSale = async (fromDate, toDate) => {
	const res = await axios.get(`${baseURL}order/gettotal/${fromDate}/${toDate}`);

	return res;
};
