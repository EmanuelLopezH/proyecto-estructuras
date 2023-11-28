"use client";
import "./page.css";
import NavBar from "../components/NavBar";
import Select from "react-select";

export default function devolutions() {
  const handdleUserChange = (e) => {
    setSelectedBook(e);
    setCredentials({
      ...credentials,
      user_name: e.value,
    });
  };
  return (
    <div>
      <NavBar></NavBar>
      <div className="return-book">
        <form className="form-return">
          <h2>Retunrning date of the book</h2>
          <p>Loans actives</p>
          <Select
            isSearchable={true}
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "white",
                color: "white",
                border: "none",
                // Agrega aquí los estilos adicionales que desees aplicar al control
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
            name=""
            id=""
          />
        </form>
      </div>
    </div>
  );
}
