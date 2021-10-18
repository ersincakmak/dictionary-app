import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: "dark" | "light";
    colors: {
      bg: string;
      bgHover: string;
      text: string;
      brand: string;
      brandHover: string;
      google: string;
      error: string;
      errorHover: string;
      success: string;
    };
  }
}
