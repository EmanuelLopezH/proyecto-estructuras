import NavBar from "../components/NavBar";
import TableEmployees from "../components/TableEmployees";
import EmployeesData from "@/app/db/employees.json";
import "./page.css";

export default function employees() {
  return (
    <div className="main">
      <NavBar></NavBar>
      <div className="info">
        <h1>Employees</h1>
        <br />
        <TableEmployees EmployeesData={EmployeesData} />
      </div>
      <div className="buttons">
        <button className="button">Add</button>
        <button className="button">Edit</button>
        <button className="button">Delete</button>
      </div>
    </div>
  );
}
