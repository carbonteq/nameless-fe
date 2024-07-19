import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { ModeToggle } from "./ui/toggle";
import { button, ThemeColour } from "./primitives";
import Link from "next/link";

export const Navbar = () => {

    const navbarStyle = {
        height: "70px",
        padding: "0", // Adjust the padding as needed
        //backgroundColor: ThemeColour.variants.background.main, // Adjust the background color as needed
        transition: "all 0.3s ease-in-out",
    };

    const brandStyle = {
        fontSize: "45px", // Adjust the font size of the brand text
        color: "#808080", // Adjust the brand text color as needed
        marginLeft: "0", // Remove the left margin for responsiveness
        fontFamily: "Papyrus, sans-serif",
        //    fontFamily: "inter", // Change the font family
    };

    return (
        <NextUINavbar className={`${ThemeColour.variants.background.main} shadow-lg`} maxWidth="full" position="sticky" style={navbarStyle}>
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-0 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-0 pt-2" href="/">
                        <p className="font-bold text-inherit" style={brandStyle}>
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
                    <Button className={`mr-0 ${button.variants.background.main}`} size="md">
                        <Link href="/signin"
                        >Login
                        </Link>
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    );
};