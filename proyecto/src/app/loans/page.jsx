"use client";

import "./page.css";

import NavBar from "../components/NavBar";
import Select from "react-select";
import books from "@/app/db/books.json";
import employees from "@/app/db/employees.json";
import { useState } from "react";

export default function LoansPage() {
  const [selectEmployee, setSelectedEmployee] = useState();
  const [selectedBook, setSelectedBook] = useState();

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  const employeeOptions = employees.map((employee) => ({
    value: employee.id,
    label: employee.name,
  }));

  const bookOptions = books.map((book) => ({
    value: book.book_id,
    label: book.title,
  }));

  const [credentials, setCredentials] = useState({
    id: `${generateId()}`,
    employee_id: "",
    user_name: "",
    book_id: "",
    loan_date: "",
  });

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
      loan_date: credentials.loan_date.replace("T", " ") + ":00",
    };

    console.log(parsedCredentials); // ! Remove this line
  };

  return (
    <div>
      <NavBar></NavBar>
      <h1>Book Loans</h1>
      <form className="form" onSubmit={handdleSubmit}>
        <p>Employee</p>
        <Select
          className="select"
          options={employeeOptions}
          value={selectEmployee}
          isSearchable={true}
          onChange={handdleEmployeeChange}
          required
          styles={{
            menu: (provided) => ({
              ...provided,
              backgroundColor: "black",
            }),
            option: (provided, state) => ({
              ...provided,
              ":hover": {
                backgroundColor: "green",
              },
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
        <input
          type="datetime-local"
          name="loan_date"
          value={credentials.loan_date}
          onChange={handdleChange}
          required
        />
        <button type="submit" required>
          Submit
        </button>
      </form>
    </div>
  );
}
