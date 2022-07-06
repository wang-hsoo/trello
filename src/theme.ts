import { DefaultTheme } from "styled-components";
import 'styled-components';

export const darkTheme: DefaultTheme = {
  bgColor: "#3F8CF2",
  boardColor: "#DADFE9",
  cardColor: "white",
}

declare module 'styled-components' {
    export interface DefaultTheme {
      bgColor: string;
      cardColor: string;
      boardColor: string;
    }
  }