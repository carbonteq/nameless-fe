"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeColour } from "@/components/primitives";
import Row from "@/components/row";
import { useToast } from "@/components/ui/use-toast";
import { convertToJson } from "../jsonSchemaCreator";
import Ajv from "ajv";
import metaSchema from "../metaSchema";
import { DEFAULT_CONSTRAINTS, TYPES } from "@/components/constants";
import Draggable from "@/components/Draggable";
import { userService } from "../services/userService";

export interface Con {
	name: string;
	value: string;
}
export interface IColumn {
	name: string;
	typeSelected: string;
	items: string[]
	constraints: Con[];
}

const SchemaCreator = () => {
	const router = useRouter();
	// const dispatch = useDispatch();
	const { toast } = useToast();
	const [schemaName, setSchemaName] = useState<string>()
	const [rowSelected, setRowSelected] = useState(0)
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
		const exist: boolean = !(rows[rowIndex].typeSelected === "" || rows[rowIndex].typeSelected === null)
		if (!exist) {
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

	const handleChangeKey = (index: number, value: number) => {
		handleChangeRow(index, "name", value);
	};

	const handleChangeConstraint = (index: number, name: string, value: string) => {
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

	const handleRemoveConstraint = (index: number, constraintName: string) => {
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

	const handleRemoveRow = (index: number) => {
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

	const handleDuplicateRow = (index: number) => {
		setRows((prevRows) => [...prevRows, {
			name: rows[index].name + '_copy',
			typeSelected: rows[index].typeSelected,
			constraints: rows[index].constraints,
			items: rows[index].items
		},
		]);
	}

	const validateConstraintInput = () => {
		let consErrors: string[] = []
		rows.map((row, index) => {
			row.constraints.map((constraint) => {
				if (constraint.name === 'min' || constraint.name === 'max' || constraint.name === 'minLength' || constraint.name === 'maxLength' || constraint.name === 'format') {
					if (constraint.value === "") {
						consErrors.push(`Error in Constraint ${constraint.name} Value in row ${index + 1}`)
					}
				}
			})
		})
		return consErrors
	}

	const validateKeyNames = (): string[] => {
		let keyErrors: string[] = []
		let emptyErrCheck: boolean
		rows.map((row1, index1) => {
			emptyErrCheck = false
			if (row1.name === "") {
				keyErrors.push(`Empty Key Name in Row ${index1 + 1}`)
				emptyErrCheck = true
			}
			if (!emptyErrCheck) {
				rows.map((row2, index2) => {
					if ((index2 > index1) && (row1.name.trim() === row2.name.trim())) {
						keyErrors.push(`Same Key Name in Row ${index1 + 1} and Row ${index2 + 1} `)
					}
				})
			}
		})
		return keyErrors
	}

	const validateSchemeNameInput = (): string | null => {
		let nameError: string = ""
		if (!schemaName || schemaName.length < 3) {
			nameError = "Schema Name Required"
			return nameError
		}
		return null
	}

	const castValue = (constraint: Con, typeSelected: string) => {
		// Type Cast the values from string to integer and boolean where required

		return (constraint.name === "min" || constraint.name === "max" || constraint.name === "minLength" || constraint.name === "maxLength" || (constraint.name === "default" && typeSelected !== 'string')) ? Number(constraint.value) : ((constraint.name === 'default' && typeSelected === 'string') || constraint.name === 'format') ? constraint.value : true
	}

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		if (rows.length !== 0) {
			// Validation Part for Empty Contraints or Key Names
			const keyErrors = validateKeyNames()
			const consErrors = validateConstraintInput()
			const schemaNameError = validateSchemeNameInput()
			let errors: string[] = []
			if (schemaNameError) {
				errors = [schemaNameError, ...keyErrors, ...consErrors]
			}
			else {
				errors = [...keyErrors, ...consErrors]
			}

			if (errors.length !== 0) {
				const showErrors = errors.reduce((acc, err) => `${acc}\n${err}`)
				toast({
					title: "ERROR",
					description: showErrors,
				});
				return
			}
			else {
				const keys = rows.map(({ name, typeSelected, constraints }) => (
					{
						name,
						typeSelected,
						constraints: constraints.map((constraint: Con) => ({
							...constraint,
							value: castValue(constraint, typeSelected)
						}))
					}
				));


				const testSchema = convertToJson(keys, schemaName)

				const metaValidator = new Ajv({ strict: true });
				metaValidator.validateSchema(metaSchema, true);
				const validator = metaValidator.compile(metaSchema);


				console.log(validator(testSchema));

				// To check the error returned 

				if (!validator(testSchema)) {
					console.log(validator.errors);
				};
				const SCHEMA = {
					schema: testSchema,
					dataStoreId: null
				}

				await userService.schemaCreator(SCHEMA, () => router.push("/schemas"))

			}
		}
		else {
			toast({
				title: "ERROR",
				description: "No Row Added",
			});
			return
		}
	};

	const renderDroppedItems = (index: number) => {
		return rows.map((item, i) => {

			// console.log("Checking Rows => ", item)

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
									onClick={() => handleRemoveRow(index)}
								>
									X
								</button>
							</div>
						</div>
					);
				}
				else if (itemElement === "min" || itemElement === "max" || itemElement === "minLength" || itemElement === "maxLength") {
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
				}
				else if (itemElement === "default") {
					const inputType = rows[index].typeSelected === 'string' ? "text" : "number"
					const constraint = rows[index].constraints.find(
						(c) => c.name === itemElement
					);
					return (
						<div key={itemIndex}>
							<div
								className="h-12 flex justify-center px-4 gap-x-2 items-center rounded-full text-black text-center align-middle bg-[#cbd4e2] dark:bg-[#1a222e] dark:text-white"
							>
								{itemElement}:
								<input
									type={inputType}
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
					)
				}
				else if (itemElement === "format") {
					const constraint = rows[index].constraints.find(
						(c) => c.name === itemElement
					);


					return (
						<div key={itemIndex}>
							<div
								className="h-12 flex justify-center px-4 gap-x-2 items-center rounded-full text-black text-center align-middle bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white"
							>
								{itemElement}:
								<select
									className={`dark:bg-gray-900  bg-[#c2cad7] justify-center dropdown p-2`}
									onChange={(e) => {
										handleChangeConstraint(index, 'format', e.target.value)
									}}
								>
									<option value="">
										Select
									</option>
									<option>
										uuid
									</option>
									<option>
										email
									</option>
									<option>
										url
									</option>
								</select>
								<button
									className="w-[20px] h-[20px] text-[10px] bg-red-500 rounded-full"
									type="button"
									onClick={() => handleRemoveConstraint(index, itemElement)}
								>
									X
								</button>
							</div>
						</div>
					)
				}
				else {
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

	return (
		<div
			className={`flex flex-col rounded-xl p-4 -mt-11 bg-opacity-50 ${ThemeColour.variants.background.main}`}
		>
			<div className="flex justify-center items-center">
				<input value={schemaName} onChange={(e) => setSchemaName(e.target.value)} type="text" placeholder="Schema Name" className=" p-2 m-2 w-[200px] rounded text-center" />
			</div>
			<div className="flex gap-4">
				<div className="flex flex-col gap-4">
					<div className="w-[202px] h-[272px] bg-gray-100 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-xl flex flex-col items-center p-4">
						<h1 className="text-2xl font-bold">Types</h1>
						<div className="flex flex-col flex-1 justify-center overflow-auto appearance-none">
							{TYPES.map((type) => (
								<Draggable key={type} type={type}>
									{type}
								</Draggable>

							))}
						</div>
					</div>

					<div className="w-[202px] h-[272px] overflow-auto bg-gray-100 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-xl flex flex-col items-center p-4">
						<h1 className="text-2xl font-bold">Constraints</h1>
						<div className="flex flex-col flex-1 justify-center ">
							{rows[rowSelected]?.typeSelected ? (
								<>
									{DEFAULT_CONSTRAINTS[rows[rowSelected].typeSelected].map((cons) => {
										return (
											<Draggable key={cons} type={cons}>
												{cons}
											</Draggable>
										)
									}
									)}
								</>
							) : <p className="text-center">
								Please Select a Type First to Add Constraints
							</p>}
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
							renderDroppedItems={renderDroppedItems}
							addItemToRow={addItemToRow}
							addTypeToRow={addTypeToRow}
							addConstraintToRow={addConstraintToRow}
							rows={rows}
							rowSelected={rowSelected}
							setRowSelected={setRowSelected}
							handleRemoveRow={handleRemoveRow}
							handleDuplicateRow={handleDuplicateRow}
						/>
					))}
					<div className="flex justify-center">
						<button className=" h-10 w-10 font-black text-2xl text-center rounded-full border-2 border-gray-500 hover:h-11 hover:w-11 transition-all" onClick={handleNewRow}>+</button>
					</div>
				</div>
			</div>
			<div className="mt-3 flex justify-center">
				<button onClick={handleSubmit} className="font-black mb-6 border border-gray-500 dark:border-white rounded-3xl hover:border-2 hover:border-cyan-900  hover:shadow-2xl px-8 py-3 bg-[#b1AAAA] dark:bg-gray-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300" >Submit</button>
			</div>
		</div>
	);
}

export default SchemaCreator;

