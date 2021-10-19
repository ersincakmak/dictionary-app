import styled from "styled-components";

interface Props {
  btnWidth: "full" | "md" | "sm" | "xs";
  btnColor?: "brand" | "google" | "outlineBrand" | "red";
  btnType?: "google";
}

const Button = styled.button<Props>`
  padding: ${(props) => (props.btnWidth === "xs" ? ".4em .6em" : "0.7em")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: max-content;
  gap: 0.5em;
  border-radius: 0.3125rem; // 5px
  font-size: ${(props) => (props.btnWidth === "xs" ? ".875rem" : "1rem")};
  cursor: pointer;
  width: ${(props) =>
    props.btnWidth === "full"
      ? "100%"
      : props.btnWidth === "md"
      ? "max(12.5rem)"
      : "max-content"};

  transition: all 0.2s ease;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};

  svg {
    font-size: 1.25rem; // 20px
  }

  ${(props) => {
    switch (props.btnColor) {
      case "brand":
        return {
          backgroundColor: props.theme.colors.brand,
          color: "white",
          ":hover , :focus": {
            backgroundColor: props.theme.colors.brandHover,
          },
        };
      case "outlineBrand":
        return {
          backgroundColor: "transparent",
          border: `1px solid ${props.theme.colors.text}`,
          fontWeight: 700,
          ":hover, :focus": {
            color: props.theme.colors.brand,
            borderColor: props.theme.colors.brand,
          },
        };
      case "google":
        return {
          backgroundColor: "transparent",
          border: `1px solid ${props.theme.colors.text}`,
          ":hover, :focus": {
            color: props.theme.colors.google,
            borderColor: props.theme.colors.google,
          },
        };
      case "red":
        return {
          backgroundColor: props.theme.colors.error,
          color: "white",
          ":hover": {
            backgroundColor: props.theme.colors.errorHover,
          },
        };
      default:
        return;
    }
  }}
`;

export default Button;
