"use client";
import InputField from "@/components/inputfield";
import { ThemeColour, title } from "@/components/primitives";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { fetchUserData } from "../services/fetchuserprofile";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";

const EditProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await fetchUserData();
                setEmail(data.email);
                //console.log(data)
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };

        loadUserData();
    }, []);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        toast({
            title: "Disclaimer",
            description: "Profile Updated",
        });
        console.log({
            name,
            email,
            password,
        });
    };

    const handleImageEdit = () => {
        toast({
            title: "DON'T",
            description: "Edit Picture",
        });
    };

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit}>
                <Card className="w-[600px] shadow-lg pt-2 ml-[270px] mt-[60px] bg-gray-100 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-97">
                    <CardHeader>
                        <CardTitle className="text-center">
                            <div className="flex justify-between">
                                <div className={title()}>
                                    Edit Profile
                                </div>

                                <Avatar
                                    onClick={handleImageEdit}
                                    className="w-[80px] h-[80px]"
                                >
                                    <AvatarImage src="https://github.com/shadcn.png" sizes="full" />
                                    <Edit className="absolute bottom-0 right-0 bg-white rounded-full m-2 p-1 shadow-md" size={20} color="black" />
                                    <AvatarFallback>Avatar</AvatarFallback>

                                </Avatar>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>

                        <div className="grid w-full items-center gap-4">

                            <InputField
                                label="Name"
                                value={name}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                inputWidth="w-full"
                            />
                            <InputField
                                label="Email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                            <InputField
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>

                    </CardContent>
                    <CardFooter className="flex flex-col items-center">
                        <Button className="w-full mb-2" type="submit">
                            Edit
                        </Button>
                        <br />
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default EditProfile;
