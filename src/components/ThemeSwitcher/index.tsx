import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";
import styled from "styled-components";

const Container = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  background-color: #191919;
  box-shadow: inset -2px -2px 4px rgba(92, 91, 91, 0.6),
    inset 2px 2px 4px rgba(0, 0, 0, 0.6);
  cursor: pointer;

  svg {
    font-size: 20px;
    transform: rotate(180deg);
  }
`;

const ThemeStick = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: space-between;
  position: absolute;
  left: 50%;
  top: 50px;
  transform-origin: center center;
  transition: all 0.2s ease;
  transform: translate(-50%, -50%)
    rotate(${(props) => (props.theme.title === "dark" ? "0deg" : "180deg")});

  .sun {
    color: #ffba26;
  }

  .moon {
    color: white;
  }
`;

interface Props {
  toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<Props> = ({ toggleTheme }) => {
  return (
    <Container onClick={() => toggleTheme()}>
      <ThemeStick>
        <IoSunnySharp className="sun" />
        <IoMoonSharp className="moon" />
      </ThemeStick>
    </Container>
  );
};

export default ThemeSwitcher;
