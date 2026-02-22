import style from "./Employees.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Employees({ employees, onDelete }) {
  const [showContacts, setShowContacts] = useState(false);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit/${employees.id}`);
  };
  return (
    <div className={style.card}>
      <div className={style.header}>
        <img
          className={style.img}
          src={employees.image}
          alt={employees.firstName}
        />
        <div className={style.badge}>{employees.department}</div>
      </div>

      <div className={style.content}>
        <h3 className={style.name}>
          {employees.firstName} {employees.lastName}
        </h3>
        <p className={style.position}>{employees.position}</p>

        <div className={style.stats}>
          <div className={style.statItem}>
            <span className={style.label}>Atlyginimas</span>
            <span className={style.value}>{employees.salary} €</span>
          </div>
        </div>

        <div className={style.buttons}>
          <button className={style.btnEdit} onClick={handleEdit}>
            📝
          </button>
          <button
            className={style.btnDelete}
            onClick={() => onDelete(employees.id)}
          >
            🗑️
          </button>
          <button onClick={() => setShowContacts(!showContacts)}>...</button>
        </div>
      </div>
      <div
        className={`${style.drawer} ${showContacts ? style.drawerOpen : ""}`}
      >
        <button
          className={style.btnClose}
          onClick={() => setShowContacts(false)}
        >
          ×
        </button>

        <div className={style.drawerContent}>
          <h3>Kontaktai</h3>
          <div className={style.contactDetail}>
            <span>📞 Telefonas:</span>
            <p>{employees.phone}</p>
          </div>
          <div className={style.contactDetail}>
            <span>📧 El. paštas:</span>
            <p>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${employees.email}`}
                target="_blank"
              >
                {employees.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      {showContacts && (
        <div className={style.overlay} onClick={() => setShowContacts(false)} />
      )}
    </div>
  );
}
export default Employees;
