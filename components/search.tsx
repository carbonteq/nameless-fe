import { type SetStateAction, useState } from "react";
import styled from "styled-components";
import { Input } from "./ui/input";
import TypeDropdown from "./typeDropdown";

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid gray-900;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding-left: 4rem; 
  display: block;
  font:bold
`;

const Search = ({ isShowType }) => {
	const [query, setQuery] = useState("");

	const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
		setQuery(e.target.value);
	};

	return (
		<div className="w-[500px] flex">
			<SearchContainer>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button className="absolute right-20 left-0 top-0 mt-3 ml-4 size-0">
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
					<svg
						className="text-gray-600 h-4 w-4 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						version="1.1"
						id="Capa_1"
						x="0px"
						y="0px"
						viewBox="0 0 56.966 56.966"
						xmlSpace="preserve"
						width="10px"
						height="10px"
						scale={0}
					>
						<path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
					</svg>
				</button>
				<StyledInput
					placeholder="Search..."
					value={query}
					onChange={handleChange}
				/>

				{isShowType && (
					<div className="absolute border-orange-50 right-0 top-0">
						<TypeDropdown />
					</div>
				)}
			</SearchContainer>
		</div>
	);
};

export default Search;
