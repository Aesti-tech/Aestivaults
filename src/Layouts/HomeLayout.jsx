import { useEffect, useState, useRef } from "react";
import styles from "../modules/HomeLayout.module.css";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../ui/NavBar";
import SideNavigation from "../ui/SideNavigation";
import useGetUser from "../hooks/useGetUser";
import SpinnerFullPage from "../ui/SpinnerFullPage";
import Footer from "./Footer";

function HomeLayout() {
  const { isLoading, isAuthenticated } = useGetUser();
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

  const mainContainerRef = useRef(null);

  useEffect(() => {
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo({ top: 0 });
    }
  }, [location.pathname]);

  useEffect(() => {
    const updateNavVisibility = () => {
      if (isAuthenticated && window.innerWidth > 450) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    updateNavVisibility();

    window.addEventListener("resize", updateNavVisibility);

    return () => {
      window.removeEventListener("resize", updateNavVisibility);
    };
  }, [isAuthenticated]);

  if (isLoading) return <SpinnerFullPage />;

  const position = location.pathname;
  const showFooter =
    position === "/" || position === "/explore" || position === "/market";

  return (
    <div className={styles.wrapper}>
      {showNav && <SideNavigation />}
      <div className={styles.mainContainer} ref={mainContainerRef}>
        <NavBar showNav={showNav} />

        <div
          style={{
            paddingLeft: showNav ? "6rem" : "0",
          }}
          className={styles.container}
        >
          <Outlet />
          {showFooter && <Footer />}
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
