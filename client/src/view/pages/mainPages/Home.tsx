import InstegramImageList from "./InstagramPosts";
import CarouselPic from "./CarouselPic";
import { Outlet } from "react-router-dom";
import About from "./About";
import ContactPage from "./ContactForm";
// import MapPage from "./MapPage";

export default function Home() {
  return (
    <>
      <CarouselPic />
      <main >
        <About />
        <ContactPage />
        {/* <MapPage /> */}
        <InstegramImageList />
      </main>
      <Outlet />
    </>
  );
}
