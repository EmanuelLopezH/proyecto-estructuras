"use client";
import Link from "next/link";
import React from "react";
import "./NavBar.css";
import { useState } from "react";
import { Lobster } from "next/font/google";

export default function NavBar() {
  const [imagenFuente, setImagenFuente] = useState("/github.svg");
  const [imagenLogo, setImagenLogo] = useState("/logo.svg");

  const cambiarLogo = () => {
    setImagenLogo((prevLogo) =>
      prevLogo === "/logo.svg" ? "/logo-hoover.svg" : "/logo.svg"
    );
  };

  const cambiarImagen = () => {
    setImagenFuente((prevFuente) =>
      prevFuente === "/github.svg" ? "/github-hoover.svg" : "/github.svg"
    );
  };
  return (
    <div>
      <div className="navbar">
        <Link id="links" href={"/"}>
          <img
            src={imagenLogo}
            onMouseOver={cambiarLogo}
            onMouseOut={cambiarLogo}
            width={"120"}
            height={"120"}
            alt=""
          />
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
        <img
          className="logo"
          width="50"
          height="50"
          onMouseOver={cambiarImagen}
          onMouseOut={cambiarImagen}
          src={imagenFuente}
          alt="github"
        />
      </div>
    </div>
  );
}
