import "./App.css";
import {
	AdminLogin,
	AdminRegister,
	AdminDashboard,
	ListProduct,
	AddProduct,
	EditProduct,
	Home,
	Cart,
	Checkout,
	Product,
	ProductDetail,
	ListCategory,
	AddCategory,
	EditCategory,
	AddBrand,
	ListBrand,
	EditBrand,
	AddSlide,
	ListSlide,
	EditSlide,
	AddNews,
	ListNews,
	EditNews,
	AddContent,
	ListContent,
	UserProfile,
	ListOrder,
	OrderDetail,
	OrderAssigned,
	Service,
	About,
	News,
} from "./components";

import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="w-screen h-screen overflow-x-hidden">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/userprofile" element={<UserProfile />} />
				<Route path="/service" element={<Service />} />
				<Route path="/about" element={<About />} />
				<Route path="/news/:id" element={<News />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/product" element={<Product />} />
				<Route path="/productdetail/:id" element={<ProductDetail />} />
				<Route path="/dashboard" element={<AdminDashboard />} />
				<Route path="/dashboard/login" element={<AdminLogin />} />
				<Route path="/dashboard/register" element={<AdminRegister />} />

				{/* category */}
				<Route path="/dashboard/category/" element={<ListCategory />} />
				<Route path="/dashboard/category/addcategory" element={<AddCategory />} />
				<Route path="/dashboard/category/editcategory/:id" element={<EditCategory />} />
				{/* brand */}
				<Route path="/dashboard/brand/" element={<ListBrand />} />
				<Route path="/dashboard/brand/addbrand" element={<AddBrand />} />
				<Route path="/dashboard/brand/editbrand/:id" element={<EditBrand />} />
				{/* Slide */}
				<Route path="/dashboard/slide/" element={<ListSlide />} />
				<Route path="/dashboard/slide/addslide" element={<AddSlide />} />
				<Route path="/dashboard/slide/editslide/:id" element={<EditSlide />} />
				{/* News */}
				<Route path="/dashboard/news/" element={<ListNews />} />
				<Route path="/dashboard/news/addnews" element={<AddNews />} />
				<Route path="/dashboard/news/editnews/:id" element={<EditNews />} />
				{/* Product */}
				<Route path="/dashboard/product/" element={<ListProduct />} />
				<Route path="/dashboard/product/addproduct" element={<AddProduct />} />
				<Route path="/dashboard/product/editproduct/:id" element={<EditProduct />} />
				{/* Content */}
				<Route path="/dashboard/content/addcontent" element={<AddContent />} />
				<Route path="/dashboard/content" element={<ListContent />} />
				{/* Order */}
				<Route path="/dashboard/order" element={<ListOrder />} />
				<Route path="/dashboard/order/orderdetail/:code" element={<OrderDetail />} />
				<Route path="/dashboard/orderassigned" element={<OrderAssigned />} />
			</Routes>
		</div>
	);
}

export default App;
