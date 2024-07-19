"use client"
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";
import { button, TextTheme, ThemeColour } from "./primitives";

const Sidebar: React.FC = () => {
	const pathname = usePathname();
	const showSidebar = (pathname !== "/signin" && pathname !== "/signup") ? 1 : 0;
   
	if (!showSidebar) return <></>;

	return (
		<aside
			className={`sidebar ${ThemeColour.variants.background.main}`}
			style={{
				width: "190px",
				color: "#1871cf",
                transition: "all 0.3s ease-in-out",
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
							className={`nav-item ${button.variants.background.main}`}
							style={{
								fontSize: "1.25rem",
								fontWeight: "bold",
								marginBottom: "1rem",
								color: "#808080",
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
										fontSize: "1.1rem",
										color: "#808080",
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
										fontSize: "1.1rem",
										color: "#808080",
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
							className={`nav-item mt-4 ${button.variants.background.main}`}
							style={{
								fontSize: "1.25rem",
								fontWeight: "bold",
								marginBottom: "1.1rem",
								color: "#808080",
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
										fontSize: "1.1rem",
                                        color: "#808080",
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
										fontSize: "1.1rem",
										textDecoration: "none",
                                        color:"#808080"
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