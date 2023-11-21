"use client";
import Link from "next/link";
import React from "react";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div>
      <div className="navbar">
        <Link id="links" href={"/"}>
          <img src={"./logo.svg"} width={"120"} height={"120"} alt="" />
        </Link>
        <Link id="links" href={"/employees"}>
          <p>Employees</p>
        </Link>
        <Link id="links" href={"/books"}>
          <p>Books</p>
        </Link>
        <Link id="links" href={"/loans"}>
          <p>Loans</p>
        </Link>
        <img width="48" height="48" src="/github.svg" alt="github" />
      </div>
    </div>
  );
}
