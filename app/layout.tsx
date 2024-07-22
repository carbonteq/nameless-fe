import "@/styles/globals.css";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import { ThemeBack } from "@/components/primitives"; // Import the ThemeBack object

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
		{ media: "(prefers-color-scheme: light)", color: "cyan" },
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
				className={clsx(
					"min-h-screen font-sans antialiased",
					fontSans.variable,
					"bg-cover bg-center",
					ThemeBack.variants.background.main, // Apply the background image classes
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<div className="flex flex-grow">
							<Sidebar />
							<main className="container mx-auto max-w-7xl pt-12 px-6 flex-grow">
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