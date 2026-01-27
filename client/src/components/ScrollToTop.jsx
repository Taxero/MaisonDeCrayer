import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  return null;
};

export default ScrollToTop;
