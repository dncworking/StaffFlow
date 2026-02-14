import React from "react";

import { useForm } from "react-hook-form";

const Register = ({ onRegisterSuccess }) => {
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

    console.log("Sekmingai uzregistruota", data);
    // onRegisterSuccess();
  };


  return (
    <div style={{ display: "block" }}>
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Vardas</label>
        <input
          type="text"
          {...register("firstName", { required: "Vardas butinas" })}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <label>Pavarde</label>
        <input
          type="text"
          {...register("lastName", { required: "Pavarde butina" })}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <label>El. Pastas</label>
        <input
          type="text"
          {...register("email", {
            required: "Pastas butinas",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Neteisingas el. pašto formatas",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <label>Imones pavadinimas</label>
        <input
          type="text"
          {...register("name", {
            required: "Imones pavadinimas privalomas!",
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}
        <label>Slaptazodis</label>
        <input
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
        {errors.password && <span>{errors.password.message}</span>}
        <label>Pakartokite slaptazodi</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Slaptazodis privalomas",
            validate: (val) =>
              val === getValues("password") || "Slaptazodziai nesutampa",
          })}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
        <button type="submit">Sukurti Paskyra</button>
      </form>
    </div>
  );
};
export default Register;
