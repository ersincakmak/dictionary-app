import styled from "styled-components";
import { Input } from "../Form/Assets";
import { BsSearch } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setFilterValue } from "../../redux/wordSlice";

const SearchContainer = styled.div`
  display: flex;
  padding: 1em;
  align-items: center;
  width: min(31.25rem, 100%); // 500px
  margin-inline: auto;
  align-items: center;
  gap: 1em;

  svg {
    font-size: 1.75rem; // 28px
  }
`;

const SearchBar = () => {
  const { filterValue } = useAppSelector((state) => state.word);

  const dispatch = useAppDispatch();
  return (
    <SearchContainer>
      <BsSearch />
      <Input
        error={false}
        placeholder="Search..."
        value={filterValue}
        onChange={(e) => dispatch(setFilterValue(e.currentTarget.value))}
      />
    </SearchContainer>
  );
};

export default SearchBar;
