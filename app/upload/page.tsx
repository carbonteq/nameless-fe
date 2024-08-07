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
import { ThemeColour, title } from "@/components/primitives";
import { Tooltip } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import createValidationSchema from "../zodSchemaCreator";
import Newlines from "@/components/new-line";


type mapping = {
    name: string,
    value: string
}

export default function UploadPage() {

    const keys = useSelector((state: RootState) => state.validationSchema.schema);
    const dataSchema = createValidationSchema(keys);

    let schemaKeyNames: string[] = keys?.map((key) => key.name) || []

    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [invalidCells, setInvalidCells] = useState({});
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [showMapper, setShowMapper] = useState<boolean>(false);
    const [headerMapping, setHeaderMapping] = useState<mapping>();
    const [mappedKeys, setMappedKeys] = useState([{}])
    const [isMatch, setIsMatch] = useState([{}])

    const handleFileChange = (e: { target: { files: any[]; }; }) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0])
    };

    const handleMappingChange = (csvHeader: string, mappedKey: string) => {
        setHeaderMapping((prev) => ({ ...prev, [csvHeader]: mappedKey }));
    };

    const autoMatching = () => {
        columns.map((column, index) => {
            schemaKeyNames.map((key) => {
                console.log("KEYS FROM SCHEMA => ", key);
                console.log("COLUMN NAME => ", column.header);


                if (column.header === key) {
                    handleMappingChange(column.header, key)
                    setMappedKeys(prev => [...prev, { name: key, value: index }])
                }
            })
        })

        console.log("AFTER MAPPING AUTOMATICALLY => ", headerMapping);


    }

    const handleFileUpload = () => {

        if (!file) {
            alert("No File Attached");
            return;
        }
        const reader = new FileReader();
        reader.readAsText(file);


        // Event Handler
        reader.onload = async (event) => {
            console.log("FILE STRUCTURE", event.target?.result);
            console.log("FILE STRUCTURE", keys);

            Papa.parse(event.target.result, {
                header: true,
                dynamicTyping: true,
                complete: (results: { data: any }) => {
                    const parsedData = results.data;
                    setData(parsedData);
                    console.log("THIS IS MY ORIGINAL CSV FILE => ", parsedData);

                    setShowMapper(true)

                },
            });
        };
    };

    const handleFinalMappedUpload = () => {
        if (!file) {
            alert("No File Attached");
            return;
        }

        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = async (event) => {
            Papa.parse(event.target.result, {
                header: true,
                dynamicTyping: true,
                transformHeader: (header) => headerMapping[header] || header,
                complete: (results) => {
                    const parsedData = results.data;
                    setData(parsedData);
                    console.log("TRANSFORMED DATA => ", parsedData);

                    const invalidCellsTemp = {};

                    //Validate each row and cell
                    parsedData.forEach((row, rowIndex) => {
                        console.log("CHECKING FOR ERRORS = ", row);
                        try {
                            dataSchema.parse(row);
                        } catch (err) {
                            console.log("IN ERROR REGION ", rowIndex);

                            invalidCellsTemp[rowIndex] = err.errors.reduce((acc, error) => {
                                if (!acc[error.path]) {
                                    acc[error.path] = error.message;
                                }
                                else {
                                    acc[error.path] += '\n' + error.message;     // Set the property with invalid state to true
                                }
                                return acc;                 // { error.path = 'name' acc [ name : true  , email : true ]
                            }, {});
                        }
                    });

                    setIsUploaded(true)
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
        <div>
            {!isUploaded && !showMapper && (
                <div className="border border-dashed border-gray-500 relative">
                    <input type="file" accept=".csv" onChange={handleFileChange} className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" />
                    <div className="text-center px-10 py-5 absolute top-0 right-0 left-0 m-auto">
                        {!file && (
                            <h4 className="pt-[85px]">
                                Drop files anywhere to upload or Click to add
                            </h4>
                        )}

                        {file && (
                            <h4 className="pt-[75px]">
                                <div className="text-xl">{file.name} (Selected)</div>
                            </h4>

                        )}
                    </div>
                    <div className="flex justify-center">
                        <button className="mb-6 rounded-3xl hover:border-2 hover:border-cyan-900 hover:px-12 hover:py-5 hover:shadow-2xl transition-all px-8 py-3 bg-[#b1AAAA] dark:bg-gray-900 " onClick={handleFileUpload}>Upload</button>
                    </div>
                </div>
            )}

            {(showMapper && !isUploaded) && (
                <div className="flex flex-col justify-center items-center gap-6">
                    <table className="w-[600px] border p-4">
                        <thead>
                            <tr className="flex-1 gap-52">
                                <th className="border text-2xl py-4">Column Header</th>
                                <th className="border text-2xl py-4">Key Names</th>
                            </tr>
                        </thead>
                        <tbody className="mt-10">
                            {columns.map((column, index) => (
                                <tr
                                    className={`${ThemeColour.variants.background.main} p-4 opacity-80`}
                                    key={index}
                                >
                                    <td className="p-4 border">{column.header}</td>
                                    <td className="p-4 border">
                                        <select
                                            className={`${ThemeColour.variants.background.main} w-full h-full justify-center dropdown`}
                                            onChange={(e) => {
                                                handleMappingChange(column.header, e.target.value)
                                                // If A Mapped Key already exist for this index 
                                                if (mappedKeys.some((mappedKey) => mappedKey?.value === index)) {
                                                    setMappedKeys(prev => prev.filter(mapped => mapped.value !== index))
                                                    // In Case of switching from one key to another
                                                    if (e.target.value !== "") {
                                                        setMappedKeys(prev => [...prev, { name: e.target.value, value: index }])
                                                    }
                                                }
                                                else {
                                                    setMappedKeys(prev => [...prev, { name: e.target.value, value: index }])
                                                }

                                            }}
                                        >
                                            <option value="">Select a key</option>
                                            {schemaKeyNames.map((item, idx) => {
                                                if (!mappedKeys.some(mappedKey => mappedKey.name === item && mappedKey.value !== index)) {
                                                    return (
                                                        <option key={idx} value={item}>
                                                            {item}
                                                        </option>
                                                    )
                                                }
                                            })}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className=" mt-4 rounded-3xl hover:border-2 hover:border-cyan-900 hover:px-12 hover:py-5 hover:shadow-2xl transition-all px-8 py-3 bg-[#b1AAAA] dark:bg-gray-900 "
                        onClick={handleFinalMappedUpload}
                    >
                        Map
                    </button>
                </div>
            )
            }


            {/* Final Validation Table */}


            {
                isUploaded && (
                    <>
                        <div className="flex items-center space-x-2">
                            <div
                                onClick={() => {
                                    setIsUploaded(false);
                                    setFile(null)
                                    setData([])
                                    setHeaderMapping({})
                                    setShowMapper(false)
                                    setMappedKeys([])
                                }}
                                className="w-[40px] text-5xl rounded-full cursor-pointer"
                            >
                                &#8249;
                            </div>
                            <div className={title()}>Validation Form</div>
                        </div>
                        <div className=" border mt-6 flex flex-col overflow-auto justify-center align-middle bg-[#b1AAAA] dark:bg-gray-900 opacity-80 dark:opacity-80 ">
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
                                                            content={
                                                                <div className="px-1 py-2">
                                                                    <Newlines text={invalidCells[row.index][cell.column.id]} />
                                                                </div>
                                                            }
                                                            color="error"
                                                            placement="top"
                                                            showArrow={true}
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
                )
            }

        </div >
    );
}

