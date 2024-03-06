import { useForm } from "react-hook-form";

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({ defaultValues: { email: "@naver.com" } });
  //  console.log(watch());
  console.log(errors);

  const onValid = (data: IForm) => {
    // console.log(data);
    if (data.password !== data.password1) {
      setError(
        "password1",
        {
          message: "password1 does not match with password",
        },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "server offline" }); // 전체 form에 적용
  };

  interface IForm {
    email: string; // ? 붙이면 optional
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    password1: string;
    extraError?: string; // not required
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
          {...register("firstname", {
            required: "Write here",
            // validate: (value) => true, 이렇게 작성하면 firstname은 어떻게 작성하든 통과 반대로 false라 하면 어떻게 하든 통과못함
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nico allowed" : true,
              noLonely: (value) =>
                value.includes("lonely") ? "no lonely allowed" : true,
            },
          })}
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
        <span>{errors.extraError?.message};</span>
      </form>
    </div>
  );
}

export default ToDoList;
