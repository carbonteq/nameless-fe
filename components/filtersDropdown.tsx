// components/filtersDropdown.tsx
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox, Slider } from "@nextui-org/react";
import { ThemeColour } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import InputField from "./inputfield";

interface FiltersDropdownProps {
	selectedGenres: string[];
	onGenreChange: (genre: string) => void;
	rating: number;
	onRatingChange: (rating: number | number[]) => void;
	//onApplyFilters: () => void;
}

const FiltersDropdown: React.FC<FiltersDropdownProps> = ({
	selectedGenres,
	onGenreChange,
	rating,
	onRatingChange,
}) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(10);

	const toggleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};

	const closeDropdown = () => {
		setDropdownOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setDropdownOpen(false);
		}
	};

	const handleMinChange = (e) => {
		const value = parseInt(e.target.value, 10);
		if (value >= 0 && value <= 10 && value <= maxValue) {
			setMinValue(value);
		} else if (value > maxValue) {
			setMinValue(maxValue);
		}
	};

	const handleMaxChange = (e) => {
		const value = parseInt(e.target.value, 10);
		if (value >= 0 && value <= 10 && value >= minValue) {
			setMaxValue(value);
		} else if (value < minValue) {
			setMaxValue(minValue);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<Button
				className={`${ThemeColour.variants.background.main} hover:bg-[#969393] text-black dark:text-white dark:hover:bg-[#1a222e]`}
				onClick={toggleDropdown}
			>
				Filters
			</Button>

			{dropdownOpen && (
				<div
					className={`${ThemeColour.variants.background.main} absolute left-1/2 transform -translate-x-1/2 mt-2 p-4 absolute z-10 mt-2 w-48 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg rounded-md shadow-lg`}
				>
					{/* Rating Filter */}

					<div className="mb-4">
						<label className="block text-lg font-large font-bold ">
							Rating
						</label>
						<div className="flex justify-center">
							<div className="transition-opacity duration-300">
								<div className="flex space-x-2">
									<InputField
										label=""
										value={minValue} // State yaha pr reflect hogi
										type="number"
										onChange={handleMinChange}
										placeholder="Min."
										inputWidth="80px" // Adjust the width as needed
									/>
									<InputField
										label=""
										value={maxValue} // State yaha pr reflect hogi
										type="number"
										onChange={handleMaxChange}
										placeholder="Max."
										inputWidth="80px" // Adjust the width as needed
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Genres Filter */}

					<label className="block text-lg font-large font-bold ">Genres</label>
					<div className="p-2">
						{siteConfig.Genres.map((genre) => (
							<div key={genre} className="flex items-center">
								<Checkbox
									isSelected={selectedGenres.includes(genre)}
									onChange={() => onGenreChange(genre)}
									color="default"
								>
									{genre}
								</Checkbox>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default FiltersDropdown;
