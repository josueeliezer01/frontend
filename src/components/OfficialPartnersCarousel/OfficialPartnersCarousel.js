// OfficialPartnersCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./OfficialPartnersCarousel.css";

const logos = [
  { id: "benfica", src: "/logos/benfica.svg" },
  { id: "milan", src: "/logos/milan.svg" },
  { id: "borussia-dortmund", src: "/logos/borussia-dortmund.svg" },
  { id: "botafogo", src: "/logos/botafogo.svg" },
  { id: "boston-celtics", src: "/logos/boston-celtics.svg" },
  { id: "vasco", src: "/logos/vasco.svg" },
  { id: "golden-state-warriors", src: "/logos/golden-state-warriors.svg" },
  { id: "ifbb", src: "/logos/ifbb.png" },
  { id: "los-angeles-lakers", src: "/logos/los-angeles-lakers.svg" },
  { id: "x-games", src: "/logos/x-games.svg" },
  // adicione mais conforme necessário
];

export default function OfficialPartnersCarousel() {
  return (
    <section className="partners-carousel-section">
      <h2 className="partners-title">PARCEIROS OFICIAIS</h2>
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        slidesPerView={5}
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 3, spaceBetween: 5 },
          480: { slidesPerView: 4, spaceBetween: 10 },
          768: { slidesPerView: 5, spaceBetween: 15 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
        }}>
        {logos.map(({ id, src }) => (
          <SwiperSlide
            className="logo-slide"
            key={id}>
            <div className="logo-wrapper">
              <img
                src={src}
                alt={id}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
