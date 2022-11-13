import { useEffect, useState } from "react";
import { Header, Footer, Body, AddressFrom, PaymentForm } from "../../../components";
import { useStateValue } from "../../../context/StateProvider";

const Checkout = () => {
    const steps = ["Shipping address", "Payment details"];
    const [activeStep, setActiveStep] = useState(1);
    const [context, dispatch] = useStateValue();
    useEffect(() => {
        if (context.user === null) {
            setActiveStep(1);
        } else {

        }
    }, []);


    return (
        <div className="w-full ">
            <Header />
            <Body>
                <div className="bg-white w-full flex items-center justify-center">
                    <div className="bg-primary rounded-md shadow-md px-2 py-4 flex items-start justify-center flex-col gap-4">
                        <h1 className="text-textColor text-2xl font-semibold text-center w-full">Checkout</h1>
                        <div className="flex items-center justify-center gap-2">
                            {steps && steps.map((step, index) => (
                                <div key={step} className="flex items-center justify-center gap-2">
                                    <div className={`flex items-center justify-center p-2 w-6 h-6 rounded-full text-white ${activeStep === index + 1 ? "bg-blue-500" : "bg-gray-300"}`}>
                                        {index + 1}
                                    </div>
                                    <p className="text-textColor">{step}</p>
                                    {index === 0 && (
                                        <div className="w-150 h-0.5 bg-gray-300"></div>
                                    )}
                                </div>
                            ))}

                        </div>

                        {activeStep === 1 && (<>
                            <AddressFrom activeStep={activeStep} setActiveStep={setActiveStep} />
                        </>)}
                        {activeStep === 2 && (<>
                            <PaymentForm activeStep={activeStep} setActiveStep={setActiveStep} />

                        </>)}
                    </div>
                </div>
            </Body>
            <Footer />
        </div>
    )
}

export default Checkout