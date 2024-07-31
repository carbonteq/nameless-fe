"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ThemeColour } from "./primitives";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export default function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {

	const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
	const [stateData, setStateData] = useState(data);

	const table = useReactTable({
		data: stateData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	function handleStatusClick(index: number) {
		setOpenDropdownIndex((prev) => (prev === index ? null : index));
	}

	const updateData = (rowIndex: string, columnId: string, value: string) => {
		const rowId = parseInt(rowIndex);
		setStateData((prev) =>
			prev.map((row, index) => {
				if (index === rowId) {
					console.log(index);
					return {
						...prev[rowId],
						['status']: value,
					};
				}
				return row;
			})
		);
	};

	return (
		<div className="rounded-md border ml-[300px]">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id} className="border font-black text-4xl px-[150px] py-4">
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => {
									const isStatusColumn = cell.column.id === 'status';
									const rowIndex = parseInt(row.id);
									return (
										<TableCell key={cell.id} className="border font-black">
											{isStatusColumn ? (
												<>
													<button
														className="rounded h-[50px] w-[100px] hover:bg-[#b1AAAA] dark:hover:bg-gray-900"
														onClick={() => handleStatusClick(rowIndex)}
													>
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</button>
													{openDropdownIndex === rowIndex && (
														<div
															className={`${ThemeColour.variants.background.main} absolute py-2 px-2 w-[100px] h-[115px] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-20`}
														>
															<div
																onClick={() => {
																	handleStatusClick(rowIndex);
																	updateData(row.id, cell.column.id, "Watched");
																}}
																className="mb-2 p-1 rounded hover:bg-[#969393] dark:hover:bg-[#1a222e]"
															>
																Watched
															</div>
															<div
																onClick={() => {
																	handleStatusClick(rowIndex);
																	updateData(row.id, cell.column.id, "To Watch");
																}}
																className="mb-2 p-1 rounded hover:bg-[#969393] dark:hover:bg-[#1a222e]"
															>
																To Watch
															</div>
															<div
																onClick={() => {
																	handleStatusClick(rowIndex);
																	updateData(row.id, cell.column.id, "On Hold");
																}}
																className="p-1 rounded hover:bg-[#969393] dark:hover:bg-[#1a222e]"
															>
																On Hold
															</div>
														</div>
													)}
												</>
											) : (
												flexRender(cell.column.columnDef.cell, cell.getContext())
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
