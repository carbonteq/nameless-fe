"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { ThemeColour } from '@/components/primitives';
import { useRouter } from 'next/navigation';
import { addIconSrc, delIconSrc, duplicateIconSrc, editIconSrc, linkIconSrc } from '@/components/constants';
import { generateId } from '../services/uuidGenator';
import convertToKeys from '../services/convertToKeys';
import { userService } from '../services/userService';

interface Con {
    name: string;
    value: unknown;
}

interface Temp {
    name: string;
    typeSelected: string;
    constraints: Con[];
}

const Schemas = () => {
    const [schemasReceived, setSchemasReceived] = useState<string[]>([]);
    const [schemaName, setSchemaName] = useState('');
    const [isDetails, setIsDetails] = useState(false);
    const [selectedSchema, setSelectedSchema] = useState<Temp[]>([
        {
            name: '',
            typeSelected: '',
            constraints: [],
        },
    ]);
    const router = useRouter();
    const [isUpdate, setIsUpdate] = useState<boolean>(false)

    useEffect(() => {
        const fetchSchemas = async () => {
            const schemas = await userService.getSchema();
            setSchemasReceived(schemas);
            console.log('In Schemas Page', schemas);
        };
        fetchSchemas();
    }, [isUpdate]);

    const handleDetails = (isDet: boolean, schemaToShow: any) => {
        setIsDetails(isDet);
        if (schemaToShow) {
            setSelectedSchema(convertToKeys(schemaToShow.schema));
            setSchemaName(schemaToShow.schema?.name);
        }
    };

    return (
        <div className={` py-6 px-5 bg-opacity-50 ${ThemeColour.variants.background.main} rounded-xl`}>
            {!isDetails ? (
                <>
                    <h1
                        onClick={() => {
                            router.push('/');
                        }}
                        className='tracking-tight cursor-pointer font-semibold text-[2.3rem] lg:text-5xl leading-9 inline'
                    >
                        &#8249; Schemas
                    </h1>
                    <div className={`mt-8 gap-x-4 gap-y-4 grid grid-cols-4 h-auto`}>
                        {schemasReceived.map((schema, index) => {
                            const schemaArr = schema.schema.columns;
                            const schemaElements: { Name: string; type: string }[] = [];

                            if (schemaArr) {
                                for (const [name, subSchema] of Object.entries(schemaArr)) {
                                    schemaElements.push({ Name: name, type: subSchema.type });
                                }
                            }

                            return (
                                <Card
                                    key={index}
                                    className={`h-80 lg:col-span-1 col-span-2 max-sm:col-span-4 bg-opacity-80`}
                                    isHoverable={true}
                                >
                                    <CardHeader>
                                        <h1 className='font-black text-2xl text-center'>{schema.schema.name}</h1>
                                    </CardHeader>
                                    <CardBody
                                        className='flex group-hover: flex-col gap-y-2 h-72 cursor-pointer'
                                        onClick={() => handleDetails(true, schema)}
                                    >
                                        <div className='flex justify-between px-2 mb-3'>
                                            <h1 className='text-xl font-bold'>Key</h1>
                                            <h1 className='text-xl font-bold'>Type</h1>
                                        </div>
                                        <div className='overflow-auto h-full flex flex-col gap-y-2'>
                                            {schemaElements.map((element, i) => (
                                                <div key={i} className='flex justify-between px-2'>
                                                    <p className='font-semibold'>{element.Name}</p>
                                                    <p className=''>{element.type}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardBody>
                                    <CardFooter className='z-30'>
                                        <div className='py-2 flex justify-evenly w-full dark:invert'>
                                            <button
                                                onClick={() => {
                                                    router.push(`/drag-test/${schema.id}`);
                                                }}
                                            >
                                                <img src={editIconSrc} alt='' className='size-7' />
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    await userService.delSchema(schema.id, () => {
                                                        setIsUpdate(prev => !prev)
                                                    })
                                                }}
                                            >
                                                <img src={delIconSrc} alt='' className='size-7' />
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    const SCHEMA = {
                                                        schema: schema.schema,
                                                        dataStoreId: null
                                                    };
                                                    await userService.schemaCreator(SCHEMA, () => {
                                                        setIsUpdate(prev => !prev)
                                                    })
                                                }}
                                            >
                                                <img src={duplicateIconSrc} alt='' className='size-7' />
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        await navigator.clipboard.writeText(`http://localhost:8000/upload/${schema.id}`);
                                                        alert('Link copied to clipboard!');
                                                    } catch (err) {
                                                        console.error('Failed to copy!', err);
                                                    }
                                                }}
                                            >
                                                <img src={linkIconSrc} alt='' className='size-7' />
                                            </button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                        <Card onClick={() => router.push("/drag-test")} className='border border-dashed h-80 lg:col-span-1 col-span-2 max-sm:col-span-4  bg-opacity-0 cursor-pointer hover:scale-110 hover:z-10'>
                            <CardBody className='flex justify-center items-center'>
                                <img src={addIconSrc} className='size-11 dark:invert'></img>
                            </CardBody>
                        </Card>
                    </div>
                </>
            ) : (
                <>
                    <h1
                        onClick={() => {
                            handleDetails(false, '');
                        }}
                        className='tracking-tight cursor-pointer font-semibold text-[2.3rem] lg:text-5xl leading-9 inline'
                    >
                        &#8249; Details
                    </h1>
                    <Card className='h-[450px] mt-8 relative bg-opacity-80'>
                        <CardHeader className='pt-5'>
                            <h1 className='text-3xl font-bold text-center w-full border-b-1 pb-3 border-gray-500'>{schemaName}</h1>
                        </CardHeader>
                        <CardBody className='p-0'>
                            <div className='overflow-auto h-full px-5'>
                                <table className='table w-full'>
                                    <thead className='text-xl'>
                                        <tr>
                                            <th className='p-2'>Key</th>
                                            <th className='p-2'>Type</th>
                                            <th className='p-2'>Constraints</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-base'>
                                        {selectedSchema.map((schema, index) => (
                                            <tr key={index}>
                                                <td className='p-2'>{schema.name}</td>
                                                <td className='p-2'>{schema.typeSelected}</td>
                                                <td className='p-2 flex gap-x-1'>
                                                    {schema.constraints.map((con, i) => (
                                                        <div key={i} className='inline p-2 bg-white rounded-xl text-black'>
                                                            <span className='font-semibold'>{con.name} </span> {con.value}
                                                        </div>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </>
            )}
        </div>
    );
};

export default Schemas;
