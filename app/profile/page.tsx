"use client";
import InputField from "@/components/inputfield";
import { title } from "@/components/primitives";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Edit } from "lucide-react";
import { userService } from "../services/userService";
import { useRouter } from "next/navigation";

const EditProfile = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("********");
	const [isEdit, setIsEdit] = useState(false);
	const [enableEmail, setEnableEmail] = useState(false);
	const [enablePassword, setEnablePassword] = useState(false);

	const { toast } = useToast();
	const router = useRouter();

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const data = await userService.fetchUserData();
				setEmail(data.email);
				setName(data.username);
				console.log(data);
			} catch (error) {
				console.error("Error loading user data:", error);
			}
		};

		loadUserData();
	}, []);

	const handleSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		toast({
			title: "Disclaimer",
			description: "Profile Updated",
		});
	};

	const handleImageEdit = () => {
		toast({
			title: "DON'T",
			description: "Edit Picture",
		});
	};

	return (
		<>
			{!isEdit && (
				<div className="flex items-center justify-center">
					<form onSubmit={handleSubmit}>
						<Card className="w-[600px] shadow-lg pt-2 ml-[270px] mt-[60px] bg-gray-100 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-97">
							<CardHeader>
								<CardTitle className="text-center">
									<div className="flex justify-between p-2">
										<div className="flex items-center space-x-2">
											<div
												onClick={() => {
													router.push("/");
												}}
												className="w-[40px] text-5xl rounded-full cursor-pointer"
											>
												&#8249;
											</div>
											<div className={title()}>Profile</div>
										</div>

										<Avatar className="w-[80px] h-[80px] hover:w-[100px] hover:h-[100px] transition-all">
											<AvatarImage
												src="https://avatars.githubusercontent.com/u/129286639?v=4"
												sizes="full"
											/>
											<AvatarFallback>Avatar</AvatarFallback>
										</Avatar>
									</div>
								</CardTitle>
							</CardHeader>

							<CardContent>
								<div className="px-4">
									<div className="flex items-center space-x-4 mb-4">
										<p className="text-lg font-bold font-medium">Username:</p>
										<h1 className="text-xl font-bold ">{name}</h1>
									</div>
									<div>
										<div className="flex items-center space-x-4 mb-4">
											<p className="text-lg font-medium ">Email:</p>
											<p className="text-lg font-bold">{email}</p>
										</div>
									</div>
									<div>
										<div className="flex items-center space-x-4">
											<p className="text-lg font-medium ">Password:</p>
											<p className="text-lg font-bold">********</p>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter className="flex flex-col items-center">
								<div className="px-4 w-full">
									<Button
										className="w-full mb-2 font-black "
										onClick={() => {
											setIsEdit(true);
										}}
									>
										Edit
									</Button>
								</div>
								<br />
							</CardFooter>
						</Card>
					</form>
				</div>
			)}

			{isEdit && (
				<div className="flex items-center justify-center">
					<form onSubmit={handleSubmit}>
						<Card className="w-[600px] shadow-lg pt-2 ml-[270px] mt-[60px] bg-gray-100 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-97">
							<CardHeader>
								<CardTitle className="text-center">
									<div className="flex justify-between">
										<div className="flex items-center space-x-2">
											{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
											<div
												onClick={() => {
													setIsEdit(false);
												}}
												className="w-[40px] text-5xl rounded-full cursor-pointer"
											>
												&#8249;
											</div>
											<div className={title()}>Edit Profile</div>
										</div>

										<Avatar
											onClick={handleImageEdit}
											className="w-[80px] h-[80px] hover:w-[100px] hover:h-[100px] transition-all"
										>
											<AvatarImage
												src="https://avatars.githubusercontent.com/u/129286639?v=4"
												sizes="full"
											/>
											<Edit
												className="absolute bottom-1 right-1 bg-white rounded-full m-2 p-1 shadow-md "
												size={18}
												color="black"
											/>
											<AvatarFallback>Avatar</AvatarFallback>
										</Avatar>
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid w-full items-center gap-4 px-4">
									<div className="flex flex-col gap-2">
										<div className="flex justify-between">
											<label className="font-black">Email</label>
											{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
											<div
												onClick={() => {
													setEnableEmail(true);
												}}
												className={` cursor-pointer text-blue-500 hover:text-blue-700 self-end ${enableEmail ? "invisible" : "visible"}`}
											>
												Edit
											</div>
										</div>
										<InputField
											label=""
											value={email}
											type="email"
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Enter your email"
											disabled={!enableEmail}
											inputWidth="w-full" // Ensure the input spans the entire width
										/>
									</div>

									<div className="flex flex-col gap-2">
										<div className="flex justify-between">
											<label className="font-black">Password</label>
											{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
											<div
												onClick={() => {
													setEnablePassword(true);
													setPassword("");
												}}
												className={` cursor-pointer text-blue-500 hover:text-blue-700 self-end ${enablePassword ? "invisible" : "visible"}`}
											>
												Edit
											</div>
										</div>

										<InputField
											label=""
											value={password}
											type="password"
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Enter new password"
											disabled={!enablePassword}
											inputWidth="w-full" // Ensure the input spans the entire width
										/>
									</div>
								</div>
							</CardContent>

							<CardFooter className="flex flex-col items-center mt-2">
								<div className="px-4 w-full">
									<Button className="w-full mb-2 font-black " type="submit">
										Update
									</Button>
								</div>
								<br />
							</CardFooter>
						</Card>
					</form>
				</div>
			)}
		</>
	);
};

export default EditProfile;
