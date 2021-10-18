import { DefaultTheme } from "styled-components";

const lightTheme: DefaultTheme = {
  title: "light",
  colors: {
    bg: "#FFFFF9",
    bgHover: "#99dab7",
    text: "#252525",
    brand: "#1C7947",
    brandHover: "#39A388",
    google: "#4285F4",
    error: "#ff3333",
    errorHover: "#ff6e6e",
    success: "#00c133",
  },
} as const;

export default lightTheme;
