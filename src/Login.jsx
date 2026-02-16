import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "./RegANDLog.module.css";
const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const savedUser = JSON.parse(localStorage.getItem("adminUser"));

    if (
      savedUser &&
      savedUser.email === data.email &&
      savedUser.password === data.password
    ) {
      console.log("Prisijungta sekmingai!");
      onLoginSuccess();
      navigate("/employees");
    } else {
      setError("loginError", {
        type: "manual",
        message: "Neteisingas el. paštas arba slaptažodis",
      });
    }
  };

  return (
    <div className={style.main}>
      <h2 className={style.h2}>Prisijungimas</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <input
          className={style.input}
          placeholder="El. Paštas"
          type="text"
          {...register("email", { required: "Įveskite el. paštą" })}
        />
        {errors.email && (
          <span className={style.error}>{errors.email.message}</span>
        )}

        <input
          className={style.input}
          placeholder="Slaptažodis"
          type="password"
          {...register("password", { required: "Įveskite slaptažodį" })}
        />
        {errors.password && (
          <span className={style.error}>{errors.password.message}</span>
        )}
        {errors.loginError && (
          <p className={style.error}>{errors.loginError.message}</p>
        )}
        <button type="submit" className={style.button}>
          Prisijungti
        </button>
      </form>
    </div>
  );
};
export default Login;
