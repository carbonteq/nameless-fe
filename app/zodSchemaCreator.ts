import { ZodTypeAny, z } from "zod";
import { Con } from "./drag-test/page";


export interface IKey {
    name: string,
    typeSelected: "string" | "number" | "email" | "boolean",
    constraints: Con[]
}

const createValidationSchema = (keys: IKey[] | null) => {
    if (keys === null)
        return
    const schemaObject: Record<string, ZodTypeAny> = keys.reduce((acc, key) => {
        let keySchema: ZodTypeAny;

        switch (key.typeSelected) {
            case 'string':
                keySchema = z.string();
                key.constraints.forEach((constraint: Con) => {
                    if (constraint.name === 'minLength') {
                        keySchema = keySchema.min(parseInt(constraint.value), {
                            message: `${key.name} should have a minimum length of ${constraint.value}`
                        });
                    }
                    else if (constraint.name === 'maxLength') {
                        keySchema = keySchema.max(parseInt(constraint.value), {
                            message: `${key.name} should have a maximum length of ${constraint.value}`
                        });
                    }
                    else if (constraint.name === 'format') {
                        if (constraint.value === 'email') {
                            keySchema = keySchema.email({
                                message: `${key.name} is not a valid`
                            });
                        }
                        else if (constraint.value === 'uuid') {
                            keySchema = keySchema.uuid({
                                message: `${key.name} is not a valid`
                            });
                        }
                        else {
                            keySchema = keySchema.url({
                                message: `${key.name} is not a valid`
                            });
                        }
                    }
                    else if (constraint.name === 'default') {
                        keySchema = keySchema.default(constraint.value)
                    }
                    else {
                        keySchema = keySchema.optional()
                    }
                });
                break;
            case 'number':
                keySchema = z.number();
                key.constraints.forEach((constraint) => {
                    if (constraint.name === 'min') {
                        keySchema = keySchema.min(parseInt(constraint.value), {
                            message: `${key.name} should be greater than or equal to ${constraint.value}`
                        });
                    }
                    else if (constraint.name === 'max') {
                        keySchema = keySchema.max(parseInt(constraint.value), {
                            message: `${key.name} should be less than or equal to ${constraint.value}`
                        });
                    }
                    else if (constraint.name === 'integer') {
                        keySchema = keySchema.int({
                            message: `${key.name} should be a valid integer`
                        });

                    }
                    else if (constraint.name === 'Default') {
                        keySchema = keySchema.default(parseInt(constraint.value))
                    }
                    else {
                        keySchema = keySchema.optional()
                    }
                });
                break;
            default:
                break;
        }

        acc[key.name] = keySchema;
        return acc;
    }, {});

    return z.object(schemaObject);
};


export default createValidationSchema


