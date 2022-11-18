import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { NavLink } from "react-router-dom";
import BgImg from "../../../assets/img/bg-img/bg-1.jpg";
import { Header, Body, Footer, ProductContainer, SlideContainer } from '../../../components';
import { getAllBrand, getAllContent, getAllNews } from "../../../utils/hepperApi";
import { serverPublic } from "../../../utils/serverPublic";
import GiaiPhapImg from "../../../assets/img/giaiphap.png";
import KhachHangImg from "../../../assets/img/khachhang.png";
import DoiTacImg from "../../../assets/img/doitac.png";
import SanPhamImg from "../../../assets/img/sanpham.png";

const Home = () => {
    const [listNews, setListNews] = useState([]);
    const [arrNews, setArrNews] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [listContent, setListContent] = useState([]);

    useEffect(() => {
        getAllNews(4).then((res) => {
            setListNews(res.data.message);
        });

        getAllBrand(4).then((res) => {
            setListBrand(res.data.message);
        });
        getAllContent().then((res) => {
            setListContent(res.data.message);
            setTabShow(res.data.message[0].content_desc);
        });

    }, []);
    useEffect(() => {
        setArrNews(listNews.filter((news) => news !== listNews[0]));
    }, [listNews]);


    const [tabShow, setTabShow] = useState("");
    const [tabActive, setTabActive] = useState(1);
    const handleShowTab = (content, index) => {
        setTabShow(content);
        setTabActive(index)
    }
    return (
        <div className="w-full h-full relative">
            <Header />
            <Body>
                <SlideContainer />

                {/* san phẩm tiêu biểu */}
                <section className="w-full h-full bg-blue-400/50 py-4">
                    <div className="flex items-center justify-between p-4">
                        <h4 className=" text-lg text-white font-bold uppercase">Sản phẩm tiêu biểu</h4>
                    </div>
                    <ProductContainer />
                </section>

                <section className="w-full flex items-stretch justify-center flex-wrap py-4">
                    <div className="w-full md:w-1/2 p-2 flex flex-col gap-4">
                        <div className="w-full pb-2 border-b-2 border-blue-600">
                            <h4 className="text-lg font-bold text-blue-600 upercase">Về chúng tôi</h4>
                        </div>
                        <p className="text-base">
                            Công ty Gia Mạnh là tiền thân của Công ty GDENT và chính thức được thành lập năm 2018.
                            Hiện nay, Công ty GDENT là một trong những công ty đi đầu tại Việt Nam hoạt động trong lĩnh vực nhập khẩu, kinh doanh các trang thiết bị, vật tư trong ngành nha khoa. GDENT chuyên cung cấp, độc quyền những vật liệu, dụng cụ và thiết bị nha khoa, là cầu nối giúp nha sĩ Việt Nam tiếp cận công nghệ mới, hiện đại, nhằm đem đến giải pháp tốt nhất để cải thiện sức khỏe răng miệng cho người Việt Nam.

                            GDENT phân phối chính thức các sản phẩm công nghệ cao của các hãng sản xuất hàng đầu thế giới đến từ Châu Âu, Mỹ, Nhật Bản, Hàn Quốc và cũng là đơn vị tiên phong triển khai và ứng dụng thành công những công nghệ kỹ thuật số cho ngành nha khoa
                        </p>
                    </div>
                    <div className="w-full h-full md:w-1/2 p-2 ">
                        <div className="border rounded-md flex flex-col w-full h-full items-center justify-center">
                            <div className="w-full flex items-center border-b">
                                {listContent.length > 0 && listContent.map((tab, index) => (
                                    <div key={index} className={`relative text-center ${index !== listContent?.length - 1 ? "border-r" : ""} ${tabActive === index ? "text-blue-500" : ""} cursor-pointer p-4 text-xs md:text-base text-textColor uppercase`} onClick={() => handleShowTab(tab.content_desc, index)}>
                                        {tab.content_title}

                                        {tabActive === index && (
                                            <motion.div className="rounded-full shadow-lg h-1 bg-blue-300 absolute bottom-2 left-2"
                                                initial={{ width: 0 }}
                                                animate={{ width: "90%" }}
                                                exit={{ width: 0 }}
                                            ></motion.div>
                                        )}

                                    </div>
                                ))}

                            </div>
                            <div className="w-full h-full p-4">
                                <p className="text-textColor">
                                    {tabShow}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative">
                    <img src={BgImg} className="object-cover w-full h-420" />
                    <div className="w-full h-full flex items-center justify-evenly p-4 gap-4 flex-wrap absolute top-0 left-0">
                        <div className="flex items-center justify-center gap-2 flex-col w-150">
                            <img src={GiaiPhapImg} className="w-[60px] md:w-full object-cover" alt="" />
                            <h2 className="text-white text-[45px] font-semibold">30</h2>
                            <h4 className="text-white uppercase font-semibold">Giải pháp</h4>
                        </div>
                        <div className="flex items-center justify-center gap-2 flex-col w-150">
                            <img src={KhachHangImg} className="w-[60px] md:w-full object-cover" alt="" />
                            <h2 className="text-white text-[45px] font-semibold">5000</h2>
                            <h4 className="text-white uppercase font-semibold">Khách hàng</h4>
                        </div>
                        <div className="flex items-center justify-center gap-2 flex-col w-150">
                            <img src={DoiTacImg} className="w-[60px] md:w-full object-cover" alt="" />
                            <h2 className="text-white text-[45px] font-semibold">20</h2>
                            <h4 className="text-white uppercase font-semibold">Đối tác</h4>
                        </div>
                        <div className="flex items-center justify-center gap-2 flex-col w-150">
                            <img src={SanPhamImg} className="w-[60px] md:w-full object-cover" alt="" />
                            <h2 className="text-white text-[45px] font-semibold">6500</h2>
                            <h4 className="text-white uppercase font-semibold">Sản phẩm</h4>
                        </div>
                    </div>
                </section>

                <section className="p-4">
                    <div className="flex items-center justify-between p-4 border-b border-gray-300">
                        <h4 className=" text-lg font-bold uppercase">Sự kiện nổi bật</h4>
                    </div>
                    <div className="w-full flex justify-center flex-wrap">
                        {listNews?.length > 0 && (
                            <div className="w-full md:w-1/2 p-2 flex flex-col gap-4">
                                <NavLink to={`/news/${listNews[0]?.id}`} className="flex flex-col justify-center gap-4">
                                    <div className="w-full border borber-gray-300 p-2 rounded-md">
                                        <img src={`${serverPublic}images/news/${listNews[0]?.news_image}`} className="object-cover w-full" alt="" />
                                    </div>
                                    <h4 className="text-base fount-semibold hover:underline transiton-all duration-150 ease-in-out text-blue-600 uppercase hover:text-red-600">
                                        {listNews[0]?.news_name.length > 60 ? listNews[0].news_name.slice(0, 60) + "..." : listNews[0].news_name}
                                    </h4>
                                </NavLink>
                                <p className="text-gray-500/75 text-xs italic">{listNews[0].created_at}</p>
                                <p className="text-sm text-textColor">
                                    {listNews[0]?.news_desc > 100 ? listNews[0]?.news_desc.slice(0, 150) + "..." : listNews[0]?.news_desc}
                                </p>
                            </div>
                        )}

                        {/* right */}
                        <div className="w-full md:w-1/2 p-2 flex flex-col items-center justify-center gap-4">
                            {arrNews?.length > 0 && arrNews.map((news, index) => (
                                <div key={index} className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <NavLink to={`/news/${news?.id}`} className="flex items-center justify-center gap-4 ">
                                        <div className="w-full border borber-gray-300 p-2">
                                            <img src={`${serverPublic}images/news/${news?.news_image}`} className="object-cover w-full" alt="" />
                                        </div>
                                    </NavLink>
                                    <div className="">
                                        <NavLink to={`/news/${news?.id}`} className="flex flex-col justify-center gap-4">

                                            <h4 className="text-base fount-semibold hover:underline transiton-all duration-150 ease-in-out text-blue-600 uppercase hover:text-red-600">
                                                {news?.news_name.length > 60 ? news.news_name.slice(0, 60) + "..." : news.news_name}
                                            </h4>
                                        </NavLink>
                                        <p className="text-gray-500/75 text-xs italic">{news.created_at}</p>
                                        <p className="text-sm text-textColor">
                                            {news?.news_desc.length > 150 ? news?.news_desc.slice(0, 150) + "..." : news?.news_desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full">
                    {/*  */}
                </section>

                <section className="w-full p-4">
                    <div className="flex items-center justify-between p-4 border-b border-gray-300">
                        <h4 className=" text-lg font-bold uppercase">Đối tác</h4>
                    </div>
                    <div className="flex flex-wrap items-center justify-evenly gap-4 mt-4">
                        {listBrand?.length > 0 && listBrand.map((brand, index) => (
                            <div key={index} className="shadow-md border border-gray-300 rounded-md p-2 flex flex-col items-center justify-center gap-4">
                                <img src={`${serverPublic}/images/brand/${brand?.brand_image}`} className="w-275 h-150" alt="" />

                                <p className="text-xl text-textColor font-semibold">{brand?.brand_name}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </Body>
            <Footer />
        </div>
    )
}

export default Home
