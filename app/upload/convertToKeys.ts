const convertObject = (inputObject: Record<string, unknown>) => {
    const result = [];

    const columns = inputObject.columns

    for (const [key, value] of Object.entries(columns)) {
        const transformed = {
            name: key,
            typeSelected: value.type,
            constraints: Object.entries(value)
                .filter(([constraintName]) => constraintName !== 'type')
                .map(([constraintName, constraintValue]) => ({
                    name: constraintName,
                    value: constraintValue
                }))
        };

        result.push(transformed);
    }

    return result;
};

export default convertObject

