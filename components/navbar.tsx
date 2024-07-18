"use client"
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
import { Input } from "@nextui-org/input";
import NextLink from "next/link";
import { ModeToggle } from "./ui/toggle";
import { useTheme } from "next-themes";

export const Navbar = () => {

    const { theme } = useTheme();

    // const searchInput = (
    //     <Input
    //         aria-label="Search"
    //         classNames={{
    //             inputWrapper: "bg-default-100",
    //             input: "text-sm",
    //         }}
    //     />
    // );

    const navbarStyle = {
        height: "70px",
        padding: "0 60px", // Adjust the padding as needed
        backgroundColor: theme === "dark" ? "#22334b" : "#b1AAAA", // Adjust the background color as needed
        transition: "all 0.3s ease-in-out",
    };

    const brandStyle = {
        fontSize: "30px", // Adjust the font size of the brand text
        color: "#000000", // Adjust the brand text color as needed
        marginLeft: "0", // Remove the left margin for responsiveness
        fontFamily: "Papyrus, sans-serif",
        //    fontFamily: "inter", // Change the font family
    };

    const itemStyle = {
        fontSize: "14px", // Adjust the font size of the nav items
        color: "#b1aaaa", // Adjust the nav item text color as needed
        margin: "0 12px", // Add margin between nav items
    };

    return (
        <NextUINavbar maxWidth="xl" position="sticky" style={navbarStyle}>
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-0 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-0" href="/">
                        <p className="font-bold text-inherit" style={brandStyle}>
                            NAMELESS
                        </p>
                    </NextLink>
                </NavbarBrand>
                {/* <ul className="hidden lg:flex gap-4 justify-start ml-0">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href} style={itemStyle}>
                            <Link href={item.href}>{item.label}</Link>
                        </NavbarItem>
                    ))}
                </ul> */}
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    <ModeToggle />
                </NavbarItem>
                <NavbarItem className="hidden md:flex">
                    <Button
                        size="md"
                        style={{
                            backgroundColor: theme === "dark" ? "#1a222e" : "#b1AAAA",
                            //color: "#FFFFFF",
                            marginRight: "0",
                        }}
                    >
                        <a href="/signin" className="link">
                            Login
                        </a>
                    </Button>
                </NavbarItem>
            </NavbarContent>

            {/* <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <ModeToggle />
                <NavbarMenuToggle />
            </NavbarContent> */}
            {/* <NavbarMenu>
                {siteConfig.navItems.map((item) => (
                    <NavbarMenuItem key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu> */}
        </NextUINavbar>
    );
};