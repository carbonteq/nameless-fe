
"use client"
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { ThemeColour } from '@/components/primitives';
import { useRouter } from "next/navigation";


const schemas = JSON.parse(localStorage.getItem("SCHEMA-d718c116-0004-49f8-b13e-c3a02244c109") as string)




const Schemas = () => {
    const items: any = [];
    const router = useRouter();
    const temp = schemas.schema.columns
    console.log(temp);



    let i = 0;
    for (const [name, subSchema] of Object.entries(temp)) {
        items.push(
            <Card className='h-72 hover:scale-110 hover:z-10 lg:col-span-1 col-span-2 max-sm:col-span-4'>
                <CardHeader>
                    <h1 className='font-black text-2xl text-center'>Schema {i + 1}</h1>
                </CardHeader>
                <CardBody className='flex flex-col gap-y-2'>
                    <div className='flex justify-between px-2 mb-3'>
                        <h1 className='text-xl font-bold'>Key</h1>
                        <h1 className='text-xl font-bold'>Type</h1>
                    </div>
                    <div className='flex justify-between px-2'>
                        <p className=' font-semibold'>{name}</p>
                        <p className=''>{subSchema.type}</p>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className='py-2 px-11 flex justify-between w-full'>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>

                </CardFooter>
            </Card>
        )
        i = 100
    }

    // schemas.map((schema: any, i) => {
    //     items.push(
    //         <Card className='h-72 hover:scale-110 hover:z-10 lg:col-span-1 col-span-2 max-sm:col-span-4'>
    //             <CardHeader>
    //                 <h1 className='font-black text-2xl text-center'>Schema {i + 1}</h1>
    //             </CardHeader>
    //             <CardBody className='flex flex-col gap-y-2'>
    //                 <div className='flex justify-between px-2 mb-3'>
    //                     <h1 className='text-xl font-bold'>Key</h1>
    //                     <h1 className='text-xl font-bold'>Type</h1>
    //                 </div>
    //                 {schema.map((props: any) =>
    //                     <div className='flex justify-between px-2'>
    //                         <p className=' font-semibold'>{props.name}</p>
    //                         <p className=''>{props.typeSelected}</p>
    //                     </div>
    //                 )}
    //             </CardBody>
    //             <CardFooter>
    //                 <div className='py-2 px-11 flex justify-between w-full'>
    //                     <button>Edit</button>
    //                     <button>Delete</button>
    //                 </div>

    //             </CardFooter>

    //         </Card>)
    // })

    // for (let i = 0; i < 12; i++) {
    //     items.push(
    //         <Card className='h-72 hover:scale-110 hover:z-10 lg:col-span-1 col-span-2 max-sm:col-span-4'>
    //             <CardHeader>
    //                 <h1 className='font-black text-2xl text-center'>Schema {i + 1}</h1>
    //             </CardHeader>
    //             <CardBody>
    //                 Some Schema Details
    //             </CardBody>
    //         </Card>)
    // }

    return (
        <div className={`ml-[270px] py-6 px-5 bg-opacity-50 ${ThemeColour.variants.background.main}   rounded-xl`}>
            <h1 onClick={() => {
                router.push("/");
            }}
                className='tracking-tight cursor-pointer font-semibold text-[2.3rem] lg:text-5xl leading-9  inline'>&#8249; Schemas</h1>
            <div className={` mt-8 gap-x-2 gap-y-4 grid grid-cols-4 h-auto`}>
                {items.map((item) => item)}
            </div>
        </div>
    )
}

export default Schemas


// import React from "react";
// import { Card, CardHeader, CardBody,  Image, Button } from "@nextui-org/react";

// export default function App() {
//     return (
//         <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
//             <Card className="col-span-12 sm:col-span-4 h-[300px]">
//                 <CardHeader className="absolute z-10 top-1 flex-col !items-start">
//                     <p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
//                     <h4 className="text-white font-medium text-large">Stream the Acme event</h4>
//                 </CardHeader>
//                 <Image
//                     removeWrapper
//                     alt="Card background"
//                     className="z-0 w-full h-full object-cover"
//                     src="https://nextui.org/images/card-example-4.jpeg"
//                 />
//             </Card>
//             <Card className="col-span-12 sm:col-span-4 h-[300px]">
//                 <CardHeader className="absolute z-10 top-1 flex-col !items-start">
//                     <p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
//                     <h4 className="text-white font-medium text-large">Contribute to the planet</h4>
//                 </CardHeader>
//                 <Image
//                     removeWrapper
//                     alt="Card background"
//                     className="z-0 w-full h-full object-cover"
//                     src="https://nextui.org/images/card-example-3.jpeg"
//                 />
//             </Card>
//             <Card className="col-span-12 sm:col-span-4 h-[300px]">
//                 <CardHeader className="absolute z-10 top-1 flex-col !items-start">
//                     <p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
//                     <h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
//                 </CardHeader>
//                 <Image
//                     removeWrapper
//                     alt="Card background"
//                     className="z-0 w-full h-full object-cover"
//                     src="https://nextui.org/images/card-example-2.jpeg"
//                 />
//             </Card>
//             <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
//                 <CardHeader className="absolute z-10 top-1 flex-col items-start">
//                     <p className="text-tiny text-white/60 uppercase font-bold">New</p>
//                     <h4 className="text-black font-medium text-2xl">Acme camera</h4>
//                 </CardHeader>
//                 <Image
//                     removeWrapper
//                     alt="Card example background"
//                     className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
//                     src="https://nextui.org/images/card-example-6.jpeg"
//                 />
//                 <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
//                     <div>
//                         <p className="text-black text-tiny">Available soon.</p>
//                         <p className="text-black text-tiny">Get notified.</p>
//                     </div>
//                     <Button className="text-tiny" color="primary" radius="full" size="sm">
//                         Notify Me
//                     </Button>
//                 </CardFooter>
//             </Card>
//             <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
//                 <CardHeader className="absolute z-10 top-1 flex-col items-start">
//                     <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
//                     <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
//                 </CardHeader>
//                 <Image
//                     removeWrapper
//                     alt="Relaxing app background"
//                     className="z-0 w-full h-full object-cover"
//                     src="https://nextui.org/images/card-example-5.jpeg"
//                 />
//                 <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
//                     <div className="flex flex-grow gap-2 items-center">
//                         <Image
//                             alt="Breathing app icon"
//                             className="rounded-full w-10 h-11 bg-black"
//                             src="https://nextui.org/images/breathing-app-icon.jpeg"
//                         />
//                         <div className="flex flex-col">
//                             <p className="text-tiny text-white/60">Breathing App</p>
//                             <p className="text-tiny text-white/60">Get a good night's sleep.</p>
//                         </div>
//                     </div>
//                     <Button radius="full" size="sm">Get App</Button>
//                 </CardFooter>
//             </Card>
//         </div>
//     );
// }


// const schemas = [
//     [
//         {
//             name: "Name",
//             typeSelected: "string",
//             constraints: [
//                 {
//                     name: "Min",
//                     value: "10"
//                 },
//                 {
//                     name: "Max",
//                     value: "15"
//                 },
//             ]
//         },
//         {
//             name: "Age",
//             typeSelected: "Number",
//             constraints: [
//                 {
//                     name: "Min",
//                     value: "10"
//                 },
//                 {
//                     name: "Max",
//                     value: "15"
//                 },
//             ]
//         },
//         {
//             name: "Email",
//             typeSelected: "string",
//             constraints: [
//                 {
//                     name: "Min",
//                     value: "10"
//                 },
//                 {
//                     name: "Max",
//                     value: "15"
//                 },
//             ]
//         },
//     ],
//     [
//         {
//             name: "Name",
//             typeSelected: "string",
//             constraints: [
//                 {
//                     name: "Min",
//                     value: "10"
//                 },
//                 {
//                     name: "Max",
//                     value: "15"
//                 },
//             ]
//         },
//         {
//             name: "Age",
//             typeSelected: "Number",
//             constraints: [
//                 {
//                     name: "Min",
//                     value: "10"
//                 },
//                 {
//                     name: "Max",
//                     value: "15"
//                 },
//             ]
//         },
//         {
//             name: "Email",
//             typeSelected: "string",
//             constraints: [
//                 {
//                     name: "Min",
//                     value: "10"
//                 },
//                 {
//                     name: "Max",
//                     value: "15"
//                 },
//             ]
//         },
//     ]



// ]