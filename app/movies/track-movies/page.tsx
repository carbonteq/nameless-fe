"use client"
import DataTable from "@/components/table";
import { columns, type TrackList } from "./columns";
import { title } from "@/components/primitives";
import Search from "@/components/search";

async function getData(): Promise<TrackList[]> {
	return [
		{
			id: "728ed52f",
			status: "Watched",
			movies: "Maze Runner",
		},

		{
			id: "728ed52e",
			status: "On Hold",
			movies: "Parasite",
		},
		{
			id: "728ed52e",
			status: "On Hold",
			movies: "Parasite",
		}, {
			id: "728ed52e",
			status: "On Hold",
			movies: "Parasite",
		}, {
			id: "728ed52e",
			status: "On Hold",
			movies: "Parasite",
		},
		// ...
	];
}



export default async function DemoPage() {
	const data = await getData();

	return (
		<>
			<section className="flex ml-[270px] flex-col md:flex-row items-center justify-between">
				<div className="flex justify-start">
					<div className={title()}>Track List</div>
				</div>
				<div className="justify-end">
					<Search isShowType={false} />
				</div>
			</section>
			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
}
