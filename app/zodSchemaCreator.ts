import { z } from "zod";



const createValidationSchema = (keys) => {
    const schemaObject = keys.reduce((acc, key) => {
        let keySchema = z.any();

        switch (key.typeSelected) {
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


export default createValidationSchema


