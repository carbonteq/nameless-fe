"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Adjust the import path accordingly
import { ThemeColour } from "./primitives";
import Link from "next/link";

const ProfileDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
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
            <Avatar onClick={toggleDropdown}>
                <AvatarImage src="https://github.com/shadcn.png" sizes="full" />
                <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>

            {dropdownOpen && (
                <div className="pt-4">
                    <div
                        className={`${ThemeColour.variants.background.main} absolute right-0 p-1 mt-2 w-48 border border-gray-200 rounded-md shadow-lg z-20`}
                    >
                        <Link
                            href="/editprofile"
                            className="block px-4 py-2 hover:bg-gray-800"
                        >
                            Profile
                        </Link>
                        <Link href="/logout" className="block px-4 py-2 hover:bg-gray-800">
                            Logout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
