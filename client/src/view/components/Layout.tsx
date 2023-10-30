import { Outlet } from "react-router-dom";
import BackToTop from "../pages/mainPages/BackToTop";
import Footer from "../pages/mainPages/Footer";
import WhatsAppButton from '../pages/mainPages/WhatsAppButton';
const Layout = () => {
  const isDashboardRoute = window.location.pathname.startsWith("/Dashbord");
  return (
    <>
      {!isDashboardRoute && <BackToTop />}
      <div>
      <Outlet />
      </div>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Layout;
