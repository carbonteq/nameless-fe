// pages/upload.js
"use client";
import { useState, useMemo } from "react";
import Papa from "papaparse";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { z } from "zod";

// Define Zod schema for validation
const dataSchema = z.object({
    name: z
        .string()
        .min(10, "Name of atlease 10 characters is required ")
        .max(15, ""),
    email: z.string().email("Invalid email address"),
    age: z
        .number({ message: "Age Must be a number" })
        .nonnegative("Age must be a non-negative integer")
        .max(35, { message: "Age Cannot exceed 35" }),
});

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [invalidCells, setInvalidCells] = useState({});

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (!file) {
            alert("No File Attached");
            return;
        }
        const reader = new FileReader();
        reader.onload = async (event) => {
            if (event.target) {
                Papa.parse(event.target.result, {
                    header: true,
                    dynamicTyping: true,
                    complete: (results: { data: any; }) => {
                        const parsedData = results.data;
                        const invalidCellsTemp = {};

                        // Validate each row and cell
                        parsedData.forEach((row: unknown, rowIndex: string | number) => {
                            try {
                                dataSchema.parse(row);
                            } catch (err) {
                                invalidCellsTemp[rowIndex] = err.errors.reduce((acc, error) => {
                                    acc[error.path] = true;     // Set the property with invalid state to true
                                    return acc;                 // { error.path = 'name' acc [ name : true  , email : true ]
                                }, {});
                            }
                        });

                        setData(parsedData);
                        setInvalidCells(invalidCellsTemp);
                    },
                });
            };
            reader.readAsText(file);
        }

    };

    const columnHelper = createColumnHelper();

    const columns = useMemo(
        () =>
            data[0]
                ? Object.keys(data[0]).map((key) =>
                    columnHelper.accessor(key, {
                        header: key,
                    }),
                )
                : [],
        [data],
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    return (
        <div className="ml-[280px]">
            <h1>Upload CSV</h1>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
            {data.length > 0 && (
                <div>
                    <table className="border">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th className="border p-2" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                // Don't need to make the whole row red
                                <tr key={row.id} className={`border `}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            // Checks whether the row id is invalid ( Stored in invalid cells ) with invalidCells[row.index]?
                                            // If it exists then it checks if the specific cell (represented by column) is infected in the row or not
                                            className={`border p-3 px-4 ${invalidCells[row.index]?.[cell.column.id]
                                                ? "bg-red-800"
                                                : ""
                                                }`}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-[50px]">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="pr-4"
                        >
                            Previous
                        </button>
                        <span className="p-4">
                            Page {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </span>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="p-4"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
