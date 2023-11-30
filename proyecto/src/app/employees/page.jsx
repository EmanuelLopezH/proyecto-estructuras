"use client";
import NavBar from "../components/NavBar";
import TableEmployees from "../components/TableEmployees";
// import EmployeesData from "@/app/db/employees.json";
import { useState, useEffect } from "react";
import "./page.css";
import Image from "next/image";

export default function Employees() {
  const images = [
    "/Style1.svg",
    "/Style2.svg",
    "/Style3.svg",
    "/Style4.svg",
    "/Style5.svg",
    "/Style6.svg",
  ];
  const randomImage = Math.floor(Math.random() * images.length);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee`).then((response) => {
      response.json().then((data) => {
        setEmployees(data);
      });
    });
  }, []);
  const pickRandomEmployees = (employees, n) => {
    // ! Important function
    return shuffled.slice(0, n);
  };
  //console.log(pickRandomEmployees(employees, 5));
  return (
    <div className="main">
      <NavBar></NavBar>
      <div className="employees">
        {employees.slice(0, 8).map((employee) => {
          const randomImage = Math.floor(Math.random() * images.length);
          const shuffled = employees.sort(() => 0.7 - Math.random());
          return (
            <div key={employee.id}>
              <Image
                src={images[randomImage]}
                alt=""
                width={"200"}
                height={"200"}
              ></Image>
              <p>{employee.name}</p>
            </div>
          );
        })}
      </div>

      <div className="info">
        <h1>Employees</h1>
        <br />
        <TableEmployees EmployeesData={employees} />
      </div>
      <div className="buttons">
        <button className="btn">Hire</button>
        <button className="btn">Fire</button>
      </div>
    </div>
  );
}
