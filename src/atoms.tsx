import { atom, selector } from "recoil";

export interface IToDo{
    id: number;
    text: string;
}

export interface IToDostate{
    [key: string]: IToDo[];
}

export const toDoState = atom<IToDostate>({
    key: "toDo",
    default: {
        "To Do": [],
        Doing:  [],
        Done:  [],
    },
})