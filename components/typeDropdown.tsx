// components/filtersDropdown.tsx
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

//const FiltersDropdown: React.FC<FiltersDropdownProps> = ({ selectedGenres, onGenreChange, rating, onRatingChange }) => {

const TypeDropdown = () => {
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [type, setType] = useState("")


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
                className={`${ThemeColour.variants.background.main} hover:bg-[#969393] text-black dark:text-white dark:hover:bg-[#1a222e]`}
                onClick={toggleDropdown}
            >
                Type
            </Button>
            {isTypeOpen && (
                <div
                    className={`${ThemeColour.variants.background.main} absolute left-1/2 transform -translate-x-1/2 py-2 px-1 mt-2 w-[100px] h-[90px] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-20`}
                >
                    <div onClick={() => setType("Movies")} className="mb-2 p-1 hover:bg-[#969393] dark:hover:bg-[#1a222e]">
                        Movies
                    </div>
                    <div onClick={() => setType("Books")} className="p-1 hover:bg-[#969393] dark:hover:bg-[#1a222e]">
                        Books
                    </div>
                </div>

            )}
        </div>

    );
};

export default TypeDropdown;








