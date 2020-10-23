import React from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.scss';


// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y ,Autoplay} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import "./index.scss"

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,Autoplay]);

function Banner(){

    const imagelist = [
        require("../../images/banner/timg-1.jpg"),
        require("../../images/banner/timg-2.jpg"),
        require("../../images/banner/timg-3.jpg"),
        require("../../images/banner/timg-4.jpg")
    ]

    let setting = {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
        }

    return (
        <div className="banner-container">
            <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log("onSwiper:",swiper)}
            pagination={{ clickable: true }}
            autoplay={setting}
            loop={true}
            loopAdditionalSlides ={2}
            >
                {/* <SwiperSlide>slide 1</SwiperSlide> */}
                {
                    imagelist.map((one,index)=>{
                        return (
                            <SwiperSlide key={`slide-${index}`}>
                        <img src={one}/>
                        </SwiperSlide>  
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

export default Banner;