// components/GenresDropdown.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@nextui-org/react";
import { ThemeColour } from "@/components/primitives";
import { siteConfig } from "@/config/site";

interface GenresDropdownProps {
    selectedGenres: string[];
    onGenreChange: (genre: string) => void;
    onApplyFilters: () => void;
}

const GenresDropdown: React.FC<GenresDropdownProps> = ({ selectedGenres, onGenreChange, onApplyFilters }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    //const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
                Genre
            </Button>
            {dropdownOpen && (
                <div className={`${ThemeColour.variants.background.main} absolute z-10 mt-2 w-48 border border-gray-200 rounded-md shadow-lg`}>
                    <div className="p-2">
                        {siteConfig.Genres.map((genre) => (
                            <div key={genre} className="flex items-center">
                                <Checkbox
                                    isSelected={selectedGenres.includes(genre)}
                                    onChange={() => onGenreChange(genre)}
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

export default GenresDropdown;
