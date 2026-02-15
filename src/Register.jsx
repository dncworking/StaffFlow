import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "./RegANDLog.module.css";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (data) => {
    localStorage.setItem("adminUser", JSON.stringify(data));
    toast.success("Paskyra sėkmingai sukurta! Nukreipiame...", {
      duration: 2000,
      icon: "🚀",
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    console.log("Sekmingai uzregistruota", data);
  };

  return (
    <div className={style.main}>
      <h2 className={style.h2}>Registracija</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        {/* <label className={style.label}>Vardas</label> */}
        <input
          className={style.input}
          placeholder="Vardas"
          type="text"
          {...register("firstName", { required: "Vardas butinas" })}
        />
        {errors.firstName && (
          <span className={style.error}>{errors.firstName.message}</span>
        )}
        {/* <label className={style.label}>Pavarde</label> */}
        <input
          placeholder="Pavardė"
          className={style.input}
          type="text"
          {...register("lastName", { required: "Pavarde butina" })}
        />
        {errors.lastName && (
          <span className={style.error}>{errors.lastName.message}</span>
        )}
        {/* <label className={style.label}>El. Pastas</label> */}
        <input
          className={style.input}
          placeholder="El. paštas"
          type="text"
          {...register("email", {
            required: "Pastas butinas",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Neteisingas el. pašto formatas",
            },
          })}
        />
        {errors.email && (
          <span className={style.error}>{errors.email.message}</span>
        )}
        {/* <label className={style.label}>Imones pavadinimas</label> */}
        <input
          className={style.input}
          placeholder="Įmonės pavadinimas"
          type="text"
          {...register("name", {
            required: "Imones pavadinimas privalomas!",
          })}
        />
        {errors.name && (
          <span className={style.error}>{errors.name.message}</span>
        )}
        {/* <label className={style.label}>Slaptazodis</label> */}
        <input
          className={style.input}
          placeholder="Slaptažodis"
          type="password"
          {...register("password", {
            required: "Slaptazodis privalomas",
            pattern: {
              value: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
              message:
                "Slaptazodis privalo tureti maziausei 8 simbolius, didziaja raide bei skaiciu",
            },
          })}
        />
        {errors.password && (
          <span className={style.error}>{errors.password.message}</span>
        )}
        {/* <label className={style.label}>Pakartokite slaptazodi</label> */}
        <input
          className={style.input}
          placeholder="Pakartokite slaptažodį"
          type="password"
          {...register("confirmPassword", {
            required: "Slaptazodis privalomas",
            validate: (val) =>
              val === getValues("password") || "Slaptazodziai nesutampa",
          })}
        />
        {errors.confirmPassword && (
          <span className={style.error}>{errors.confirmPassword.message}</span>
        )}
        <button type="submit" className={style.button}>
          Sukurti Paskyra
        </button>
      </form>
    </div>
  );
};
export default Register;
