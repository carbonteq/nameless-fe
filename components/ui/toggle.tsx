"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { button } from "../primitives";
import { useMemo, useState } from "react";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const [isHovered, setIsHovered] = useState(false);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};
	const isDark = theme === "dark";

	const isMoonHidden = useMemo(
		() => (isDark ? isHovered : !isHovered),
		[isHovered, isDark],
	);
	const isSunHidden = !isMoonHidden;

	return (
		<Button
			className={`${button.variants.background.main} hover:bg-[red] relative`}
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<>
				<Sun
					className={`absolute h-[1.2rem] w-[1.2rem] ${isSunHidden ? "hidden" : ""}`}
				/>
				<Moon
					className={`absolute h-[1.2rem] w-[1.2rem] ${isMoonHidden ? "hidden" : ""}`}
				/>
				<span className="sr-only">Toggle theme</span>
			</>
		</Button>
	);
}
