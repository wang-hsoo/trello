import { DefaultTheme } from "styled-components";
import 'styled-components';

export const darkTheme: DefaultTheme = {
    bgColor: "#2f3640",
    textColor: "white",
    accentColor: "#9c88ff",
    cardBgColor: "transparent",
}

declare module 'styled-components' {
    export interface DefaultTheme {
      textColor: string;
      bgColor: string;
      accentColor: string;
      cardBgColor: string;
    }
  }