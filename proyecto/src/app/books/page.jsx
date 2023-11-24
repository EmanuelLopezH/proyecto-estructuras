"use client";

import "./page.css";

import Bookshelves from "../components/Bookshelves";
import NavBar from "../components/NavBar";
import books_ from "@/app/db/books.json";

export default function books() {
  const range = (start, end) => {
    return Array(end - start + 1)
      .fill(0)
      .map((_, idx) => start + idx);
  };

  return (
    <div>
      <NavBar></NavBar>
      <h1>Our Library</h1>
      <div className="bookshelves">
        <Bookshelves range={range(1, 8)}></Bookshelves>
        <Bookshelves range={range(9, 16)}></Bookshelves>
        <Bookshelves range={range(17, 24)}></Bookshelves>
      </div>
    </div>
  );
}
