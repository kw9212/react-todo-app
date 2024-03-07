import { atom } from "recoil";

export interface IToDo {
  text: string;
  category: "TO_DO" | "DOING" | "DONE" | string; // ToDo를 만들면 이 셋 중 하나여야만 함
  id: number;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
