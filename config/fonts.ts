import {
	JetBrains_Mono as FontMono,
	Roboto as FontSans,
} from "next/font/google";
import localFont from "next/font/local";

export const papyrus = localFont({
	src: [
		{
			path: "./Papyrus V2.woff2",
			weight: "400",
			style: "normal",
		},
	],
});

// export const fontSans = FontSans({
// 	subsets: ["latin"],
// 	variable: "--font-sans",
// 	weight: "400",
// });

export const fontMono = FontMono({
	subsets: ["latin"],
	variable: "--font-mono",
});
