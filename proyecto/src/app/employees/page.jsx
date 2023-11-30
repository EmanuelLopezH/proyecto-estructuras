"use client";
import NavBar from "../components/NavBar";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import Select from "react-select";
import "./page.css";

export default function Employees() {
  const images = [
    "/Style1.svg",
    "/Style2.svg",
    "/Style3.svg",
    "/Style4.svg",
    "/Style5.svg",
    "/Style6.svg",
  ];
  const shuffled = (object_) => {
    object_?.sort(() => 0.5 - Math.random());
  };
  const [employees, setEmployees] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [selectedTask, setSelectedTask] = useState();
  const [areEmployees, setAreEmployees] = useState(false);
  const [day, setDay] = useState();
  const days = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];
  const daily_tasks = [
    { value: "cleaning", label: "cleaning" },
    { value: "inventory", label: "inventory" },
  ];
  const handdleSelectedDay = (e) => {
    setSelectedDay(e);
    console.log(selectedDay?.value);
  };
  const handdleSelectedTask = (e) => {
    setSelectedTask(e);
    console.log(e);
  };
  const handdleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/employees_per_day/${selectedDay?.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: selectedDay?.value,
          daily_tasks: selectedTask?.value,
          base_employees: 0,
          employees_quantity: 0,
        }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/employees_per_day/update_all`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(() => {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee`).then(
            (response) => {
              response.json().then((data) => {
                setEmployees(data);
                setAreEmployees(true);
              });
            }
          );
        });
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/employees_per_day/${selectedDay?.value}`
        ).then((response) => {
          response.json().then((data) => {
            setDay(data);
          });
        });
        console.log("Success");

        console.log(day);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="main">
      <NavBar></NavBar>
      <form className="form-employees" onSubmit={handdleSubmit}>
        <p>Select the day</p>
        <Select
          className="select"
          options={days}
          onChange={handdleSelectedDay}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "white",
              color: "white",
              border: "none",
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
            }),
            option: (provided, state) => ({
              ...provided,
              ":hover": {
                backgroundColor: "rgb(100, 64, 13)",
              },
              ...(state.isSelected && {
                backgroundColor: "rgb(100, 64, 13)",
              }),
              ...(state.theme && {
                backgroundColor: "rgb(0, 0, 0, 0.6)",
              }),
            }),
          }}
        ></Select>
        <p>Select the daily task</p>
        <Select
          className="select"
          options={daily_tasks}
          onChange={handdleSelectedTask}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "white",
              color: "white",
              border: "none",
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
            }),
            option: (provided, state) => ({
              ...provided,
              ":hover": {
                backgroundColor: "rgb(100, 64, 13)",
              },
              ...(state.isSelected && {
                backgroundColor: "rgb(100, 64, 13)",
              }),
              ...(state.theme && {
                backgroundColor: "rgb(0, 0, 0, 0.6)",
              }),
            }),
          }}
        ></Select>
        <button type="submit" className="btn-empl">
          Calculate
        </button>
      </form>
      {areEmployees && (
        <div className="employees-info">
          <h2>Base employees</h2>
          <div className="base-employees">
            {shuffled(employees)}
            {employees.slice(0, day.base_employees).map((employee) => {
              const randomImage = Math.floor(Math.random() * images.length);
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
          <h2>Total employees</h2>
          <div className="total-employees">
            {employees.slice(0, day.employees_quantity).map((employee) => {
              const randomImage = Math.floor(Math.random() * images.length);
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
        </div>
      )}
    </div>
  );
}
