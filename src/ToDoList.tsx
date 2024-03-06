import { useForm } from "react-hook-form";

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ defaultValues: { email: "@naver.com" } });
  //  console.log(watch());
  console.log(errors);

  const onValid = (data: any) => {
    console.log(data);
  };

  interface IForm {
    email: string; // ? 붙이면 optional
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    password1: string;
  }

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              // 조건
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })} // HTML에도 할 수 있지만 사용자 환경에 따라 달라질 수도, 유저가 임의로 변경하는 걸 막기 위해 JS에 넣어줌
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstname", { required: "Write here" })}
          placeholder="firstname"
        />
        <span>{errors?.firstname?.message}</span>

        <input
          {...register("lastname", { required: "Write here" })}
          placeholder="lastname"
        />
        <span>{errors?.lastname?.message}</span>

        <input
          {...register("username", { required: "Write here", minLength: 10 })}
          placeholder="username"
        />
        <span>{errors?.username?.message}</span>

        <input
          {...register("password", { required: "Write here", minLength: 5 })}
          placeholder="password"
        />
        <span>{errors?.password?.message}</span>

        <input
          {...register("password1", {
            required: "password is required",
            minLength: { value: 5, message: "Your password is too short." },
          })}
          placeholder="password1"
        />
        <span>{errors?.password1?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
