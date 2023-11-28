"use client";
import Link from "next/link";
import React from "react";
import "./NavBar.css";
import { useState } from "react";
import Image from "next/image";
import { Lobster } from "next/font/google";

export default function NavBar() {
  const [imagenLogo, setImagenLogo] = useState("/logo.svg");

  const cambiarLogo = () => {
    setImagenLogo((prevLogo) =>
      prevLogo === "/logo.svg" ? "/logo-hoover.svg" : "/logo.svg"
    );
  };

  return (
    <div>
      <div className="navbar">
        <Link id="links" href={"/"}>
          <Image
            priority
            src={imagenLogo}
            onMouseOver={cambiarLogo}
            onMouseOut={cambiarLogo}
            width={"120"}
            height={"120"}
            alt=""
          ></Image>
        </Link>
        <Link id="links" href={"/employees"}>
          <p className="link">Employees</p>
        </Link>
        <Link id="links" href={"/books"}>
          <p className="link">Books</p>
        </Link>
        <Link id="links" href={"/loans"}>
          <p className="link">Loans</p>
        </Link>
        <Link id="links" href={"/devolutions"}>
          <p className="link">Devolutions</p>
        </Link>
      </div>
    </div>
  );
}
