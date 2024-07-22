
import { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Input } from './ui/input';


const StyledInput = styled(Input)`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: block;
`;

const Search = () => {
  const [query, setQuery] = useState('');

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setQuery(e.target.value);
    //   if (onSearch) {
    //     onSearch(e.target.value);
    //   }
  };

  return (
    <StyledInput
      placeholder="Search..."
      value={query}
      onChange={handleChange}
      width={"5px"}
    />
  );
};

export default Search;
