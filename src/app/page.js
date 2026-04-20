import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Rides from "@/components/Rides/Rides";
import Services from "@/components/Services/Services";
import GetInto from "@/components/GetInto/GetInto";
import Rooms from "@/components/Rooms/Rooms";
import Foods from "@/components/Foods/Foods";
import YoutubeVideos from "@/components/YoutubeVideos/YoutubeVideos";
import CTABanner from "@/components/CTABanner/CTABanner";
import Footer from "@/components/Footer/Footer";
import LandingImage from "@/components/LandingImage/LandingImage";

export default function Home() {
  return (
    <>
  <Navbar />
  <Hero />
  <Services />
  <Rides />
  <GetInto />
  <Rooms />
  <Foods />
  {/* <YoutubeVideos /> */}
  <CTABanner />
  <Footer />
  </>
  );
}
