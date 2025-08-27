import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./Carousel.css";

const images = [
  "/carousel/img1.jpg",
  "/carousel/img2.png",
  "/carousel/img3.png",
  "/carousel/img4.png",
  "/carousel/img5.png",
];

export default function Carousel() {
  return (
    <div className="carousel-wrapper">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="carousel">
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="carousel-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
