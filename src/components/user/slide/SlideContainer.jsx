import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useEffect, useState } from 'react';
import { getAllSlide } from '../../../utils/hepperApi';
import { serverPublic } from '../../../utils/serverPublic';

const SlideItem = ({ data }) => {

    return (
        <div className='item'>
            <img src={`${serverPublic}images/slide/${data?.slide_image}`} alt="" className="w-full h-340 object-cover" />
        </div>
    )
}

const SlideContainer = () => {
    const [listSlides, setListSlides] = useState(null);
    useEffect(() => {
        getAllSlide(4).then((res) => {
            setListSlides(res.data.message);
        })
    }, []);
    const options = {
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        autoplayTimeout: 2000,
        margin: 10,
        items: 1,
        center: true,
        dotsEach: 4,
        nav: true
    }

    return (
        <OwlCarousel className='owl-theme text-lg' {...options}>
            {listSlides && listSlides.map((slide, index) => (
                <SlideItem data={slide} key={index} />
            ))}


        </OwlCarousel>
    )
}

export default SlideContainer
