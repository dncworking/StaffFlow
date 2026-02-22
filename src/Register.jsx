import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "./Forms.module.css";

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
    console.log("Sėkmingai užsiregistruota", data);
  };

  return (
    <div className={style.main}>
      <h2 className={style.h2}>Registracija</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
     
        <input
          className={style.input}
          placeholder="Vardas"
          type="text"
          {...register("firstName", { required: "Vardas yra privalomas" })}
        />
        {errors.firstName && (
          <span className={style.error}>{errors.firstName.message}</span>
        )}
  
        <input
          placeholder="Pavardė"
          className={style.input}
          type="text"
          {...register("lastName", { required: "Pavardė yra privaloma" })}
        />
        {errors.lastName && (
          <span className={style.error}>{errors.lastName.message}</span>
        )}
       
        <input
          className={style.input}
          placeholder="El. paštas"
          type="text"
          {...register("email", {
            required: "Paštas yra privalomas",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Neteisingas el. pašto formatas",
            },
          })}
        />
        {errors.email && (
          <span className={style.error}>{errors.email.message}</span>
        )}
        
        <input
          className={style.input}
          placeholder="Įmonės pavadinimas"
          type="text"
          {...register("name", {
            required: "Įmonės pavadinimas yra privalomas",
          })}
        />
        {errors.name && (
          <span className={style.error}>{errors.name.message}</span>
        )}
        
        <input
          className={style.input}
          placeholder="Slaptažodis"
          type="password"
          {...register("password", {
            required: "Slaptažodis yra privalomas",
            pattern: {
              value: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
              message:
                "Slaptažodis privalo turėti mažiausiai 8 simbolius, didžiaja raide bei skaičiu",
            },
          })}
        />
        {errors.password && (
          <span className={style.error}>{errors.password.message}</span>
        )}
      
        <input
          className={style.input}
          placeholder="Pakartokite slaptažodį"
          type="password"
          {...register("confirmPassword", {
            required: "Slaptazodis privalomas",
            validate: (val) =>
              val === getValues("password") || "Slaptažodžiai nesutampa",
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
