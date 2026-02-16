import { useState, useEffect } from "react";
import { getAllData } from "./services/add";
import { deleteDate } from "./services/delete";
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

  const handleDelete = async (id) => {
    if (window.confirm("Ar tikrai norite ištrinti šį darbuotoją?"))
      try {
        await deleteDate(id);
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== id),
        );
        alert("Darbuotojas sekmingai pašalintas");
      } catch (error) {
        alert("Nepavyko istrinti pokemono.", error);
      }
  };

  return (
    <div className={style.container}>
      {employees.map((person) => (
        <Employees employees={person} key={person.id} onDelete={handleDelete} />
      ))}
    </div>
  );
}
export default EmployeesList;
