import Carousel from "../../components/Carousel/Carousel";
import OfficialPartnersCarousel from "../../components/OfficialPartnersCarousel/OfficialPartnersCarousel";
import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";

export default function Home() {
  return (
    <>
      <Carousel />
      <OfficialPartnersCarousel />
      <CategoriesSection />
    </>
  );
}
