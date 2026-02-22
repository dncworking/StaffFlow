import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getOneEmployee } from "./services/getByID"; 
import { updateEmployee } from "./services/update"; 
import style from "./Forms.module.css";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        const data = await getOneEmployee(id);
        reset(data);
      } catch (error) {
        console.error("Klaida užkraunant darbuotoją:", error);
      }
    };
    loadEmployeeData();
  }, [id, reset]);


  const onSubmit = async (data) => {
    const defaultImg =
      "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
    let finalImage = defaultImg;

    if (data.image && data.image[0]) {
      const file = data.image[0];

      finalImage = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    } else if (typeof data.image === "string" && data.image !== "") {

      finalImage = data.image;
    }

    const finalData = {
      ...data,
      image: finalImage,
    };
    try {
      await updateEmployee(id, finalData);
      alert("Duomenys sėkmingai atnaujinti!");
      navigate("/employees");
    } catch (error) {
      console.error(error.message);
      alert("Nepavyko išsaugoti pakeitimų.");
    }
  };

  const cancel = async () => {
    if (window.confirm("Ar tikrai norite išeiti?")) {
      navigate("/employees");
    }
  };

  return (
    <div className={style.main}>
      <h2 className={style.h2}>Redaguoti darbuotoją</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <input
          className={style.input}
          type="text"
          placeholder="Vardas"
          {...register("firstName", { required: "Vardas yra privalomas" })}
        />
        {errors.firstName && (
          <span className={style.error}>{errors.firstName.message}</span>
        )}

        <input
          className={style.input}
          type="text"
          placeholder="Pavardė"
          {...register("lastName", { required: "Pavardė yra privaloma" })}
        />
        {errors.lastName && (
          <span className={style.error}>{errors.lastName.message}</span>
        )}

        <input
          className={style.input}
          type="text"
          placeholder="Pareigos"
          {...register("position", { required: "Pareigos yra privalomos" })}
        />
        {errors.position && (
          <span className={style.error}>{errors.position.message}</span>
        )}
        <input
          className={style.input}
          type="text"
          placeholder="Departamentas"
          {...register("department", {
            required: "Departamentas yra privalomas",
          })}
        />
        {errors.department && (
          <span className={style.error}>{errors.department.message}</span>
        )}
        <input
          className={style.input}
          type="number"
          placeholder="Atlyginimas"
          {...register("salary", { required: "Atlyginimas yra privalomas" })}
        />
        {errors.salary && (
          <span className={style.error}>{errors.salary.message}</span>
        )}
        <input
          className={style.input}
          type="tel"
          placeholder="Telefono Nr."
          {...register("phone", { required: "Telefono Nr. yra privalomas" })}
        />
        {errors.phone && (
          <span className={style.error}>{errors.phone.message}</span>
        )}
        <input
          className={style.input}
          type="text"
          placeholder="El. paštas"
          {...register("email", { required: "El. paštas yra privalomas" })}
        />
        {errors.email && (
          <span className={style.error}>{errors.email.message}</span>
        )}
        <input
          className={style.input}
          type="file"
          accept="image/*"
          {...register("image")}
        />

        <div className={style.buttons}>
          <button type="button" onClick={cancel} className={style.buttonCancel}>
            Atšaukti
          </button>
          <button type="submit" className={style.button}>
            Išsaugoti pakeitimus
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;
