"use client";

import "./page.css";

import { useRef, useState, useEffect } from "react";

import Bookshelves from "../components/Bookshelves";
import { Lobster } from "next/font/google";
import NavBar from "../components/NavBar";
import { Tilt } from "react-tilt";

const lobster = Lobster({
  style: ["normal"],
  weight: ["400"],
  subsets: ["latin"],
});
const api_url = process.env.API_URL;

export default function Books({}) {
  console.log(api_url);
  const tiltRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${api_url}/book`).then((response) => {
      response.json().then((data) => {
        setBooks(data);
      });
    });
  }, []);

  const [isCoverOpen, setIsCoverOpen] = useState(false);

  const range = (start, end) => {
    return Array(end - start + 1)
      .fill(0)
      .map((_, idx) => start + idx);
  };

  const handdleCoverChange = (e) => {
    if (e.target.className.includes("book-color")) {
      const classNames = e.target.className
        .split(" ")
        .filter((c) => c.includes("#"));
      tiltRef.current.style.backgroundColor = classNames[0];
      const book = books.find((b) => b.book_id == e.target.id);
      titleRef.current.innerHTML = book.title;
      authorRef.current.innerHTML = book.author;
      setIsCoverOpen(true);
    }
  };

  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <div>
      <NavBar></NavBar>
      <h1>Our Library</h1>
      <div className="bookshelves" onClick={handdleCoverChange}>
        <Bookshelves range={range(1, 8)}></Bookshelves>
        <Bookshelves range={range(9, 16)}></Bookshelves>
        <Bookshelves range={range(17, 24)}></Bookshelves>
      </div>
      <div
        className="cover-popup"
        style={{ display: isCoverOpen ? "flex" : "none" }}
        onClick={(e) => {
          if (e.target.className.includes("cover-popup")) {
            setIsCoverOpen(false);
          }
        }}
      >
        <div className="cover-container">
          <Tilt options={defaultOptions} className="container">
            <div className="cover-page" key={books.book_id} ref={tiltRef}>
              <h4 ref={authorRef}></h4>
              <h1 className={lobster.className} ref={titleRef}></h1>
            </div>
          </Tilt>

          <button
            className="cover-close-btn"
            onClick={() => {
              setIsCoverOpen(false);
            }}
            title="Close"
          >
            ✖️
          </button>
        </div>
      </div>
    </div>
  );
}
