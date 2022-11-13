import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header, Footer, Body } from "../../../components";
import { getOneNews } from "../../../utils/hepperApi";
import { serverPublic } from "../../../utils/serverPublic";


const News = () => {
    const id = useParams().id;
    const [news, setNews] = useState("");

    useEffect(() => {
        getOneNews(id).then((res) => {
            if (res.data.success) setNews(res.data.message);
        });
    }, []);
    return (
        <div className="w-full">
            <Header />
            <Body>
                <div className="w-full flex flex-col gap-4 justify-center px-4 py-2">
                    <div className="w-full flex items-center justify-between p-2 border-b-2 border-gray-600">
                        <h4 className="text-headingColor text-xl font-semibold">{news.news_name}</h4>
                        <p className="text-xs text-gray-600 italic">{news.created_at}</p>
                    </div>
                    <p className="text-headingColor text-base">{news.news_desc}</p>
                    <div className="w-full flex items-center justify-center">
                        <img src={`${serverPublic}images/news/${news.news_image}`} alt="" className="object-cover w-full md:w-[650px]" />
                    </div>
                </div>
            </Body>
            <Footer />
        </div>
    )
}

export default News