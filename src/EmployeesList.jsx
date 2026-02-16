import { useState, useEffect } from "react";
import { getAllData } from "./services/add";
import Employees from "./Employees";

function EmployeesList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await getAllData();
        setEmployees(result);
      } catch (error) {
        console.error("Nepavyko užkrauti:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      {employees.map((employees) => (
        <Employees employees={employees} key={employees.id} />
      ))}
    </div>
  );
}
export default EmployeesList;
