import { DefaultTheme } from "styled-components";

const darkTheme: DefaultTheme = {
  title: "dark",
  colors: {
    bg: "#101010",
    bgHover: "#192824",
    text: "#F6F6F6",
    brand: "#39A388",
    brandHover: "#1C7947",
    google: "#4285F4",
    error: "#ff6e6e",
    errorHover: "#ff3333",
    success: "#6eff94",
  },
} as const;

export default darkTheme;
