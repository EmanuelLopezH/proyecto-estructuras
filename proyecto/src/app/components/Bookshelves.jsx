"use client";

import "./Bookshelves.css";

import { useRef, useState } from "react";

import { Lobster } from "next/font/google";
import { Shelf } from "@/app/components/Shelf.jsx";
import { Tilt } from "react-tilt";
import books from "@/app/db/books.json";

const lobster = Lobster({
  style: ["normal"],
  weight: ["400"],
  subsets: ["latin"],
});

export default function Bookshelves({ range }) {
  const range_ = (start_, end_) => {
    return Array(end_ - start_ + 1)
      .fill()
      .map((_, idx) => start_ + idx);
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

  const tiltRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);

  return (
    <div className="main">
      <div
        className="case"
        onClick={(e) => {
          if (e.target.className.includes("book-color")) {
            const classNames = e.target.className
              .split(" ")
              .filter((c) => c.includes("#"));
            tiltRef.current.style.backgroundColor = classNames[0];
            const book = books.find((b) => b.book_id == e.target.id);
            titleRef.current.innerHTML = book.title;
            authorRef.current.innerHTML = book.author;
          }
        }}
      >
        {range.map((shelf) => (
          <Shelf key={shelf} books={books} shelf={shelf}></Shelf>
        ))}
        <Tilt options={defaultOptions}>
          <div className="cover-page" key={books.book_id} ref={tiltRef}>
            <h4 ref={authorRef}></h4>
            <h1 className={lobster.className} ref={titleRef}></h1>
          </div>
        </Tilt>
      </div>
    </div>
  );
}
