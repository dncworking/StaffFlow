import style from "./Employees.module.css";

function Employees({ employees, onDelete }) {
  return (
    <div className={style.card}>
      <div className={style.header}>
        <img className={style.img} src={employees.photo} alt="profile" />
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
          <button className={style.btnEdit}>📝</button>
          <button
            className={style.btnDelete}
            onClick={() => onDelete(employees.id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
export default Employees;
