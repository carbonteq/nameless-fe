
"use client"
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { ThemeColour } from '@/components/primitives';
import { useRouter } from "next/navigation";
import { addImgSrc, delImgSrc, duplicateImgSrc, editImgSrc } from '@/components/constants';
import { generateId } from '../services/uuidGenator';


const Schemas = () => {
    let itemsStore = { ...localStorage }
    const schemaNames: string[] = []
    for (const [name] of Object.entries(itemsStore)) {
        if (name.startsWith("SCHEMA-")) schemaNames.push(name)
    }

    const schemas = JSON.parse(localStorage.getItem("SCHEMA-91809ae7-2997-4a1a-bcc7-dbf412d5de5a") as string)
    const router = useRouter();

    return (
        <>
            <div className={`ml-[270px] py-6 px-5 bg-opacity-50 ${ThemeColour.variants.background.main}   rounded-xl`}>
                <h1 onClick={() => {
                    router.push("/");
                }}
                    className='tracking-tight cursor-pointer font-semibold text-[2.3rem] lg:text-5xl leading-9  inline'>&#8249; Schemas</h1>
                <div className={` mt-8 gap-x-4 gap-y-4 grid grid-cols-4 h-auto`}>
                    {/* {items.map((item) => item)} */}
                    {schemaNames.map((name, index) => {
                        const parts = name.split("/");
                        const idd = parts[parts.length - 1];
                        const schemaArr = JSON.parse(localStorage.getItem(name))

                        const schemaElements = []
                        for (const [name, subSchema] of Object.entries(schemaArr.schema.columns)) {
                            console.log("GETTING NAMES OF KEYS => ", name);
                            schemaElements.push({ Name: name, type: subSchema.type })
                        }

                        return (
                            <Card className='h-80 hover:scale-110 hover:z-10 lg:col-span-1 col-span-2 max-sm:col-span-4 bg-opacity-80 '>
                                <CardHeader>
                                    <h1 className='font-black text-2xl text-center'>{schemaArr.schema?.name}</h1>
                                </CardHeader>
                                <CardBody className='flex flex-col gap-y-2 h-72'>
                                    <div className='flex justify-between px-2 mb-3'>
                                        <h1 className='text-xl font-bold'>Key</h1>
                                        <h1 className='text-xl font-bold'>Type</h1>
                                    </div>
                                    <div className="overflow-auto h-full">
                                        {schemaElements.map((name, i) =>
                                            <div className='flex justify-between px-2'>
                                                <p className=' font-semibold'>{schemaElements[i].Name}</p>
                                                <p className=''>{schemaElements[i].type}</p>
                                            </div>)}
                                    </div>

                                </CardBody>
                                <CardFooter>
                                    <div className='py-2 flex justify-evenly w-full dark:invert '>
                                        <button onClick={() => {
                                            router.push(`/drag-test/${schemaArr.id}`)
                                        }}>
                                            <img src={editImgSrc} alt="" className="size-7" />


                                        </button>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem(`SCHEMA-${schemaArr.id}`)
                                                window.location.reload();
                                            }}>
                                            <img src={delImgSrc} alt="" className="size-7" />

                                        </button>
                                        <button
                                            onClick={() => {
                                                const SCHEMA = {
                                                    id: generateId(),	// UUID 
                                                    schema: schemaArr.schema
                                                }
                                                localStorage.setItem(`SCHEMA-${SCHEMA.id}`, JSON.stringify(SCHEMA));
                                                window.location.reload();
                                            }}>
                                            <img src={duplicateImgSrc} alt="" className="size-7" />

                                        </button>
                                    </div>

                                </CardFooter>
                            </Card>
                        )
                    })

                    }
                    <Card className='border border-dashed h-80 bg-opacity-0 cursor-pointer hover:scale-110 hover:z-10 '>
                        <CardBody className='flex justify-center items-center'>
                            <img src={addImgSrc} className="size-11 dark:invert "></img>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Schemas

