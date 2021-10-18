import styled from "styled-components";

interface Props {
  readonly error: boolean;
}

const Input = styled.input<Props>`
  width: 100%;
  border-radius: 0.3125rem; // 5px
  font-size: 1.125rem; // 18px
  padding: 0.7em;
  color: ${(props) => props.theme.colors.text};
  background-color: transparent;
  border: 1px solid
    ${(props) =>
      props.error ? props.theme.colors.error : props.theme.colors.text};
`;

export default Input;
