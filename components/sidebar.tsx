"use client";
import { usePathname } from "next/navigation";
import { button, HoverButton, TextTheme, ThemeColour } from "./primitives";
import Link from "next/link";

const Sidebar: React.FC = () => {
	const pathname = usePathname();
	const showSidebar = pathname !== "/signin" && pathname !== "/signup" ? 1 : 0;

	if (!showSidebar) return <></>;

	return (
		<>
			<div
				className={`sidebar fixed top-[60px] bottom-0 lg:left-0 p-2 w-[230px] overflow-y-auto text-center ${ThemeColour.variants.background.main}`}
				style={{ transition: "all 0.3s ease-in-out" }}
			>
				<div className=" mt-6 flex items-center rounded-md px-3 duration-300 text-white">
					<i className="bi bi-house-door-fill" />
					<span className="text-[25px] ml-4 text-gray-800 dark:text-white font-bold">
						Movies
					</span>
				</div>

				<div
					className="text-left text-sm mt-2 w-4/5 mx-auto font-bold"
					id="submenu"
				>
					<h1 className="cursor-pointer p-2 text-gray-600 hover:bg-[#969393] dark:text-white dark:hover:bg-[#1a222e] rounded-md mt-1">
						<Link href="/movies/collections" className="block w-full h-full">
							Collections
						</Link>
					</h1>
					<h1 className="cursor-pointer p-2 text-gray-600 hover:bg-[#969393] dark:text-white dark:hover:bg-[#1a222e] rounded-md mt-1">
						<Link href="/movies/track-movies" className="block w-full h-full">
							Track List
						</Link>
					</h1>
				</div>
				{/* Straight Line */}
				<div className="my-4 bg-gray-600 h-[1px]" />

				<div className=" mt-3 flex items-center rounded-md px-3 duration-300 text-white">
					<i className="bi bi-bookmark-fill" />
					<span className="text-[25px] ml-4 text-gray-800 dark:text-white font-bold">
						Books
					</span>
				</div>

				<div
					className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
					id="submenu"
				>
					<h1 className="cursor-pointer p-2 text-gray-600 hover:bg-[#969393] dark:text-white dark:hover:bg-[#1a222e] rounded-md mt-1">
						<Link href="/books/shelf" className="block w-full h-full">
							Shelves
						</Link>
					</h1>
					<h1 className="cursor-pointer text-gray-600 p-2 hover:bg-[#969393] dark:text-white dark:hover:bg-[#1a222e] rounded-md mt-1">
						<Link href="/books/track-books" className="block w-full h-full">
							Track Shelf
						</Link>
					</h1>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
