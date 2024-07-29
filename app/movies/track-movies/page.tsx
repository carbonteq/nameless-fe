import DataTable, { columns } from "@/components/table";
import type { Payment } from "./columns";

async function getData(): Promise<Payment[]> {
	// Fetch data from your API here.
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

		// ...
	];
}

export default async function DemoPage() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
