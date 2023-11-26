"use client";

import "./Bookshelves.css";

import { Shelf } from "@/app/components/Shelf.jsx";
import books from "@/app/db/books.json";

export default function Bookshelves({ range }) {
  return (
    <div className="main">
      <div className="case">
        {range.map((shelf) => (
          <Shelf key={shelf} books={books} shelf={shelf}></Shelf>
        ))}
      </div>
    </div>
  );
}
