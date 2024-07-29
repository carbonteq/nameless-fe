"use client";
import { ThemeColour, title } from "@/components/primitives";
import Search from "@/components/search";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Collections = () => {
	const router = useRouter();
	const [isType, setIsType] = useState(false);
	return (
		<>
			<section className="flex ml-[270px] flex-col md:flex-row items-center justify-between">
				<div className="flex justify-start">
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						onClick={() => {
							router.push("/");
						}}
						className="w-[40px] text-5xl rounded-full cursor-pointer"
					>
						&#8249;
					</div>
					<div className={title()}>Collections</div>
				</div>
				<div className="justify-end">
					<Search isShowType={isType} />
				</div>
			</section>

			<section className="flex ml-[275px] flex-wrap gap-6 mt-[50px]">
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 1
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 2
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 3
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 4
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 5
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 1
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 2
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 3
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 4
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 5
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 1
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 2
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 3
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 4
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 5
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 1
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 2
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 3
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 4
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 5
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>

				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
				<Card
					className={`${ThemeColour.variants.background.main} w-[160px] h-[160px] opacity-80 hover:w-[190px] hover:h-[190px] transition-all`}
				>
					<CardHeader>
						<CardTitle className=" flex text-md justify-center">
							Collection 6
						</CardTitle>
					</CardHeader>

					<CardContent></CardContent>

					<CardFooter></CardFooter>
				</Card>
			</section>
		</>
	);
};

export default Collections;
