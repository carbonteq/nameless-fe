"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { button } from "../primitives";
import { useState } from "react";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const [isHovered, setIsHovered] = useState(false);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<Button
			className={`${button.variants.background.main} hover:bg-[#9c9696] relative`}
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{theme === 'dark' && (
				<><Sun
					className={`absolute h-[1.2rem] w-[1.2rem]  ${isHovered ? 'opacity-100' : 'opacity-0'
						}`}
				/>
					<Moon
						className={`absolute h-[1.2rem] w-[1.2rem] ${!isHovered ? 'opacity-100' : 'opacity-0'
							}`}
					/>
					<span className="sr-only">Toggle theme</span>
				</>)}

			{theme === 'light' && (
				<><Sun
					className={`absolute h-[1.2rem] w-[1.2rem] ${isHovered ? 'opacity-0' : 'opacity-100'
						}`}
				/>
					<Moon
						className={`absolute h-[1.2rem] w-[1.2rem] ${!isHovered ? 'opacity-0' : 'opacity-100'
							}`}
					/>
					<span className="sr-only">Toggle theme</span>
				</>)}

		</Button>
	);
}
