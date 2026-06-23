import Banner from "@/components/home/Banner";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Reviews from "@/components/home/Reviews";
import TopLocations from "@/components/home/TopLocations";
import WhyChooseUs from "@/components/home/Whychooseus";
import SearchBar from "@/components/home/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Banner />
      {/* <SearchBar /> */}
      <FeaturedProperties />
      <WhyChooseUs />
      <Reviews />
      <TopLocations />
      <RecentProperties />
    </main>
  );
}
