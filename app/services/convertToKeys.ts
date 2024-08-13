const convertToKeys = (inputObject: Record<string, unknown> | any) => {
    const result = [];

    const columns = inputObject.columns
    console.log("IN CONVERSION STATE ", columns);


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

export default convertToKeys

