export default {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://github.com/carbonteq/nameless-be/blob/main/schemas/metaSchema.json",
    title: "Nameless DSL",
    description: "Some description",
    type: "object",
    properties: {
        columns: {
            description: "List of columns with constraints",
            type: "object",
            required: [],
            additionalProperties: {
                oneOf: [
                    { $ref: "#/definitions/stringSchema" },
                    { $ref: "#/definitions/numberSchema" },
                    { $ref: "#/definitions/booleanSchema" },
                ],
            },
        },
        name: {
            type: "string",
            description: "",
            minLength: 3
        },
        dataStoreId: {
            type: "string",
            description: "",
            //format: uuid,
            pattern: "^[a-zA-Z0-9]{8}-?[a-zA-Z0-9]{4}-?[a-zA-Z0-9]{4}-?[a-zA-Z0-9]{4}-?[a-zA-Z0-9]{12}$"
        }
    },
    additionalProperties: true,
    required: ["columns", "name"],
    definitions: {
        baseSchema: {
            type: "object",
            properties: { optional: { type: "boolean" } },
        },
        stringSchema: {
            allOf: [
                { $ref: "#/definitions/baseSchema" },
                {
                    type: "object",
                    properties: {
                        type: { const: "string" },
                        minLength: { type: "number", minimum: 0 },
                        maxLength: { type: "number", minimum: 0 },
                        regex: { type: "string" },
                        format: { enum: ["uuid", "email", "url"] },
                    },
                    additionalProperties: true,
                    required: ["type"],
                },
            ],
        },
        numberSchema: {
            allOf: [
                { $ref: "#/definitions/baseSchema" },
                {
                    type: "object",
                    properties: {
                        type: { const: "number" },
                        min: { type: "number" },
                        max: { type: "number" },
                        integer: { type: "boolean", default: true },
                    },
                    additionalProperties: true,
                    required: ["type"],
                },
            ],
        },
        booleanSchema: {
            allOf: [
                { $ref: "#/definitions/baseSchema" },
                {
                    type: "object",
                    properties: {
                        type: { const: "boolean" },
                    },
                    additionalProperties: true,
                    required: ["type"],
                },
            ],
        },
        arraySchema: {
            allOf: [
                { $ref: "#/definitions/baseSchema" },
                {
                    type: "object",
                    properties: {
                        type: { const: "array" },
                        items: {
                            oneOf: [
                                { $ref: "#/definitions/stringSchema" },
                                { $ref: "#/definitions/numberSchema" },
                                { $ref: "#/definitions/booleanSchema" },
                                { $ref: "#/definitions/arraySchema" },
                                { $ref: "#/definitions/objectSchema" },
                            ],
                        },
                    },
                    additionalProperties: true,
                    required: ["type", "items"],
                },
            ],
        },
        objectSchema: {
            allOf: [
                { $ref: "#/definitions/baseSchema" },
                {
                    type: "object",
                    properties: {
                        type: { const: "object" },
                        properties: {
                            type: "object",
                            additionalProperties: {
                                oneOf: [
                                    { $ref: "#/definitions/stringSchema" },
                                    { $ref: "#/definitions/numberSchema" },
                                    { $ref: "#/definitions/booleanSchema" },
                                    { $ref: "#/definitions/arraySchema" },
                                    { $ref: "#/definitions/objectSchema" },
                                ],
                            },
                        },
                    },
                    additionalProperties: true,
                    required: ["type", "properties"],
                },
            ],
        },
    },
} as const;