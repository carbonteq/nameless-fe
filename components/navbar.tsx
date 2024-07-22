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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";

export const Navbar = () => {

    const [user, setUser] = useState(true)

    const navbarStyle = {
        height: "70px",
        padding: "0", // Adjust the padding as needed
        transition: "all 0.3s ease-in-out",
    };

    function handleProfileOptions(): void {
        setUser(prev => !prev)
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
                    {user && (
                        <div className="">
                            <Avatar onClick={handleProfileOptions} >
                                <AvatarImage src="https://github.com/shadcn.png" sizes="full" />
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>
                        </div>
                    )}

                    {!user && (
                        <Button className={`mr-0 ${button.variants.background.main}`} size="md">
                            <Link href="/signin"
                            >Login
                            </Link>
                        </Button>
                    )}

                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    );
};