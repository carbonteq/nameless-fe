import React from "react";
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
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
		/>
	);

	const navbarStyle = {
		height: "70px",
		padding: "0 60px", // Adjust the padding as needed
		backgroundColor: "#b1aaaa", // Adjust the background color as needed
	};

	const brandStyle = {
		fontSize: "30px", // Adjust the font size of the brand text
		color: "#000000", // Adjust the brand text color as needed
		marginLeft: "-137px", // Move the brand name to the left
		fontFamily: "inter", // Change the font family
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
				<ul className="hidden lg:flex gap-4 justify-start ml-0">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href} style={itemStyle}></NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden md:flex">
					<Button
						size="small"
						style={{
							backgroundColor: "#000000",
							color: "#FFFFFF",
							marginRight: "-100px",
						}}
					>
						<a href="/signin" className="link">
							Login
						</a>
					</Button>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{searchInput}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={item.href}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
											? "danger"
											: "foreground"
								}
								href="#"
								size="lg"
								style={{ color: "#808080" }}
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
