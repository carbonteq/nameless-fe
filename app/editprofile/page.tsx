"use client"
import InputField from "@/components/inputfield";
import { title } from "@/components/primitives";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const EditProfile = () => {

    const[name,setName]=useState('')
    const[phone,setPhone]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const { toast } = useToast()

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        toast({
            title: "Disclaimer",
            description: "Profile Updated",
        })
        console.log({
            name:name,
            email:email,
            password:password
        })
        return 
    }

    return (
        <>
            <section className="flex flex-col md:flex-row items-center justify-between ">
                <div className="inline-block max-w-lg text-left">
                    <h1 className={title()}>Edit Profile&nbsp;</h1>
                </div>
                <div className="pr-4">
                    <Avatar style={{ width: '150px', height: '150px' }} >
                        <AvatarImage src="https://github.com/shadcn.png" sizes="full" />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                </div>
            </section>

            <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                    <InputField label="Name" value={name} type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" inputWidth="500px"/>
                    <InputField label="Phone" value={phone} type="tel" onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone" inputWidth="500px"/>
                    <InputField label="Email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" inputWidth="500px"/>
                    <InputField label="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" inputWidth="500px"/>
                </div>
                <br/>
                <br/>
                <Button style={{ width: '500px' }} type="submit">Submit Changes</Button>
            </form>
        </>
    );
}

export default EditProfile;
