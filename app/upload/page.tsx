"use client";
import { useState, useMemo, useEffect } from "react";
import Papa from "papaparse";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { z } from "zod";
import { title } from "@/components/primitives";
import { Tooltip } from "@nextui-org/react";
import { schema } from "../test/page";


const dataSchema = z.object({
    Name: z
        .string({ message: "Name must be a string" })
        .min(10, "Name of atleast 10 characters is required ")
        .max(15, ""),
    Email: z.
        string({ message: "Email must be a string" })
        .email("Invalid email address"),
    Age: z
        .number({ message: "Age Must be a number" })
        .nonnegative("Age must be a non-negative integer")
        .max(35, { message: "Age Cannot exceed 35" }),
});

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [invalidCells, setInvalidCells] = useState({});
    const [isUploaded, setIsUploaded] = useState(false)

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0])
    };

    const handleFileUpload = () => {

        if (!file) {
            alert("No File Attached");
            return;
        }
        setIsUploaded(true)
        const reader = new FileReader();
        reader.readAsText(file);

        // Event Handler
        reader.onload = async (event) => {
            Papa.parse(event.target.result, {
                header: true,
                dynamicTyping: true,
                complete: (results: { data: any; }) => {
                    const parsedData = results.data;
                    const invalidCellsTemp = {};

                    // Validate each row and cell
                    parsedData.forEach((row, rowIndex) => {
                        try {
                            dataSchema.parse(row);
                        } catch (err) {
                            invalidCellsTemp[rowIndex] = err.errors.reduce((acc, error) => {
                                acc[error.path] = error.message;     // Set the property with invalid state to true
                                return acc;                 // { error.path = 'name' acc [ name : true  , email : true ]
                            }, {});
                        }
                    });

                    setData(parsedData);
                    setInvalidCells(invalidCellsTemp);
                },
            });
        };

    };

    const columnHelper = createColumnHelper();

    const columns = useMemo(() =>
        data[0] ? Object.keys(data[0]).map((key) =>
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
        initialState: { pagination: { pageSize: 8 } },
    });

    return (
        <div className="ml-[280px]">
            {!isUploaded && (
                <div className="border border-dashed border-gray-500 relative">
                    <input type="file" accept=".csv" onChange={handleFileChange} className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" />
                    <div className="text-center px-10 py-5 absolute top-0 right-0 left-0 m-auto">
                        {!file && (
                            <h4 className="pt-[85px]">
                                Drop files anywhere to upload
                            </h4>
                        )}

                        {file && (
                            <h4 className="pt-[75px]">
                                File Selected
                                <br />(Click Upload to Proceed)
                            </h4>

                        )}
                    </div>
                    <div className="flex justify-center">
                        <button className="mb-6 rounded-3xl hover:border-2 hover:border-cyan-900 hover:px-12 hover:py-5 hover:shadow-2xl transition-all px-8 py-3 bg-[#b1AAAA] dark:bg-gray-900 " onClick={handleFileUpload}>Upload</button>
                    </div>
                </div>
            )}


            {data.length > 0 && file && (
                <>
                    <div className="flex items-center space-x-2">
                        <div
                            onClick={() => {
                                setIsUploaded(false);
                                setFile(null)
                                setData([])
                            }}
                            className="w-[40px] text-5xl rounded-full cursor-pointer"
                        >
                            &#8249;
                        </div>
                        <div className={title()}>Validation Form</div>
                    </div>
                    <div className="mt-6 flex flex-col justify-center align-middle bg-[#b1AAAA] dark:bg-gray-900 opacity-80 dark:opacity-80 ">
                        <table>
                            <thead className="text-lg">
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
                                    <tr key={row.id} className="border">
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className={`border p-3 px-4 ${invalidCells[row.index]?.[cell.column.id]
                                                    ? "bg-red-800 text-white"
                                                    : ""
                                                    }`}
                                            >
                                                {invalidCells[row.index]?.[cell.column.id] ? (
                                                    <Tooltip
                                                        content={invalidCells[row.index][cell.column.id]}
                                                        color="error"
                                                        placement="topStart"
                                                    >
                                                        <span>
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext(),
                                                            )}
                                                        </span>
                                                    </Tooltip>
                                                ) : (
                                                    flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-[50px]">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="p-4"
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
                </>
            )}

        </div>
    );
}
