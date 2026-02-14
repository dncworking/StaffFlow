import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Login = () => {
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
      navigate("/dashboard");
    } else {
      setError("loginError", {
        type: "manual",
        message: "Neteisingas el. paštas arba slaptažodis",
      });
    }
  };

  return (
    <div>
      <h2>Prisijungimas</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>El. Pastas</label>
        <input
          type="text"
          {...register("email", { required: "Įveskite el. paštą" })}
        />
        <label>Slaptazodis</label>
        <input
          type="password"
          {...register("password", { required: "Įveskite slaptažodį" })}
        />
        {errors.loginError && <p>{errors.loginError.message}</p>}
        <button type="submit">Prisijungti</button>
      </form>
    </div>
  );
};
export default Login;
