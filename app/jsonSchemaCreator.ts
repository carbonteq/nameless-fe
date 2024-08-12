
const flattenToSingularObject = (cons) => {
    if (cons) {
        return cons.reduce((acc, con) => ({ ...acc, [con.name]: con.value }), '')
    }
}

export const convertToJson = (keys: any) => {
    const jsonObj = keys.reduce((acc, key) => {
        const schema = {
            type: key.typeSelected,
            ...(flattenToSingularObject(key?.constraints))
        }
        acc[key.name] = schema
        return acc
    }, {})

    const updatedJsonObject = {
        "columns": jsonObj
    }

    //flattenToSingularObject(keys[0].constraints)
    return updatedJsonObject
}

