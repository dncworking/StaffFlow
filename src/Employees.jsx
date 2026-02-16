import React from "react";

function Employees({ employees }) {
  return (
    <div>
      <img src={employees.photo} alt={employees.name} />
      <p>{employees.firstName}</p>
      <p>{employees.lastName}</p>
    </div>
  );
}
export default Employees;
