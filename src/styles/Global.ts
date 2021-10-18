import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


html,body{
  font-family: 'Raleway', sans-serif;
  color: ${(props) => props.theme.colors.text};
}
  *{
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }
  .App{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: ${(props) => props.theme.colors.bg};
    transition: background .2s ease;
  }
`;

export default GlobalStyle;
