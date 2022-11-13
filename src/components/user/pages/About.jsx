import { Header, Footer, Body } from "../../../components";
import Logo from "../../../assets/img/logo.png";
import Sodo from "../../../assets/img/sodo.png";

const About = () => {
    return (
        <div className="w-full">
            <Header />
            <Body>
                <div className="w-full px-4">
                    <h4 className="text-2xl text-gray-600 uppercase font-semibold mb-2">Về chúng tôi</h4>
                    <p className="text-lg text-headingColor uppercase font-semibold mb-2">GIỚI THIỆU CÔNG TY GDENT</p>
                    <p className="text-base text-headingColor uppercase font-semibold mb-2">I/ THÔNG TIN CÔNG TY:</p>
                    <ul className="">
                        <li className="text-base text-headingColor">1/ Tên chính thức: <span className="text-black font-semibold uppercse"> CÔNG TY TNHH THIẾT BỊ Y TẾ GDENT</span></li>
                        <li className="text-base text-headingColor">2/ Tên nước ngoài: GDENT CO., LTD</li>
                        <li className="text-base text-headingColor">3/ Trụ sở chính: 195 Lê Cao Lãng, Phường Phú Thạnh, Quận Tân Phú, Thành Phố Hồ Chí Minh, Việt Nam.</li>
                        <li className="text-base text-headingColor">4/ Điện thoại: (028) 38 606 607</li>
                        <li className="text-base text-headingColor">5/ Fax: (028) 38 606 607</li>
                        <li className="text-base text-headingColor">6/ Email: info@gdent.vn</li>
                        <li className="text-base text-headingColor">7/ Mã số thuế: 0315403683</li>
                        <li className="text-base text-headingColor">
                            8/ Trung tâm dịch vụ:
                            <ul>
                                <li className="text-base text-headingColor">
                                    <span className="font-semibold">
                                        • Văn phòng TP. Hồ Chí Minh:
                                    </span>

                                    Địa chỉ: 195 Lê Cao Lãng, Phường Phú Thạnh, Quận Tân Phú, Thành Phố Hồ Chí Minh, Việt Nam.
                                    Tel: (028) 38 606 607
                                </li>
                                <li className="text-base text-headingColor">
                                    <span className="font-semibold">
                                        • Văn phòng Hà Nội:
                                    </span>

                                    Địa chỉ: Phòng 701, 702, tầng 7, tòa nhà 03, Ngõ 115, Nguyễn Khang, Phường Yên Hòa, Quận Cầu Giấy, Hà Nội, Việt Nam.
                                    Tel: (024) 22 677 877
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p className="text-base text-headingColor uppercase font-semibold mb-2">II/ LOGO CÔNG TY:</p>
                    <div className="w-full flex items-center justify-center my-2">
                        <img src={Logo} alt="" className="object-cover w-300" />
                    </div>
                    <p className="text-base text-headingColor uppercase font-semibold mb-2">III/ GIỚI THIỆU SƠ LƯỢC VỀ CÔNG TY GDENT:</p>
                    <p className="text-base text-headingColor font-semibold mb-2">1/ Lịch sử hình thành và phát triển của Công ty GDENT:</p>
                    <p className="text-base text-headingColor">
                        Công ty Gia Mạnh là tiền thân của Công ty GDENT và chính thức được thành lập năm 2018.
                        Hiện nay, Công ty GDENT là một trong những công ty đi đầu tại Việt Nam hoạt động trong lĩnh vực nhập khẩu, kinh doanh các trang thiết bị, vật tư trong ngành nha khoa. GDENT chuyên cung cấp, độc quyền những vật liệu, dụng cụ và thiết bị nha khoa, là cầu nối giúp nha sĩ Việt Nam tiếp cận công nghệ mới, hiện đại, nhằm đem đến giải pháp tốt nhất để cải thiện sức khỏe răng miệng cho người Việt Nam.
                        GDENT phân phối chính thức các sản phẩm công nghệ cao của các hãng sản xuất hàng đầu thế giới đến từ Châu Âu, Mỹ, Nhật Bản, Hàn Quốc và cũng là đơn vị tiên phong triển khai và ứng dụng thành công những công nghệ kỹ thuật số cho ngành nha khoa như:
                        • Công Nghệ Lấy Dấu trực tiếp trong miệng bằng máy quét kỹ thuật số.
                        • Công Nghệ sản xuất máng hướng dẫn phẫu thuật bằng công nghệ in 3D.
                        • Công Nghệ sản xuất Máng Chỉnh Nha Không Mắc Cài với sự kết hợp giữa phần mềm, máy CBCT, máy Scan 3D, Máy in 3D, Máy Ép chân không.
                        • Công nghệ CAD/CAM trong phục hình thẩm mỹ và phục hình trên Implant.
                        Đồng thời trong việc phát triển và triển khai các giải pháp các công nghệ cho ngành, hơn hết chúng tôi hiểu rõ những tâm tư, trăn trở và khó khăn mà quý Bác sĩ và những nhà Chuyên môn gặp phải trong quá trình làm việc. Với mục tiêu mang lại “Giải Pháp Toàn Diện Cho Nha Sĩ”, công ty GDENT tự hào cung cấp các giải pháp kỹ thuật số hiện đại nhất trên thị trường hiện nay.
                        Ngoài trụ sở chính ở Hồ Chí Minh và chi nhánh Hà Nội, GDENT còn có một đội ngũ nhân viên dày dạn kinh nghiệm trong ngành, năng động, nhiệt tình, sáng tạo. Chúng tôi luôn cung cấp cho khách hàng những sản phẩm chất lượng, uy tín và những dịch vụ tốt nhất nhằm đem lại sự hài lòng tuyệt đối cho khách hàng.
                    </p>
                    <p className="text-base text-headingColor font-semibold mb-2">2/ Sơ đồ tổ chức:</p>
                    <div className="w-full flex items-center justify-center my-2">
                        <img src={Sodo} alt="" className="object-cover w-[500px]" />
                    </div>
                    <p className="text-base text-headingColor uppercase font-semibold mb-2">V/ THÔNG TIN LIÊN HỆ </p>
                    <ul className="">
                        <li className="text-base text-headingColor">Địa chỉ: 195 Lê Cao Lãng, P. Phú Thạnh, Q. Tân Phú, TP. HCM.</li>
                        <li className="text-base text-headingColor">Tel: (028) 38 606 607 </li>
                        <li className="text-base text-headingColor">Fax: (028) 38 606 607</li>
                        <li className="text-base text-headingColor">MST: 0315403683</li>
                        <li className="text-base text-headingColor">Mobile: 0938683822 </li>
                        <li className="text-base text-headingColor">Email: info@gdent.vn</li>
                    </ul>
                    <p className="text-base text-headingColor uppercase font-semibold mb-2">IV/ SỨ MỆNH – GIÁ TRỊ CỐT LÕI – PHƯƠNG CHÂM</p>
                    <ul className="">
                        <li className="text-base text-headingColor"><span className="font-semibold">Sứ mệnh:</span> Cung cấp các giải pháp hoàn thiện, hiệu quả và phù hợp với khách hàng.</li>
                        <li className="text-base text-headingColor">
                            <span className="font-semibold">Giá trị cốt lõi:</span>
                            <ul>
                                <li className="text-base text-headingColor">- Phát triển là động lực của thành công</li>
                                <li className="text-base text-headingColor">- Dịch vụ khách hàng là vượt trội</li>
                                <li className="text-base text-headingColor">- Đảm bảo chất lượng hàng đầu</li>
                            </ul>
                        </li>
                        <li className="text-base text-headingColor">
                            <span className="font-semibold">Phương châm:</span>
                            <ul>
                                <li className="text-base text-headingColor">- Uy tín</li>
                                <li className="text-base text-headingColor">- Chất Lượng</li>
                                <li className="text-base text-headingColor">- Dịch Vụ</li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </Body>
            <Footer />
        </div>
    )
}

export default About
