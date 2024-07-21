import "@/styles/globals.css";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import { ThemeColour } from "@/components/primitives";

export const metadata: Metadata = {

	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en">
			<head />
			<body
				className={`clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)`}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "" }}>
					<div className="relative flex flex-col h-screen ">
						<Navbar />
						<div className="flex flex-grow">
							<Sidebar />
							<main className="flex-grow mx-auto pt-12 px-6 bg-[#E3E0E0] text-black dark:bg-gray-800 dark:text-white">
								{children}
							</main>

							<Toaster />
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}