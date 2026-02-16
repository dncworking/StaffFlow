import { useState, useEffect } from "react";
import { getAllData } from "./services/add";
import Employees from "./Employees";
import style from "./EmployeesList.module.css";
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
    <div className={style.container}>
      {employees.map((person) => (
        <Employees employees={person} key={person.id} />
      ))}
    </div>
  );
}
export default EmployeesList;
