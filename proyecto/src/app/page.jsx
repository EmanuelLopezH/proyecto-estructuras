"use client";
import NavBar from "./components/NavBar";
import "./page.css";
import { useEffect, useState, useRef } from "react";
import Typed from "typed.js";

export default function HomePage() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Pages between shelves, where silence whispers literary secrets.",
        "In the library, each book is a passport to an unknown world",
        "Letters are hidden treasures; the library, my golden chest.",
        "Between bookshelves, I find the melody of words.",
        "Among bookshelves, I find the melody of dancing words.",
        "Among bookshelves, I find the melody of dancing words.",
        "In the library, my mind is an adventurer without limits or boundaries.",
      ],
      typeSpeed: 75,
      backSpeed: 50,
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
