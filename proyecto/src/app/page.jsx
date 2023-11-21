"use client";
import NavBar from "./components/NavBar";
import "./page.css";
import { useEffect, useState, useRef } from "react";
import Typed from "typed.js";

export default function HomePage() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Library suggestions", "For every library in the world"],
      typeSpeed: 75,
      backSpeed: 75,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <div className="info">
        <h1>Library Suggestions</h1>
        <div className="typing">
          <span ref={el}></span>
        </div>
      </div>
    </div>
  );
}
