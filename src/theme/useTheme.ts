import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DefaultTheme } from "styled-components";
import darkTheme from "./dark";
import lightTheme from "./light";

type Response = [DefaultTheme, Dispatch<SetStateAction<DefaultTheme>>];

const useTheme = (): Response => {
  const ls = localStorage.getItem("theme");

  const initialTheme = ls && ls === "dark" ? darkTheme : lightTheme;

  const [theme, settheme] = useState<DefaultTheme>(initialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme.title);
  }, [theme]);

  return [theme, settheme];
};

export default useTheme;
