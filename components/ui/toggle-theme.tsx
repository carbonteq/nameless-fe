"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { button } from "../primitives";
import { useLayoutEffect, useState } from "react";
import classnames from 'classnames'
export default function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const [isHovered, setIsHovered] = useState(false);
	const [isMoonHidden, setIsMoonHidden] = useState(false)
	const isDark = theme === "dark";

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	useLayoutEffect(() => {
		setIsMoonHidden(isDark ? isHovered : !isHovered)
	}, [isHovered, isDark])

	const isSunHidden = !isMoonHidden;

	return (
		<Button
			className={`${button.variants.background.main} relative`}
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<>
				<Sun
					className={classnames('absolute h-[1.2rem] w-[1.2rem]', { hidden: isSunHidden })}
				/>
				<Moon
					className={classnames('absolute h-[1.2rem] w-[1.2rem]', { hidden: isMoonHidden })}
				/>
				<span className="sr-only">Toggle theme</span>
			</>
		</Button>
	);
}
