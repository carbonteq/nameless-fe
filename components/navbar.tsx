"use client";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
	NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import ModeToggle from "./ui/toggle-theme";

import { button, ThemeColour } from "./primitives";
import Link from "next/link";
import { useSelector } from "react-redux";
import ProfileDropdown from "./profileDropdown";


export const Navbar = () => {
	const userId = useSelector((state: any) => state.auth.userId);

	const navbarStyle = {
		height: "70px",
		padding: "0", // Adjust the padding as needed
		transition: "all 0.3s ease-in-out",
	};

	return (
		<NextUINavbar
			className={`${ThemeColour.variants.background.main} shadow-lg fixed`}
			maxWidth="full"
			position="sticky"
			style={navbarStyle}
		>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-0 max-w-fit">
					<NextLink
						className="flex gap-0 justify-start items-center pt-2"
						href="/"
					>
						<p className="ml-0 font-bold text-gray-800 max-sm:text-xl dark:text-white text-[40px]">
							NAMELESS
						</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent
				className=" sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="flex">
					<ModeToggle />
				</NavbarItem>
				<NavbarItem className="flex">
					{userId && <ProfileDropdown />}

					{!userId && (
						<Link href="/signin" passHref>
							<Button
								className={`mr-0 ${button.variants.background.main} font-black`}
								size="md"
							>
								Login
							</Button>
						</Link>
					)}
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};
