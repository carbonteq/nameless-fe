
"use client"
import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { ThemeColour } from '@/components/primitives';
import { useRouter } from "next/navigation";
import { addIconSrc, closeIconSrc, delIconSrc, duplicateIconSrc, editIconSrc } from '@/components/constants';
import { generateId } from '../services/uuidGenator';
import convertToKeys from '../services/convertToKeys';

interface con {
    name: string,
    value: unknown
}

interface temp {
    name: string,
    typeSelected: string,
    constraints: con[]
}

const Schemas = () => {
    let itemsStore = { ...localStorage }
    const schemaNames: string[] = []
    for (const [name] of Object.entries(itemsStore)) {
        if (name.startsWith("SCHEMA-")) schemaNames.push(name)
    }
    const [isHover, setIsHover] = useState('')
    const [isDetails, setIsDetails] = useState(false)
    const [selectedSchema, setSelectedSchema] = useState<temp[]>([{
        name: "",
        typeSelected: "",
        constraints: []
    }])

    const schemas = JSON.parse(localStorage.getItem("SCHEMA-91809ae7-2997-4a1a-bcc7-dbf412d5de5a") as string)
    //const items: any = [];
    const router = useRouter();


    const handleDetails = (isDet: boolean, schemaToShow: any) => {
        setIsDetails(isDet)
        console.log("We are here", convertToKeys(schemaToShow.schema))
        setSelectedSchema(convertToKeys(schemaToShow.schema))
    }


    const SchemaDetails = [{
        Name: "Name",
        Type: "String",
        Constraints: [{ "min": 10 }, { "min": 10 }, { "min": 10 }, { "min": 10 }]
    }]


    return (
        <>

            <div className={`ml-[270px] py-6 px-5 bg-opacity-50 ${ThemeColour.variants.background.main}   rounded-xl`}>
                {!isDetails ? (
                    <>
                        <h1 onClick={() => {
                            router.push("/");
                        }}
                            className='tracking-tight cursor-pointer font-semibold text-[2.3rem] lg:text-5xl leading-9  inline'>&#8249; Schemas</h1>
                        <div className={` mt-8 gap-x-4 gap-y-4 grid grid-cols-4 h-auto`}>
                            {schemaNames.map((name, index) => {
                                const parts = name.split("/");
                                const idd = parts[parts.length - 1];
                                console.log("EXTRACTING THE ID SCHEMA NAME => ", idd);
                                const schemaArr = JSON.parse(localStorage.getItem(name))

                                // console.log("FETCHED SCHEMA => ", schemaArr.schema.columns);
                                const schemaElements = []
                                for (const [name, subSchema] of Object.entries(schemaArr.schema.columns)) {
                                    console.log("GETTING NAMES OF KEYS => ", name);
                                    schemaElements.push({ Name: name, type: subSchema.type })
                                }

                                // console.log(schemaElements[0].type.type);


                                return (
                                    <Card className={`h-80 lg:col-span-1 col-span-2 max-sm:col-span-4 bg-opacity-80`}
                                        isHoverable={true}
                                    >
                                        <CardHeader>
                                            <h1 className='font-black text-2xl text-center'>{schemaArr.schema?.name}</h1>
                                        </CardHeader>
                                        <CardBody className='flex group-hover: flex-col gap-y-2 h-72 cursor-pointer' onClick={() => handleDetails(true, schemaArr)} >
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
                                        <CardFooter className='z-30'>
                                            <div className='py-2 flex justify-evenly w-full dark:invert '>
                                                <button onClick={(e) => {
                                                    router.push(`/drag-test/${schemaArr.id}`)
                                                }}>
                                                    <img src={editIconSrc} alt="" className="size-7" />


                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        localStorage.removeItem(`SCHEMA-${schemaArr.id}`)
                                                        window.location.reload();
                                                    }}>
                                                    <img src={delIconSrc} alt="" className="size-7" />

                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        const SCHEMA = {
                                                            id: generateId(),	// UUID 
                                                            schema: schemaArr.schema
                                                        }
                                                        localStorage.setItem(`SCHEMA-${SCHEMA.id}`, JSON.stringify(SCHEMA));
                                                        window.location.reload();
                                                    }}>
                                                    <img src={duplicateIconSrc} alt="" className="size-7" />

                                                </button>
                                            </div>

                                        </CardFooter>
                                    </Card >
                                )
                            })

                            }
                            <Card className='border border-dashed h-80 bg-opacity-0 cursor-pointer hover:scale-110 hover:z-10 '>
                                <CardBody className='flex justify-center items-center'>
                                    <img src={addIconSrc} className="size-11 dark:invert "></img>
                                </CardBody>
                            </Card>
                        </div>
                    </>
                )
                    :
                    <>
                        <h1 onClick={() => {
                            handleDetails(false, '')
                        }}
                            className='tracking-tight cursor-pointer font-semibold text-[2.3rem] lg:text-5xl leading-9  inline'>&#8249; Details</h1>
                        <Card className='h-[450px] mt-8 relative'>
                            <CardHeader className='pt-5'>
                                <h1 className='text-3xl font-bold text-center w-full'>{selectedSchema.schema?.name}</h1>
                            </CardHeader>
                            <CardBody className='overflow-auto'>
                                <div className='overflow-auto'>
                                    <table className='table w-full'>
                                        <thead className='text-xl p-2 border-b-1'>
                                            <tr>
                                                <th>
                                                    Key
                                                </th>
                                                <th>
                                                    Type
                                                </th>
                                                <th>
                                                    Constraints
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {selectedSchema.map((schema) =>
                                                    <>
                                                        <td>{schema.name}</td>
                                                        <td>{schema.typeSelected}</td>
                                                        <td>
                                                            {schema.constraints.map((con) =>
                                                                <>
                                                                    <span className='font-semibold'>{con.name}: </span> {con.value}
                                                                </>
                                                            )}
                                                        </td >
                                                    </>
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </CardBody>
                        </Card>
                    </>

                }

            </div >
        </>
    )
}

export default Schemas

