import "./TableEmployees.css";

export default function TableEmployees({ EmployeesData }) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {EmployeesData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
