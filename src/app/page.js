import Banner from "@/components/home/Banner";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Reviews from "@/components/home/Reviews";
import TopLocations from "@/components/home/TopLocations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import SearchBar from "@/components/home/SearchBar";
import Image from "next/image";
import RecentProperties from "@/components/home/RecentProperties";

export default function Home() {
  return (
    <main>
      <Banner />
      <SearchBar />
      <FeaturedProperties />
      <WhyChooseUs />
      <Reviews />
      <TopLocations />
      <RecentProperties />
    </main>
  );
}
