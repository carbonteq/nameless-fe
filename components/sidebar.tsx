"use client";

import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";
import type React from "react";

const Sidebar: React.FC = () => {
	const pathname = usePathname();
	const showSidebar = pathname !== "/signin" && pathname !== "/signup";

	if (!showSidebar) return <></>;

	return (
		<aside
			className="sidebar"
			style={{
				backgroundColor: "#b1aaa7",
				width: "190px",
				color: "#1871cf",
				fontFamily: "Papyrus, sans-serif", // Apply Papyrus font here
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
								fontWeight: "medium",
								marginBottom: "1rem",
								color: "#000000",
								backgroundColor: "#dcdcdc", // Highlight background color
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
										color: "#f3f9ff",
										textDecoration: "none",
										marginBottom: "1rem", // Increase space between items
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
										color: "#f3f9ff",
										textDecoration: "none",
										marginBottom: "2rem", // Increase space between items
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
								fontWeight: "medium",
								marginBottom: "1rem",
								color: "#000000",
								backgroundColor: "#dcdcdc", // Highlight background color
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
										color: "#f3f9ff",
										textDecoration: "none",
										marginBottom: "1rem", // Increase space between items
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
										color: "#f3f9ff",
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
