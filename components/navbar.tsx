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
        <NextUINavbar className={`${ThemeColour.variants.background.main}`} maxWidth="full" position="sticky" style={navbarStyle}>
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-0 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-0 pt-2" href="/">
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
                    <Button className={`mr-0 ${button.variants.background.main}`} size="md">
                        <a href="/signin" className="link ">
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