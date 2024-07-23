"use client";
import { ThemeColour } from "@/components/primitives";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Slider,
  Checkbox,
} from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import GenresDropdown from "@/components/genresDropdown";



export default function Home() {
  const [results, setResults] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(["All"]);
  const [rating, setRating] = useState(5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const userId = useSelector((state: any) => state.auth.userId);

  //console.log("UserId in HomePage => ", userId)


  const handleSearch = (event?: { preventDefault: () => void }) => {
    if (event) event.preventDefault();
    console.log("Search query:");
    console.log("Selected genres:", selectedGenres);
    console.log("Rating:", rating);
    toast({
      title: "TA-DA",
      description: "Filters Applied",
    });
    setShowSlider(false);
    setIsDropdownOpen(false);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };



  return (
    <div className="flex flex-col items-center justify-center gap-4 pl-[170px] py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <div className="flex justify-between gap-6 w-full">
          <div className="w-full">
            <Search />
          </div>
          <div className="relative max-w-xs">
            <Button className={`${ThemeColour.variants.background.main} hover:bg-[#969393] text-black dark:text-white dark:hover:bg-[#1a222e]`} onClick={() => setShowSlider(prev => !prev)}>Rating</Button>
            {showSlider && (
              <div className={`transition-opacity duration-300 `}>
                <Slider
                  label="Min Rating"
                  step={1}
                  maxValue={9}
                  minValue={0}
                  defaultValue={rating}
                  className="max-w-xs"
                  onChange={handleRatingChange}
                />
              </div>
            )}
          </div>
          <GenresDropdown
            selectedGenres={selectedGenres}
            onGenreChange={handleGenreChange}
            onApplyFilters={handleSearch}
          />
          <Button className={`${ThemeColour.variants.background.main} hover:bg-[#969393] text-black dark:text-white dark:hover:bg-[#1a222e]`} onClick={handleSearch}>Apply Filters</Button>
        </div>
      </div>
    </div >
  );
}
