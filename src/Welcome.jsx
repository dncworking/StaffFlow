import { useNavigate } from "react-router-dom";
import style from "./Welcome.module.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className={style.main}>
        <h1 className={style.h1}>StaffFlow</h1>
        <h3 className={style.h3}>
          Moderni darbuotojų valdymo sistema jūsų verslui. Sekite savo komandą,
          valdykite duomenis ir optimizuokite procesus vienoje vietoje.
        </h3>
        <div>
          <button
            onClick={() => navigate("/register")}
            className={style.button}
          >
            Registruotis
          </button>
          <button onClick={() => navigate("/login")} className={style.button}>
            Prisijungti
          </button>
        </div>
      </main>
    </>
  );
};
export default Welcome;
