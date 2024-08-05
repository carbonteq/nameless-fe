"use client";
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { setSchema } from "../redux/slices/validationSchemaSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ThemeColour } from "@/components/primitives";
import Row from "@/components/row";
import React from "react";

interface Con {
	name: string;
	value: string;
}

interface IColumn {
	name: string;
	typeSelected: string;
	items: string[]
	constraints: Con[];
}

const defaultConstraints = {
	string: ["Min", "Max"],
	integer: ["Min", "Max"],
	email: ["regex"],
};

const defaultType = ["string", "email", "integer"];

const Home = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	// Final Keys to save in Redux State and generate the ZOD scheme

	// const [keys, setKeys] = useState<Key[]>([]);

	const [type, setType] = useState<string>();

	// ------------------------------------------------------------------------

	// Array of Rows to store all All Related Values of a key

	const [rows, setRows] = useState<IColumn[]>([{
		name: "",
		typeSelected: "",
		items: [],
		constraints: []
	}]);

	const addItemToRow = (rowIndex: number, newItem: string) => {
		setRows(prevRows =>
			prevRows.map((row, index) =>
				index === rowIndex ? { ...row, items: [...row.items, newItem] } : row
			)
		);
	};

	const addTypeToRow = (rowIndex: number, newItem: string) => {
		let exist: boolean
		exist = (rows[rowIndex].typeSelected === "" || rows[rowIndex].typeSelected === null) ? false : true
		if (exist === false) {
			setRows(prevRows =>
				prevRows.map((row, index) =>
					index === rowIndex ? { ...row, typeSelected: newItem } : row
				)
			);
			return false
		}
		else {
			return true
		}
	}

	const addConstraintToRow = (rowIndex: number, newCons: string) => {
		let temp: boolean
		let cArr: string[] = rows[rowIndex].constraints.map((con) => con.name)
		temp = cArr.includes(newCons)
		if (temp === false) {
			setRows(prevRows =>
				prevRows.map((row, index) =>
					index === rowIndex ? { ...row, constraints: [...row.constraints, { name: newCons, value: "" }] } : row
				)
			);
			return false
		}
		else {
			return true
		}

	}

	const handleChangeRow = (index: number, field: string, value: number) => {
		setRows((prevRows) =>
			prevRows.map((row, i) =>
				i === index ? { ...row, [field]: value } : row
			)
		);
	};

	const handleChangeKey = (index, value) => {
		handleChangeRow(index, "name", value);
	};

	const handleChangeConstraint = (index, name, value) => {
		setRows((prevRows) =>
			prevRows.map((row, i) =>
				i === index
					? {
						...row,
						constraints: row.constraints.map((constraint) =>
							constraint.name === name ? { ...constraint, value } : constraint
						),
					}
					: row
			)
		);
	};

	const handleRemoveConstraint = (index, constraintName) => {
		setRows((prevRows) =>
			prevRows.map((row, i) =>
				i === index
					? {
						...row,
						constraints: row.constraints.filter(
							(constraint) => constraint.name !== constraintName
						),
						items: row.items.filter((item) => item !== constraintName),
					}
					: row
			)
		);
	};

	const handleRemoveType = (index: number) => {
		setRows((prevRows) =>
			prevRows.filter((_, i) => i !== index)
		);
	};

	const handleNewRow = () => {
		setRows((prevRows) => [
			...prevRows,
			{
				name: "",
				typeSelected: null,
				constraints: [],
				items: [],
			},
		]);
	};

	const renderDroppedItems = (index) => {
		return rows.map((item, i) => {

			console.log("Checking Rows => ", item)

			if (i !== index) return null;
			return item.items.map((itemElement, itemIndex) => {
				if (itemElement === rows[index].typeSelected) {
					return (
						<div className="flex gap-4" key={itemIndex} >
							<input
								type="text"
								value={rows[index].name}
								onChange={(e) => handleChangeKey(index, e.target.value)}
								placeholder="Key Name"
								className="w-30 h-12 rounded-full p-4 text-black bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white"
								required
							/>
							<div
								className="w-24 h-12 flex justify-center gap-x-2 items-center rounded-full text-black text-center align-middle bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white"
							>
								{rows[index].typeSelected}
								<button
									className="w-[20px] h-[20px] text-[10px] bg-red-500 rounded-full"
									type="button"
									onClick={() => handleRemoveType(index)}
								>
									X
								</button>
							</div>
						</div>
					);
				} else if (itemElement === "Min" || itemElement === "Max") {
					const constraint = rows[index].constraints.find(
						(c) => c.name === itemElement
					);
					return (
						<div key={itemIndex}>
							<div
								className="h-12 flex justify-center px-4 gap-x-2 items-center rounded-full text-black text-center align-middle bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white"
							>
								{itemElement}:
								<input
									type="number"
									value={constraint ? constraint.value : ""}
									onChange={(e) =>
										handleChangeConstraint(index, itemElement, e.target.value)
									}
									className="appearance-none h-6 p-2 rounded-full text-black bg-white dark:bg-gray-800 dark:text-white size-10"
									required
								/>
								<button
									className="w-[20px] h-[20px] text-[10px] bg-red-500 rounded-full"
									type="button"
									onClick={() => handleRemoveConstraint(index, itemElement)}
								>
									X
								</button>
							</div>
						</div>
					);
				} else {
					return (
						<div key={itemIndex}>
							<div
								className="h-12 flex justify-center px-4 gap-x-2 items-center rounded-full text-black text-center align-middle bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white"
							>
								{itemElement}
								<button
									className="w-[20px] h-[20px] text-[10px] bg-red-500 rounded-full"
									type="button"
									onClick={() => handleRemoveConstraint(index, itemElement)}
								>
									X
								</button>
							</div>
						</div>
					);
				}
			});
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const keys = rows.map(({ name, typeSelected, constraints }) => ({
			name,
			typeSelected,
			constraints
		}));

		if (dispatch(setSchema(keys))) {
			console.log("SUCCESS");
		}
		router.push("/upload");
	};

	// const handleAdd = (): void => {
	// 	if (name.length === 0) {
	// 		alert("Key Name is required");
	// 		return;
	// 	}

	// 	let failValidation = constraints.map((constraint) => {
	// 		if (constraint.name === "Min" || constraint.name === "Max") {
	// 			if (constraint.value === "") {
	// 				alert(`${constraint} Value is Required`);
	// 				return "fail";
	// 			}
	// 		}
	// 		return "pass";
	// 	});
	// 	if (failValidation[0] === "fail") {
	// 		console.log(name);
	// 		console.log(constraints);
	// 		console.log(typeSelected);
	// 		return;
	// 	}

	// 	const keyExists = keys.some((key) => key.name === name);

	// 	if (keyExists) {
	// 		alert(
	// 			"A key with the same name already exists. Please choose a different name.",
	// 		);
	// 	} else {
	// 		const newKey: Key = {
	// 			name: name,
	// 			type: typeSelected!,
	// 			constraints: constraints,
	// 		};
	// 		setKeys((prevKeys) => [...prevKeys, newKey]);
	// 		reset();
	// 		console.log(keys);
	// 	}
	// };

	// const reset = () => {
	// 	setName("");
	// 	setTypeSelected(null);
	// 	setConstraints([]);
	// 	setItems([]);
	// 	setIsTypeDisabled(false);
	// };

	// const handleEdit = (selectedKey: Key, index: any) => {
	// 	setItems((prevItems) => [...prevItems, { type: selectedKey.type }])
	// 	selectedKey.constraints.map((constraint) => {
	// 		setItems((prevItems) => [...prevItems, { type: constraint.name }])
	// 		setConstraints((prev) => [...prev, constraint])
	// 	})
	// 	setName(selectedKey.name)
	// 	setTypeSelected(selectedKey.type)
	// 	setIsTypeDisabled(true)
	// 	handleRemoveKeyWithName(selectedKey.name)
	// }

	return (
		<div
			className={`flex flex-col rounded-xl p-4 bg-opacity-50 ${ThemeColour.variants.background.main}`}
		>
			<div className="flex gap-4">
				<div className="flex flex-col gap-4">
					<div className="w-[202px] h-[272px] bg-gray-100 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-xl flex flex-col items-center p-4">
						<h1 className="text-2xl font-bold">Types</h1>
						<div className="flex flex-col flex-1 justify-center overflow-auto appearance-none">
							{defaultType.map((type) => (
								<Draggable key={type} type={type}>
									{type}
								</Draggable>

							))}
						</div>
					</div>

					<div className="w-[202px] h-[272px] overflow-auto bg-gray-100 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-xl flex flex-col items-center p-4">
						<h1 className="text-2xl font-bold">Constraints</h1>
						<div className="flex flex-col flex-1 justify-center ">
							{!type && (
								<p className="text-center">
									Please Select a Type First to Add Constraints
								</p>
							)}
							{type && (
								<>
									{defaultConstraints.string.map((cons) => (
										<Draggable key={cons} type={cons}>
											{cons}
										</Draggable>
									)
									)}
									{defaultConstraints.email.map((cons) => (
										<Draggable key={cons} type={cons}>
											{cons}
										</Draggable>
									)
									)}
								</>
							)}
						</div>
					</div>
				</div>

				<div
					className="flex flex-col h-[560px] gap-4 overflow-auto flex-1 p-4 bg-gray-100 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-xl"
				>
					{rows.map((row, index) => (
						<Row
							key={index}
							index={index}
							setType={setType}
							constraints={row.constraints}
							renderDroppedItems={renderDroppedItems}
							addItemToRow={addItemToRow}
							addTypeToRow={addTypeToRow}
							addConstraintToRow={addConstraintToRow}
							rows={rows}
							defaultConstraints={defaultConstraints}
						/>
					))}
					<div className="flex justify-center">
						<button className=" h-10 w-10 font-black text-2xl text-center rounded-full border-2 border-gray-500 hover:h-11 hover:w-11 transition-all" onClick={handleNewRow}>+</button>
					</div>
				</div>
			</div>
			<div className="mt-4 flex justify-center">
				<button onClick={handleSubmit} className="font-black mb-6 rounded-3xl hover:border-2 hover:border-cyan-900 hover:px-12 hover:py-4 hover:shadow-2xl transition-all px-8 py-3 bg-[#b1AAAA] dark:bg-gray-900 " >Upload</button>
			</div>
		</div>
	);
}

export default Home;

const Draggable = ({ type, children }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type,
		item: { type },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			className={`w-24 h-12 border border-gray-500 rounded-full text-center p-2 m-2 cursor-pointer ${isDragging ? "z-10" : ""}  ${isDragging ? "hidden" : ""}`}
		>
			{children}
		</div>
	);
};
