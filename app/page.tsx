"use client";
import Search from "@/components/search";
import { toast } from "@/components/ui/use-toast";
import { SetStateAction, useState } from "react";
import FiltersDropdown from "@/components/filtersDropdown";
import TypeDropdown from "@/components/typeDropdown";

export default function Home() {
	const [results, setResults] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState(["All"]);
	const [rating, setRating] = useState(5);
	const [isType] = useState(true);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const [query, setQuery] = useState("");

	const handleSearchChange = (newQuery: SetStateAction<string>) => {
		setQuery(newQuery);
	};

	const handleSearch = (event?: { preventDefault: () => void }) => {
		if (event) event.preventDefault();
		console.log("Search query:");
		console.log("Selected genres:", selectedGenres);
		console.log("Rating:", rating);
		toast({
			title: "TA-DA",
			description: "Filters Applied",
		});
		setIsDropdownOpen(false);
	};

	const handleGenreChange = (genre: string) => {
		setSelectedGenres((prev) =>
			prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
		);
	};

	const handleRatingChange = (value: number | number[]) => {
		// If the value is an array, take the first element
		if (Array.isArray(value)) {
			setRating(value[0]);
		} else {
			setRating(value);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center pl-[170px] py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<div className="flex justify-between gap-4">
					<div className="w-full w-[800px]">
						<Search isShowType={isType} />
					</div>
					<FiltersDropdown
						selectedGenres={selectedGenres}
						onGenreChange={handleGenreChange}
						rating={rating}
						onRatingChange={handleRatingChange}
					// onApplyFilters={handleSearch}
					/>
				</div>
			</div>
		</div>
	);
}
