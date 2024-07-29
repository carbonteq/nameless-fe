"use client";

import { title } from "@/components/primitives";
import { Image } from "@nextui-org/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { movie } from "@/components/constants";

import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { CardTitle, CardContent } from "@/components/ui/card";

const MovieDetails = () => {
	const router = useRouter();

	return (
		<Card className="ml-[270px] shadow-lg bg-gray-100 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-97">
			<CardHeader>
				<CardTitle className="pl-7">
					<div className="flex items-center space-x-2 py-3">
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							onClick={() => {
								router.push("/");
							}}
							className="w-[40px] text-5xl rounded-full cursor-pointer"
						>
							&#8249;
						</div>
						<div className={title()}>Details</div>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="mt-[20px] mb-[40px]">
				<div className="flex justify-center space-x-4">
					<Image
						width={266}
						height={400}
						alt="NextUI hero Image"
						src={movie.Poster}
					/>
					<Card className="w-[600px] h-[400px]  p-4  bg-gray-100 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-97 relative min-w-96">
						<CardHeader>
							<CardTitle>
								<div className="text-2xl">{movie.Title}</div>
								<div className="flex w-full items-center space-x-2 text-gray-400 dark:text-gray-600 mt-3">
									<span className="text-yellow-600 dark:text-yellow-400">
										★ {movie.imdbRating}
									</span>
									<span>•</span>
									<span>{movie.Runtime}</span>
								</div>
							</CardTitle>
							<span className="text-red-600 ml-auto">Untracked</span>
						</CardHeader>
						<CardBody>
							<CardContent className="p-0">
								<div className=" text-gray-600 dark:text-gray-400">
									<p>{movie.Plot}</p>
								</div>

								<table className="table-fixed mt-3">
									<tbody>
										<tr>
											<td>Country</td>
											<td className="pl-10">{movie.Country}</td>
										</tr>

										<tr className="mb-4">
											<td>Year</td>
											<td className="pl-10">{movie.Year}</td>
										</tr>

										<tr className="mb-4">
											<td>Cast</td>
											<td className="pl-10">{movie.Actors}</td>
										</tr>

										<tr className="mb-4">
											<td>Director</td>
											<td className="pl-10">{movie.Director}</td>
										</tr>

										<tr className="mb-4">
											<td>Genre</td>
											<td className="pl-10">{movie.Genre}</td>
										</tr>
									</tbody>
								</table>
								{/* <div className="grid grid-cols-4 gap-4 mt-5 ">
									<div className="flex flex-col gap-2">
										<div>Country</div>
										<div>Year</div>
										<div>Cast</div>
										<div>Director</div>
										<div>Genre</div>
									</div>
									<div className="col-span-3 flex flex-col gap-2 relative">
										<div className="flex-1">{movie.Country}</div>
										<div className="flex-1">{movie.Year}</div>
										<div className="flex-1">{movie.Actors}</div>
										<div className="flex-1">{movie.Director}</div>
										<div className="flex-1">{movie.Genre}</div>
									</div>
								</div> */}
							</CardContent>
						</CardBody>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
};

export default MovieDetails;
