import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, Footer, Body, Cart } from "../../../components";
import { serviceContent } from "../../../utils/serviceContent";


const Service = () => {
    const [tabContent, setTabContent] = useState(serviceContent[0]);
    return (
        <div className="w-full">
            <Header />
            <Body>
                <div className="h-screen flex flex-wrap justify-center">
                    <div className="w-full md:w-1/3 flex flex-col items-center gap-4 p-2">
                        {serviceContent.map((service, index) => (
                            <div key={index} className={`relative overflow-hidden bg-gray-300 rounded-md shadow-md cursor-pointer w-225 border-2 ${tabContent === service ? "border-blue-600" : "border-gray-300"}`}
                                onClick={() => setTabContent(service)}
                            >
                                <img src={service.image} className="object-cover rounded-md w-full h-full" alt="" />
                                <div className="absolute bg-gray-600/50 top-0 left-0 w-full h-full flex items-center justify-center gap-4 p-4">
                                    <i>{service.icon}</i>
                                    <h4 className="text-white text-lg">{service.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full xl:w-2/3 p-2">
                        <p className="text-xl">{tabContent.content}</p>
                        <ul className="">
                            {tabContent.list.map((item, index) => (
                                <li key={index} className="text-lg">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Body>
            <Footer />
        </div>
    )
}

export default Service
