import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import LoginModal from "../components/modals/LoginModal";

import StickyApplyButton from "../components/stickyapplybutton/StickyApplyButton";


const Layout = () => {
  return (
    <section className="app-container">
      <Header />
      
      <main className="main-section">
        {/* page-content acts as the wrapper for whatever page we are on */}
        <section className="page-content">
          <StickyApplyButton/>
          <Outlet />
        </section>
      </main>

      <Footer /> 
    </section>
  );
};

export default Layout;
