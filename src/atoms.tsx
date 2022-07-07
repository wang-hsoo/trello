import { atom, selector } from "recoil";

interface IToDostate{
    [key: string]: string[];
}

export const toDoState = atom<IToDostate>({
    key: "toDo",
    default: {
        "To Do": ["a","b"],
        Doing:  ["c","d","e"],
        Done:  ["f"]
    },
})