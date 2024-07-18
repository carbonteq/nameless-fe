"use client";

import { Link } from "@nextui-org/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
	const pathname = usePathname();
	const showSidebar = (pathname !== "/signin" && pathname !== "/signup") ? 1 : 0;
    const { theme, setTheme } = useTheme();
    
    const setColour=():string=>{
        let colour:string=""
        theme === "dark" ? colour = "#22334b" : colour= "#b1AAAA"
        return colour
    }
   
	if (!showSidebar) return <></>;

	return (
		<aside
			className="sidebar"
			style={{
				backgroundColor: setColour(),
				width: "190px",
				color: "#1871cf",
			}}
		>
			<nav className="p-4">
				<ul
					style={{
						listStyle: "none",
						padding: 0,
					}}
				>
					<li>
						<div
							className="nav-item"
							style={{
								fontSize: "1.25rem",
								fontWeight: "bold",
								marginBottom: "1rem",
								color: "#000000",
								backgroundColor: theme === 'dark' ? "#1a222e" : "#b1AAAA", 
								padding: "0.4rem",
								borderRadius: "7px",
							}}
						>
							Movies
						</div>
						<ul className="pl-5">
							<li>
								<Link
									href="/movies/MyCollections_m"
									className="nav-subitem"
									style={{
										fontSize: "1rem",
										color: "#000000",
										textDecoration: "none",
									}}
								>
									My Collection
								</Link>
							</li>
							<li>
								<Link
									href="/movies/MyTracklist_m"
									className="nav-subitem"
									style={{
										fontSize: "1rem",
										color: "#000000",
										textDecoration: "none",
									}}
								>
									My Tracklist
								</Link>
							</li>
						</ul>
					</li>
					<li>
						<div
							className="nav-item mt-4"
							style={{
								fontSize: "1.25rem",
								fontWeight: "bold",
								marginBottom: "1rem",
								color: "#000000",
								backgroundColor: theme === 'dark' ? "#1a222e" : "#b1AAAA", // Highlight background color
								padding: "0.4rem",
								borderRadius: "7px",
							}}
						>
							Books
						</div>
						<ul className="pl-5">
							<li>
								<Link
									href="/books/MyShelf_b"
									className="nav-subitem"
									style={{
										fontSize: "1rem",
										color: "#000000",
										textDecoration: "none",
									}}
								>
									My Shelf
								</Link>
							</li>
							<li>
								<Link
									href="/books/MyTracklist_b"
									className="nav-subitem"
									style={{
										fontSize: "1rem",
										color: "#000000",
										textDecoration: "none",
									}}
								>
									My Tracklist
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;