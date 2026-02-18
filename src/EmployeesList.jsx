import { useState, useEffect } from "react";
import { getAllData } from "./services/get";
import { deleteDate } from "./services/delete";
import Employees from "./Employees";
import NavBar from "./NavBar";
import style from "./EmployeesList.module.css";

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await getAllData();

        setEmployees(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Klaida:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Ar tikrai norite ištrinti šį darbuotoją?")) {
      try {
        await deleteDate(id);
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== id),
        );
      } catch (error) {
        alert("Nepavyko ištrinti darbuotojo.", error);
      }
    }
  };


  const filteredEmployees = employees.filter((person) => {
    const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <>

      <NavBar onSearch={setSearchQuery} />

      <div className={style.container}>

        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((person) => (
            <Employees
              employees={person}
              key={person.id}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p
            style={{ color: "white", textAlign: "center", gridColumn: "1/-1" }}
          >
            {searchQuery
              ? "Nėra darbuotojų, atitinkančių paiešką"
              : "Kraunama..."}
          </p>
        )}
      </div>
    </>
  );
}

export default EmployeesList;
