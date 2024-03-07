import { atom, selector } from "recoil";

export enum Categories { // enum은 value를 숫자로 표현한다. 1,2,3...  그래서 name=enum 오류
  "TO_DO",
  "DOING",
  "DONE",
}

export interface IToDo {
  text: string;
  category: Categories; // ToDo를 만들면 이 셋 중 하나여야만 함
  id: number;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO, // protect more
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
