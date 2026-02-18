import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
function NavBar({ onSearch }) {
  const navigate = useNavigate();

  return (
    <nav className={style.navbar}>
      <div className={style.wrapper}>
        <input
          type="text"
          placeholder="Ieškoti darbuotojo..."
          className={style.input}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button
          className={style.button}
          onClick={() => navigate("/addEmployeeForm")}
        >
          Pridėti darbuotoją
        </button>
      </div>
    </nav>
  );
}
export default NavBar;
