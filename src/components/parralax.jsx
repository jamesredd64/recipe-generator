import React, { useState, useEffect } from "react";
import "./Parallax.css";

const Parallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="parallax-container">
      <div
        className="parallax-background"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      ></div>
      <div className="parallax-content">
        <h1>Parallax Effect</h1>
        <p>Scroll down to see the effect.</p>
      </div>
    </div>
  );
};

export default Parallax;
