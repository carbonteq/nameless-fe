"use client";
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Adjust the import path accordingly
import { ThemeColour } from "./primitives";
import Link from "next/link";
import { clearUserId } from "@/app/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const ProfileDropdown = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const dispatch = useDispatch();

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

	const handleLogout = () => {
		// Dispatch the logout action to clear the UserId from Redux App State
		dispatch(clearUserId());

		// Clear local storage
		localStorage.removeItem("jwtToken");

		// Redirect to the login page
		router.push("/");
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
				<AvatarImage
					src="https://avatars.githubusercontent.com/u/114104536?v=4"
					sizes="full"
				/>
				<AvatarFallback>Avatar</AvatarFallback>
			</Avatar>

			{dropdownOpen && (
				<div>
					<div
						className={`${ThemeColour.variants.background.main} absolute right-0 p-1 mt-4 w-48 border border-gray-200 rounded-md shadow-lg z-20`}
					>
						<Link
							onClick={() => {
								setDropdownOpen(false);
							}}
							href="/profile"
							className="block px-4 py-2 hover:bg-[#969393] dark:hover:bg-[#1a222e]"
						>
							Profile
						</Link>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							onClick={handleLogout}
							className="block px-4 py-2 hover:bg-[#969393] dark:hover:bg-[#1a222e]"
						>
							Logout
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileDropdown;
