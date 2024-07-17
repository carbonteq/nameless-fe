
import "@/styles/globals.css";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

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
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<div className="flex flex-grow">
							<Sidebar />
							<main className="container mx-auto max-w-7xl pt-12 px-6 flex-grow">
								{children}
							</main>
						</div>
						<footer className="w-full flex items-center justify-center py-3">
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
