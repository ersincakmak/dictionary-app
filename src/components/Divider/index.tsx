import styled from "styled-components";

const Divider = styled.div<{
  message: string;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  ::before {
    content: "${(props) => props.message}";
    background-color: ${(props) => props.theme.colors.bg};
    padding-inline: 0.5em;
    z-index: 2;
    transition: all 0.2s ease;
  }
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.colors.text};
    top: 50%;
    z-index: 1;
    transform: translateY(-50%);
    transition: all 0.2s ease;
  }
`;

export default Divider;
