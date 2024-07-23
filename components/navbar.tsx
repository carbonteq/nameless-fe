"use client"
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

    function profilemenu(): void {

    }



    return (
        <NextUINavbar className={`${ThemeColour.variants.background.main} shadow-lg`} maxWidth="full" position="sticky" style={navbarStyle}>
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-0 max-w-fit">
                    <NextLink className={`flex justify-start items-center gap-0 pt-2 `} href="/">
                        <p className="font-bold ml-0 text-[40px] font-[Papyrus] text-gray-800 dark:text-white">
                            NAMELESS
                        </p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    <ModeToggle />
                </NavbarItem>
                <NavbarItem className="hidden md:flex">
                    {userId && (
                        <ProfileDropdown />
                    )}

                    {!userId && (
                        <Link href="/signin" passHref>
                            <Button className={`mr-0 ${button.variants.background.main}`} size="md">
                                Login
                            </Button>
                        </Link>
                    )}

                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    );
};