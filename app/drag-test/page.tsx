"use client";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { setSchema } from "../redux/slices/validationSchemaSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { button, ThemeColour } from "@/components/primitives";

interface Con {
	name: string;
	value: string;
}

interface Key {
	name: string;
	type: string;
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

	const [keys, setKeys] = useState<Key[]>([]);

	// To Store all properties of a key before the user clicks on ADD = > After that it will be added to keys list

	const [name, setName] = useState("");
	const [typeSelected, setTypeSelected] = useState<string | null>(null);
	const [constraints, setConstraints] = useState<Con[]>([]);

	// ------------------------------------------------------------------------

	const [items, setItems] = useState([]);
	const [isTypeDisabled, setIsTypeDisabled] = useState(false);
	const [selectedKey, setSelectedKey] = useState<Key | null>(null);

	const [_, drop] = useDrop({
		accept: ["email", "string", "integer", "Min", "Max", "regex"],

		drop: (item, monitor) => {
			console.log(item);
			setItems((prevItems) => [...prevItems, item]);
			if (
				item.type === "string" ||
				item.type === "email" ||
				item.type === "integer"
			) {
				setTypeSelected(item.type);
			}

			if (item.type === "Min" || item.type === "Max") {
				setConstraints((prevConstraints) => [
					...prevConstraints,
					{ name: item.type, value: "" },
				]);
			}

			setIsTypeDisabled(true);
		},
	});

	const handleChangeKey = (index, field, value) => {
		setName(value);
	};

	const handleChangeConstraint = (name: string, value: string) => {
		setConstraints((prevConstraints) =>
			prevConstraints.map((constraint) =>
				constraint.name === name ? { ...constraint, value } : constraint,
			),
		);
	};

	const handleRemoveConstraint = (constraintName: string) => {
		setConstraints((prevConstraints) =>
			prevConstraints.filter(
				(constraint) => constraint.name !== constraintName,
			),
		);
		setItems((prevItems) =>
			prevItems.filter((item) => item.type !== constraintName),
		);
	};

	const handleRemoveKey = (index: number) => {
		setKeys((prevKeys) => prevKeys.filter((_, i) => i !== index));
		if (selectedKey && keys[index].name === selectedKey.name) {
			setSelectedKey(null);
		}
	};

	const showKey = (index: number) => () => {
		setSelectedKey(keys[index]);
	};

	const handleRemoveType = (type: string) => {
		setTypeSelected(null);
		setConstraints([]);
		setItems([]);
		setIsTypeDisabled(false);
	};

	const renderDroppedItems = () => {
		return items.map((item, index) => {
			if (item.type === typeSelected) {
				return (
					<>
						<input
							type="text"
							value={name}
							onChange={(e) => handleChangeKey(index, "name", e.target.value)}
							placeholder="Key Name"
							className="w-30 h-12 rounded p-4 mt-2 text-black bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white"
							required
						/>
						<div
							key={index}
							className="w-24 h-12 pt-3 ml-2 mt-2 rounded text-black text-center align-middle bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white"
						>
							{typeSelected}
						</div>
						<button
							className="ml-1 w-[20px] h-[20px] text-[10px] bg-red-500 rounded-full"
							type="button"
							onClick={() => handleRemoveType(item.type)}
						>
							X
						</button>
					</>
				);
			} else if (item.type === "Min" || item.type === "Max") {
				const constraint = constraints.find((c) => c.name === item.type);
				return (
					<>
						<div key={index} className="flex ">
							<label className="pl-2 pt-4 text-md ml-2">{item.type}:</label>
							<input
								type="number"
								value={constraint ? constraint.value : ""}
								onChange={(e) =>
									handleChangeConstraint(item.type, e.target.value)
								}
								className="appearance-none pl-2 mt-2 rounded text-black bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white size-10"
								required
							/>
							<button
								className="ml-1 w-[20px] h-[20px] text-[10px] bg-red-500 rounded-full"
								type="button"
								onClick={() => handleRemoveConstraint(item.type)}
							>
								X
							</button>
						</div>
					</>
				);
			} else {
				return (
					<>
						<div
							key={index}
							className="w-24 h-12 border border-gray-500 p-2 m-2"
						>
							{item.type}
						</div>
						<button
							className="ml-2 w-[20px] h-[20px] text-[10px] bg-red-500 rounded-full"
							type="button"
							onClick={() => handleRemoveConstraint(item.type)}
						>
							X
						</button>
					</>
				);
			}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (dispatch(setSchema(keys))) {
			console.log("SUCCESS");
		}
		router.push("/upload");
	};

	const handleAdd = (): void => {
		if (name.length === 0) {
			alert("Key Name is required");
			return;
		}

		let failValidation = constraints.map((constraint) => {
			if (constraint.name === "Min" || constraint.name === "Max") {
				if (constraint.value === "") {
					alert(`${constraint} Value is Required`);
					return "fail";
				}
			}
			return "pass";
		});
		if (failValidation[0] === "fail") {
			console.log(name);
			console.log(constraints);
			console.log(typeSelected);
			return;
		}

		const keyExists = keys.some((key) => key.name === name);

		if (keyExists) {
			alert(
				"A key with the same name already exists. Please choose a different name.",
			);
		} else {
			const newKey: Key = {
				name: name,
				type: typeSelected!,
				constraints: constraints,
			};
			setKeys((prevKeys) => [...prevKeys, newKey]);
			reset();
			console.log(keys);
		}
	};

	const reset = () => {
		setName("");
		setTypeSelected(null);
		setConstraints([]);
		setItems([]);
		setIsTypeDisabled(false);
	};

	return (
		<div
			className={` flex flex-col rounded-xl p-6 bg-opacity-50 ${ThemeColour.variants.background.main}`}
		>
			<h1 className="flex-1 text-4xl text-center font-bold my-8">
				Drag-and-Drop Interface
			</h1>
			<div className="flex gap-4">
				<div className="flex flex-col gap-4">
					<div className="w-[202px] h-[272px] bg-gray-100 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-95 rounded-xl flex flex-col items-center p-4">
						<h1 className="text-2xl font-bold">Types</h1>

						<div className="flex flex-col flex-1 justify-center">
							{isTypeDisabled && (
								<p className="text-center">Type Already Selected</p>
							)}

							{!isTypeDisabled &&
								defaultType.map((type) => (
									<>
										<Draggable type={type}> {type} </Draggable>
									</>
								))}
						</div>
					</div>

					{/* TODO */}
					<div className="w-[202px] h-[192px] bg-gray-100 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-95 rounded-xl flex flex-col items-center p-4">
						<h1 className="text-2xl font-bold">Constraints</h1>

						<div className="flex flex-col flex-1 justify-center">
							{!typeSelected && (
								<p className="text-center">
									Please Select a Type First to Add Constraints
								</p>
							)}

							{typeSelected && (
								<>
									{defaultConstraints[typeSelected].filter(
										(constraint) =>
											!constraints.map((c) => c.name).includes(constraint),
									).length === 0 ? (
										<p className="text-center">
											No more constraints available for this type
										</p>
									) : (
										defaultConstraints[typeSelected]
											.filter(
												(constraint) =>
													!constraints.map((c) => c.name).includes(constraint),
											)
											.map((constraint) => (
												<div key={constraint}>
													<Draggable type={constraint}>{constraint}</Draggable>
												</div>
											))
									)}
								</>
							)}

						</div>
					</div>
				</div>

				{/*  Drop Area  */}

				<div
					ref={drop}
					className="flex flex-col flex-1 p-4 bg-gray-100 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-95 rounded-xl"
				>
					<div className={`flex p-4  ${typeSelected ? "border" : ""} border-gray-900 rounded-xl `}>
						{renderDroppedItems()}
					</div>
					<div className="flex flex-1 items-end justify-center ">
						<button
							type="submit"
							onClick={handleSubmit}
							// onClick={handleAdd}
							className="mb-6 rounded-3xl hover:border-2 hover:border-cyan-900 hover:px-12 hover:py-5 hover:shadow-2xl transition-all px-8 py-3 bg-[#b1AAAA] dark:bg-gray-900 "
						>
							Add
						</button>
					</div>
				</div>

				{/* <div onClick={handleSubmit}>UPLOAD</div> */}
			</div>
			{/* <div className="relative w-full flex justify-center">
				<div className="bg-[#d2d8e1] dark:bg-gray-900 rounded-lg mt-6 p-4 opacity-70">
					<h1 className="text-2xl font-bold">Added Keys</h1>
					<div className="flex gap-x-4 gap-y-2 flex-wrap p-4">
						{keys.map((item, index) => (
							<div key={index} className="mt-8 flex mb-4">
								<button
									onClick={showKey(index)}
									className="w-[100px] h-[40px] text-1xl rounded bg-[#c6d0de]"
								>
									{index + 1} {item.name}
								</button>
								<button
									className="w-[20px] h-[20px] text-[10px] bg-red-500 rounded-full ml-2"
									type="button"
									onClick={() => handleRemoveKey(index)}
								>
									X
								</button>
							</div>
						))}
					</div>
				</div>
				{selectedKey && (
					<div className="absolute top-0 right-2 bg-[#d2d8e1] dark:bg-gray-900 mt-8 p-4 rounded-lg shadow-lg opacity-70 z-10">
						<h2 className="text-xl font-bold mb-2">Key Details</h2>
						<p>
							<strong>Name:</strong> {selectedKey.name}
						</p>
						<p>
							<strong>Type:</strong> {selectedKey.type}
						</p>
						<div>
							<strong>Constraints:</strong>
							<ul>
								{selectedKey.constraints.map((constraint, index) => (
									<li key={index}>
										{constraint.name}: {constraint.value}
									</li>
								))}
							</ul>
						</div>
						<button
							onClick={() => setSelectedKey(null)}
							className="mt-4 bg-red-500 text-white rounded px-4 py-2"
						>
							Close
						</button>
					</div>
				)} */}
		</div >
	);
};

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
			className={`w-24 h-12 border border-gray-500 rounded-full text-center p-2 m-2 cursor-pointer ${isDragging ? "hidden" : ""}  ${isDragging ? "opacity-50" : "opacity-100"}`}
		>
			{children}
		</div>
	);
};
