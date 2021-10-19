import styled from "styled-components";

const Error = styled.div`
  position: absolute;
  bottom: -0.1875rem; // 3px
  transform: translateY(100%);
  font-size: 0.875rem; // 14px
  color: ${(props) => props.theme.colors.error};
`;

export default Error;
