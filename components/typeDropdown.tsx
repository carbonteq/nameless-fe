// components/filtersDropdown.tsx
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeColour } from "@/components/primitives";

interface FiltersDropdownProps {
	selectedGenres: string[];
	onGenreChange: (genre: string) => void;
	rating: number;
	onRatingChange: (rating: number | number[]) => void;
	//onApplyFilters: () => void;
}

const TypeDropdown = () => {
	const [isTypeOpen, setIsTypeOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [type, setType] = useState("");

	const toggleDropdown = () => {
		setIsTypeOpen((prev) => !prev);
	};

	const closeDropdown = () => {
		setIsTypeOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsTypeOpen(false);
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
				className="bg-white border dark:border-slate-800 hover:bg-gray-100 text-black dark:bg-slate-950 dark:text-white dark:hover:bg-[#1a222e]"
				onClick={toggleDropdown}
			>
				Type
			</Button>
			{isTypeOpen && (
				<div
					className={`${ThemeColour.variants.background.main} absolute left-1/2 transform -translate-x-1/2 py-2 px-1 mt-2 w-[100px] h-[90px] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-20`}
				>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						onClick={() => {
							setType("Movies");
							setIsTypeOpen(false);
						}}
						className="mb-2 p-1 hover:bg-[#969393] dark:hover:bg-[#1a222e]"
					>
						Movies
					</div>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						onClick={() => {
							setType("Books");
							setIsTypeOpen(false);
						}}
						className="p-1 hover:bg-[#969393] dark:hover:bg-[#1a222e]"
					>
						Books
					</div>
				</div>
			)}
		</div>
	);
};

export default TypeDropdown;
