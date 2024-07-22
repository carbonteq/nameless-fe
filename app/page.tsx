"use client";
import { ThemeColour } from "@/components/primitives";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { siteConfig } from "@/config/site";
import {
  Slider,
  Checkbox,
} from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(["All"]);
  const [rating, setRating] = useState(5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSlider, setShowSlider] = useState(false);


  const handleSearch = (event: { preventDefault: () => void; }) => {
    console.log("Search query:");
    console.log("Selected genres:", selectedGenres);
    console.log("Rating:", rating);
    event.preventDefault();
    toast({
      title: "TA-DA",
      description: "Filters Applied",
    })
    setIsDropdownOpen(false);
    setShowSlider(false)
    return
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
        {/* <h1 className="text-3xl font-bold">NAMELESS</h1>
        <h1 className="text-3xl font-bold text-violet-500">or smth</h1>
        <br />
        <br /> */}
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
          <div className="relative">
            <Button className={`${ThemeColour.variants.background.main} hover:bg-[#969393] text-black dark:text-white dark:hover:bg-[#1a222e]`} onClick={toggleDropdown}>Genre</Button>
            {/* DropDown Menu */}
            {isDropdownOpen && (
              <div className={`${ThemeColour.variants.background.main} absolute z-10 mt-2 w-48 border border-gray-200 rounded-md shadow-lg`}>
                <div className="p-2 ">
                  {siteConfig.Genres.map((genre) => (
                    <div key={genre} className="flex items-center">
                      <Checkbox
                        isSelected={selectedGenres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                      >
                        {genre}
                      </Checkbox>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-right">
                  <Button className={`${ThemeColour.variants.background.main} hover:bg-[#969393] text-black dark:text-white dark:hover:bg-[#1a222e]`} onClick={closeDropdown}>Close</Button>
                </div>
              </div>
            )}
          </div>
          <Button className={`${ThemeColour.variants.background.main} hover:bg-[#969393] text-black dark:text-white dark:hover:bg-[#1a222e]`} onClick={handleSearch}>Apply Filters</Button>
        </div>
      </div>
    </div >
  );
}
