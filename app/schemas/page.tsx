
"use client"
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { ThemeColour } from '@/components/primitives';
import { useRouter } from "next/navigation";


const Schemas = () => {
    const schemas = JSON.parse(localStorage.getItem("SCHEMA-91809ae7-2997-4a1a-bcc7-dbf412d5de5a") as string)
    const items: any = [];
    const router = useRouter();
    const temp = schemas.schema.columns
    const id: number = schemas.id

    const names = []
    const types = []

    for (const [name, schema] of Object.entries(temp)) {
        names.push(name)
        types.push(schema.type)
    }

    let i = 0;
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
                {names.map((name, i) =>
                    <div className='flex justify-between px-2'>
                        <p className=' font-semibold'>{name}</p>
                        <p className=''>{types[i]}</p>
                    </div>)}


            </CardBody>
            <CardFooter>
                <div className='py-2 px-11 flex justify-between w-full'>
                    <button onClick={() => {
                        router.push(`/drag-test/${id}`)
                    }}>Edit</button>
                    <button>Delete</button>
                </div>

            </CardFooter>
        </Card>
    )

    return (
        <>
            <div className={`ml-[270px] py-6 px-5 bg-opacity-50 ${ThemeColour.variants.background.main}   rounded-xl`}>
                <h1 onClick={() => {
                    router.push("/");
                }}
                    className='tracking-tight cursor-pointer font-semibold text-[2.3rem] lg:text-5xl leading-9  inline'>&#8249; Schemas</h1>
                <div className={` mt-8 gap-x-2 gap-y-4 grid grid-cols-4 h-auto`}>
                    {items.map((item) => item)}
                </div>
            </div>
        </>
    )
}

export default Schemas

