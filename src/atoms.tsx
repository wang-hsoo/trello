import { atom, selector } from "recoil";

export const minuteState = atom({
    key: "minutes",
    default: 0  
});

export const hourSelector = selector<number>({
    key: "hours",
    get: ({get}) => {
        const minutes = get(minuteState);
        return minutes / 60;
    },
    set: ({set}, newVlaue) => {
        const minutes = Number(newVlaue) * 60;
        set(minuteState, minutes);
    }
})