// components/GenresDropdown.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox, Slider } from "@nextui-org/react";
import { ThemeColour } from "@/components/primitives";
import { siteConfig } from "@/config/site";

interface FiltersDropdownProps {
    selectedGenres: string[];
    onGenreChange: (genre: string) => void;
    rating: number;
    onRatingChange: (rating: number | number[]) => void;
    //onApplyFilters: () => void;
}

const FiltersDropdown: React.FC<FiltersDropdownProps> = ({ selectedGenres, onGenreChange, rating, onRatingChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


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
                <div className={`${ThemeColour.variants.background.main} absolute z-10 mt-2 w-48 border border-gray-200 rounded-md shadow-lg`}>
                    {/* Rating Filter */}

                    <div className="mb-4">
                        <label className="block text-lg font-large font-bold ">Rating</label>
                        <div className="flex justify-center">
                            <div className={`transition-opacity duration-300 w-1/2`}>
                                <Slider
                                    // label=""
                                    step={1}
                                    maxValue={9}
                                    minValue={0}
                                    defaultValue={rating}
                                    className="max-w-xs align-center"
                                    onChange={onRatingChange}
                                />
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
                                    color='default'
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

