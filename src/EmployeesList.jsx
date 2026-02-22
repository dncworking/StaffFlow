import { useState, useEffect } from "react";
import { getAllData } from "./services/get";
import { deleteDate } from "./services/delete";
import Employees from "./Employees";
import NavBar from "./NavBar";
import style from "./EmployeesList.module.css";

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await getAllData();

        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        const adminStatus = user?.email === "admin@admin.com";
        setIsAdmin(adminStatus);

        if (adminStatus) {
          //saugiklis, kad programa nesulužtų, jei serveris netyčia atsiųstų ne sąrašą, o ką nors kita.
          setEmployees(Array.isArray(result) ? result : []);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Klaida:", error.message);
        setEmployees([]);
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
        {!isAdmin ? (
          <p className={style.infoMessage}>Jūs neturite pridėtų darbuotojų</p>
        ) : filteredEmployees.length > 0 ? (
          filteredEmployees.map((person) => (
            <Employees
              employees={person}
              key={person.id}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className={style.infoMessage}>
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
