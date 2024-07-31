"use client"
import { ThemeColour } from '@/components/primitives';
import React, { useState } from 'react';
import { z } from 'zod';

export let schema;
const defaultConstraints = {
    string: ['Min', 'Max'],
    integer: ['Min', 'Max'],
    email: ['regex'],
};

interface Con {
    name: string;
    value: string;
}

interface Key {
    name: string;
    type: string;
    constraints: Con[];
}

const DynamicForm = () => {
    const [keys, setKeys] = useState<Key[]>([
        { name: '', type: 'string', constraints: [] },
        { name: '', type: 'string', constraints: [] },
    ]);

    const handleAddKey = () => {
        setKeys([...keys, { name: '', type: 'string', constraints: [] }]);
    };

    const handleRemoveKey = (index) => {
        const newKeys = keys.filter((_, i) => i !== index);
        setKeys(newKeys);
    };

    const handleChangeKey = (index, field, value) => {
        const newKeys = keys.map((key, i) =>
            i === index
                ? {
                    ...key,
                    [field]: value,
                    constraints: field === 'type' ? [] : key.constraints
                }
                : key
        );
        setKeys(newKeys);
    };

    const handleAddConstraint = (index, constraint) => {
        const newKeys = keys.map((key, i) =>
            i === index
                ? {
                    ...key,
                    constraints: [...key.constraints,
                    { name: constraint, value: '' }]
                }
                : key
        );
        setKeys(newKeys);
    };

    const handleChangeConstraint = (keyIndex, constraintIndex, value) => {
        const newKeys = keys.map((key, i) =>
            i === keyIndex
                ? {
                    ...key,
                    constraints: key.constraints.map((constraint, ci) =>
                        ci === constraintIndex ? { ...constraint, value } : constraint
                    ),
                }
                : key
        );
        setKeys(newKeys);
    };

    const handleRemoveConstraint = (keyIndex, constraintIndex) => {
        const newKeys = keys.map((key, i) =>
            i === keyIndex
                ? { ...key, constraints: key.constraints.filter((_, ci) => ci !== constraintIndex) }
                : key
        );
        setKeys(newKeys);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        schema = createValidationSchema(keys);
        const obj = {
            Name: "Dawood",
            Email: "dawoodakram@gmail.com",
            Age: 30
        }
        const result = schema.safeParse(obj);

        if (!result.success) {
            //console.log(result.error.errors);
            result.error.errors.forEach((err) => {
                console.log(`${err.path}, Message: ${err.message}`);
            });
        } else {
            console.log('Parsed data:', result.data);
        }
    };

    const createValidationSchema = (keys) => {
        const schemaObject = keys.reduce((acc, key) => {
            let keySchema = z.any();

            switch (key.type) {
                case 'string':
                    keySchema = z.string();
                    key.constraints.forEach((constraint) => {
                        if (constraint.name === 'Min') {
                            keySchema = keySchema.min(parseInt(constraint.value), {
                                message: `${key.name} should have a minimum length of ${constraint.value}`
                            });
                        }
                        if (constraint.name === 'Max') {
                            keySchema = keySchema.max(parseInt(constraint.value), {
                                message: `${key.name} should have a maximum length of ${constraint.value}`
                            });
                        }
                    });
                    break;
                case 'integer':
                    keySchema = z.number();
                    key.constraints.forEach((constraint) => {
                        if (constraint.name === 'Min') {
                            keySchema = keySchema.min(parseInt(constraint.value), {
                                message: `${key.name} should be greater than or equal to ${constraint.value}`
                            });
                        }
                        if (constraint.name === 'Max') {
                            keySchema = keySchema.max(parseInt(constraint.value), {
                                message: `${key.name} should be less than or equal to ${constraint.value}`
                            });
                        }
                    });
                    break;
                case 'email':
                    keySchema = z.string().email({
                        message: `${key.name} must be a valid email address`
                    });
                    if (key.constraints.some((c) => c.name === 'regex')) {
                        const regexConstraint = key.constraints.find((c) => c.name === 'regex');
                        if (regexConstraint) {
                            keySchema = keySchema.regex(new RegExp(regexConstraint.value), {
                                message: `Invalid format for ${key.name}`
                            });
                        }
                    }
                    break;
                default:
                    break;
            }

            acc[key.name] = keySchema;
            return acc;
        }, {});

        return z.object(schemaObject);
    };


    return (
        <div className="flex items-center justify-center">
            <form
                className={`${ThemeColour.variants.background.main} bg-white rounded-2xl p-6 opacity-80 dark:opacity-95 transition-all`}
                onSubmit={handleSubmit}
            >
                <div className="p-4 flex flex-col gap-8">
                    {keys.map((key, index) => (
                        <div key={index} className="key flex gap-10 items-center">
                            <input
                                type="text"
                                value={key.name}
                                onChange={(e) => handleChangeKey(index, 'name', e.target.value)}
                                placeholder="Name"
                                className="rounded p-2 text-black bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white"
                            />
                            <select
                                value={key.type}
                                onChange={(e) => handleChangeKey(index, 'type', e.target.value)}
                                className="rounded p-2 text-black bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white"
                            >
                                <option value="string">String</option>
                                <option value="integer">Integer</option>
                                <option value="email">Email</option>
                            </select>
                            <div className="constraints flex gap-10">
                                <select
                                    onChange={(e) => handleAddConstraint(index, e.target.value)}
                                    value=""
                                    className="rounded p-2 text-black bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white"
                                >
                                    <option value="" disabled>
                                        Add Constraint
                                    </option>
                                    {defaultConstraints[key.type]
                                        .filter((constraint) => !key.constraints.map((c) => c.name).includes(constraint))
                                        .map((constraint) => (
                                            <option key={constraint} value={constraint}>
                                                {constraint}
                                            </option>
                                        ))}
                                </select>
                                {key.constraints.map((constraint, ci) => (
                                    <div key={ci} className="rounded p-2 placeholder:text-black dark:placeholder:text-white text-black bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white">
                                        <label className="text-sm">{constraint.name}:</label>
                                        {(constraint.name === 'Min' || constraint.name === 'Max' || constraint.name === 'Min' || constraint.name === 'Max') && (
                                            <input
                                                type="number"
                                                value={constraint.value}
                                                onChange={(e) => handleChangeConstraint(index, ci, e.target.value)}
                                                className="appearance-none p-2 ml-2 rounded text-black bg-[#d2d8e1] dark:bg-[#1a222e] dark:text-white size-10"
                                                required

                                            />
                                        )}
                                        <button
                                            className="ml-2 w-[20px] h-[20px] text-[10px] bg-red-500 rounded-full"
                                            type="button"
                                            onClick={() => handleRemoveConstraint(index, ci)}
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={() => handleRemoveKey(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 p-4">
                    <button className="w-[50px] h-[50px] rounded-full hover:border" type="button" onClick={handleAddKey}>
                        Add
                    </button>
                    <button type="submit" className="justify-center rounded-3xl border hover:border-2 hover:border-cyan-900 hover:px-12 hover:py-5 hover:shadow-2xl transition-all px-8 py-3 bg-[#d2d8e1] dark:bg-gray-900">
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DynamicForm;
