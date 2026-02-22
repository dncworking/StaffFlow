import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "./Forms.module.css";
import { addData } from "./services/add";
function AddForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const onSubmit = async (data) => {
    try {
      const defaultImg =
        "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";

      let imageUrl = defaultImg;

      if (data.image && data.image.length > 0) {
        imageUrl = await toBase64(data.image[0]);
      }

      const employeeData = {
        ...data,
        image: imageUrl,
      };

      await addData(employeeData);
      navigate("/employees");
    } catch (error) {
      console.error(error);
    }
  };

  const cancel = async () => {
    if (window.confirm("Ar tikrai norite išeiti?")) {
      navigate("/employees");
    }
  };

  return (
    <>
      <div className={style.main}>
        <h2 className={style.h2}>Naujas darbuotojas</h2>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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
            type="file"
            accept="image/*"
            {...register("image")}
          />
          <input
            className={style.input}
            type="date"
            placeholder="Gimimo data"
            {...register("birthDate", {
              required: "Gimimo data yra privaloma",
            })}
          />
          {errors.birthDate && (
            <span className={style.error}>{errors.birthDate.message}</span>
          )}
          <input
            className={style.input}
            type="text"
            placeholder="Pozicija"
            {...register("position", { required: "Pozicija yra privaloma" })}
          />
          {errors.position && (
            <span className={style.error}>{errors.position.message}</span>
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

          <div className={style.buttons}>
            <button
              className={style.buttonCancel}
              onClick={cancel}
              type="button"
            >
              Atšaukti
            </button>
            <button className={style.buttonAdd} type="submit">
              Pridėti
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddForm;
