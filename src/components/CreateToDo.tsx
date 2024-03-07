import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const handleValid = ({ toDo }: IForm) => {
    // input에서 가져온다. 애초에 handleValie의 목적은 input validation이다.
    // toDos.push() 이렇게는 안 된다. setToDos에 새로운 것을 넣어서 새로운 array를 만들어줘야 한다.
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: category },
      ...oldToDos,
    ]); // oldToDos는 argument 위해 새로 만들어준 function. [...] returns all properties in the array
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder="Write a to do"
      ></input>
      <button>add</button>
    </form>
  );
}

export default CreateToDo;
