"use client";

import "./page.css";

import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import Select from "react-select";

export default function Devolutions() {
  const [bodyJson, setBodyJson] = useState({});
  const [selectedLoan, setSelectedLoan] = useState();
  const [loansOptions, setLoansOptions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/loan/return`).then(
      (loansResponse) => {
        loansResponse.json().then((loans) => {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`).then(
            (booksResponse) => {
              booksResponse.json().then((books) => {
                setLoansOptions(
                  loans.map((loan) => ({
                    value: loan.id,
                    label:
                      loan.user_name +
                      " - " +
                      returnBookTitle(books, loan.book_id),
                    devolution_date: loan.devolution_date,
                    loan_date: loan.loan_date.slice(0, -3),
                  }))
                );
              });
            }
          );
        });
      },
      []
    );
  }, []);

  const returnBookTitle = (books, id) => {
    const book = books.find((book) => book.book_id === id);
    return book?.title;
  };

  const handdleLoanChange = (e) => {
    setSelectedLoan(e);
  };
  const handdleChange = (e) => {
    setBodyJson({
      ...bodyJson,
      [e.target.name]: e.target.value,
    });
  };
  const handdleSubmit = (e) => {
    e.preventDefault();
    const parsedBody = {
      ...bodyJson,
      devolution_date: selectedLoan.devolution_date,
      return_date: e.target[1].value + ":00",
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/loan/${selectedLoan.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedBody),
    }).then((response) => {
      if (response.ok) {
        alert("Book returned successfully");
        response.json().then((data) => {
          console.log({ id: selectedLoan.value, id1: loansOptions[0].value });
          setLoansOptions(
            loansOptions.filter((loan) => loan.value !== selectedLoan.value)
          );
          setBodyJson({
            devolution_date: "",
            return_date: "",
          });
          setSelectedLoan("");
        });
      } else {
        console.log("Error returning book");
      }
    });
  };
  return (
    <div>
      <NavBar></NavBar>

      <form className="form-return" onSubmit={handdleSubmit}>
        <h1>Book return date</h1>
        <p>Loans actives</p>
        <Select
          className="select"
          required
          value={selectedLoan}
          options={loansOptions}
          onChange={handdleLoanChange}
          isSearchable={true}
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
        <p>Set the date when the book was returned</p>
        <input
          type="datetime-local"
          className="input-date-return"
          required
          name="return_date"
          onChange={handdleChange}
          value={bodyJson.return_date}
          min={selectedLoan?.loan_date}
        />
        <button className="btn-return" type="submit">
          Return Book
        </button>
      </form>
    </div>
  );
}
