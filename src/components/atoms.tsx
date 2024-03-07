import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  category: "TO_DO" | "DOING" | "DONE" | string; // ToDo를 만들면 이 셋 중 하나여야만 함
  id: number;
}

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
