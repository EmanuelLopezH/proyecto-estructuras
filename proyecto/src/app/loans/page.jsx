"use client";

import "./page.css";

import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import Select from "react-select";

// import books from "@/app/db/books.json";
// import employees from "@/app/db/employees.json";

export default function LoansPage() {
  const [employees, setEmployees] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectEmployee, setSelectedEmployee] = useState();
  const [selectedBook, setSelectedBook] = useState();
  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  const [credentials, setCredentials] = useState({
    id: `${generateId()}`,
    employee_id: "",
    user_name: "",
    book_id: "",
    loan_date: `${new Date().toISOString()}`,
    devolution_date: `${new Date().toISOString()}`,
    return_date: `${new Date().toISOString()}`,
    week_day: "String",
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee`)
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`)
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const employeeOptions = employees.map((employee) => ({
    value: employee.id,
    label: employee.name,
  }));
  const bookOptions = books.map((book) => ({
    value: book.book_id,
    label: book.title,
    suggestion: book.Suggestion,
  }));
  const handdleEmployeeChange = (e) => {
    setSelectedEmployee(e);
    setCredentials({
      ...credentials,
      employee_id: e.value,
    });
  };
  const handdleBookChange = (e) => {
    setSelectedBook(e);
    setCredentials({
      ...credentials,
      book_id: e.value,
    });
  };
  const handdleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handdleSubmit = async (e) => {
    e.preventDefault();

    const parsedCredentials = {
      ...credentials,
      devolution_date: credentials.devolution_date + ":00.000Z",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/loan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedCredentials),
    }).then((response) => response.json().then((data) => console.log(data)));
    console.log("Success loan");
    setSelectedEmployee(null);
    setSelectedBook(null);
    setCredentials({
      id: `${generateId()}`,
      employee_id: "",
      user_name: "",
      book_id: "",
      devolution_date: "",
      loan_date: `${new Date().toISOString()}`,
      return_date: `${new Date().toISOString()}`,
      week_day: "String",
    });
  };

  return (
    <div>
      <NavBar></NavBar>
      <h1>Book Loans</h1>
      <form className="form-loan" onSubmit={handdleSubmit}>
        <p>Employee</p>
        <Select
          className="select"
          options={employeeOptions}
          value={selectEmployee}
          isSearchable={true}
          onChange={handdleEmployeeChange}
          required
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
        />
        <p>Book</p>
        <Select
          className="select"
          options={bookOptions}
          value={selectedBook}
          isSearchable={true}
          onChange={handdleBookChange}
          required
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
        <p>Name user</p>
        <input
          type="text"
          maxLength={40}
          name="user_name"
          value={credentials.user_name}
          onChange={handdleChange}
          required
        />
        <p>Due date</p>
        {selectedBook && (
          <p id="suggestion">
            Para este libro es recomendable un plazo máximo de{" "}
            {selectedBook?.suggestion ? selectedBook?.suggestion : "0"} días
          </p>
        )}
        <input
          className="input-date"
          type="datetime-local"
          name="devolution_date"
          value={credentials.devolution_date}
          onChange={handdleChange}
          required
        />
        <button className="btn-loans" type="submit" required>
          Submit
        </button>
      </form>
    </div>
  );
}
