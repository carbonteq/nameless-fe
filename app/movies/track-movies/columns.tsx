"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type TrackList = {
	id: string;
	movies: string;
	status: "Watched" | "To Watch" | "On Hold";
};

export const columns: ColumnDef<TrackList>[] = [
	{
		accessorKey: "movies",
		header: "Movies",
	},
	{
		accessorKey: "status",
		header: "Status",
	},

];
