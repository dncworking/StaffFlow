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
    if (window.confirm("Ar tikrai norite i6eiti?")) {
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
            {...register("firstName", { required: "Vardas privalomas" })}
          />
          {errors.firstName && (
            <span className={style.error}>{errors.firstName.message}</span>
          )}
          <input
            className={style.input}
            type="text"
            placeholder="Pavard4"
            {...register("lastName", { required: "Pavard4 privaloma" })}
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
            {...register("birthDate", { required: "Gimimo data privaloma" })}
          />
          {errors.birthDate && (
            <span className={style.error}>{errors.birthDate.message}</span>
          )}
          <input
            className={style.input}
            type="text"
            placeholder="Pozicija"
            {...register("position", { required: "Pozicija privaloma" })}
          />
          {errors.position && (
            <span className={style.error}>{errors.position.message}</span>
          )}
          <input
            className={style.input}
            type="number"
            placeholder="Atlyginimas"
            {...register("salary", { required: "Atlyginimas privalomas" })}
          />
          {errors.salary && (
            <span className={style.error}>{errors.salary.message}</span>
          )}
          <input
            className={style.input}
            type="text"
            placeholder="Departamentas"
            {...register("department", {
              required: "Departamentas privalomas",
            })}
          />
          {errors.department && (
            <span className={style.error}>{errors.department.message}</span>
          )}

          <div className={style.buttons}>
            <button
              className={style.buttonCancel}
              onClick={cancel}
              type="button"
            >
              At6aukti
            </button>{" "}
            <button className={style.buttonAdd} type="submit">
              Prid4ti
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddForm;
