"use client";
import InputField from "@/components/inputfield";
import { title } from "@/components/primitives";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Card } from "@nextui-org/react"; // Import Card from NextUI
import { fetchUserData } from "../services/fetchuserprofile";

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
            title: "Disclaimer",
            description: "Picture Edit",
        });
    };

    return (
        <>
            <div className="flex justify-center py-10 px-4 md:px-0">
                <Card className="p-6 max-w-3xl w-full bg-opacity-10">
                    <section className="flex flex-col md:flex-row items-center justify-between mb-6">
                        <div className="text-center md:text-left">
                            <h1 className={title()}>Edit Profile</h1>
                        </div>
                        <div className="md:pl-6 mt-4 md:mt-0">
                            <Avatar
                                onClick={handleImageEdit}
                                className="w-36 h-36"
                            >
                                <AvatarImage src="https://github.com/shadcn.png" sizes="full" />
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>
                        </div>
                    </section>

                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <InputField
                                label="Name"
                                value={name}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                inputWidth="w-full md:w-80"
                            />

                            <InputField
                                label="Email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                inputWidth="w-full md:w-80"
                            />
                            <InputField
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                inputWidth="w-full md:w-80"
                            />
                        </div>
                        <br />
                        <div className="flex">
                            <Button className="w-full md:w-80" type="submit">
                                Submit Changes
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default EditProfile;
