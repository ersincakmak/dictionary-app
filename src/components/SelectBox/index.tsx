import styled from "styled-components";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState } from "react";

const SelectBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 6.25rem; // 100px
  padding: 0.5em 1em;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.colors.text};
  position: relative;
  font-weight: 600;
  cursor: pointer;
`;

const Options = styled.div<{
  open: boolean;
}>`
  position: absolute;
  display: ${(props) => (props.open === true ? "flex" : "none")};
  bottom: -5px;
  left: 0;
  transform: translateY(100%);
  width: 100%;
  background-color: ${(props) => props.theme.colors.text};
  flex-direction: column;
  border-radius: 5px;
  gap: 0.5em;
  max-height: 200px;
  overflow: auto;
`;

const Option = styled.div`
  padding: 0.5em 1em;
  color: ${(props) => props.theme.colors.bg};
  background-color: ${(props) => props.theme.colors.text};

  :hover {
    color: ${(props) => props.theme.colors.brand};
    background-color: ${(props) => props.theme.colors.bg};
  }
`;

interface Props {
  selectedValue: number;
  options: number[];
  onClick: (val: number) => void;
}

const SelectBox: React.FC<Props> = ({ options, selectedValue, onClick }) => {
  const [open, setOpen] = useState(false);
  return (
    <SelectBoxContainer onClick={() => setOpen(!open)}>
      {selectedValue} <RiArrowDownSLine />
      <Options open={open}>
        {options.map((item) => (
          <Option key={item} onClick={() => onClick(item)}>
            {item}
          </Option>
        ))}
      </Options>
    </SelectBoxContainer>
  );
};

export default SelectBox;
