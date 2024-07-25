"use client";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { ModeToggle } from "./ui/toggle";
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
            className={`${ThemeColour.variants.background.main} shadow-lg`}
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
                        <p className="ml-0 font-bold text-gray-800 dark:text-white text-[40px]">
                            NAMELESS
                        </p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden gap-2 sm:flex">
                    <ModeToggle />
                </NavbarItem>
                <NavbarItem className="hidden md:flex">
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

