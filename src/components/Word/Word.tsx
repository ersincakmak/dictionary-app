import styled from "styled-components";

const Word = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: min(37.5rem, 100%); // 600px
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg};
  padding: 1em;
  transition: all 0.2s ease;
  border-radius: 5px;
  font-weight: 600;

  :hover {
    background-color: ${(props) => props.theme.colors.bgHover};
  }
`;

export default Word;
