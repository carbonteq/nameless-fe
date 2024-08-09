
const flattenToSingularObject = (cons) => {
    if (cons) {
        let objs = {};
        cons.map((con) => { objs = { ...objs, [con.name]: con.value } })
        return objs
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

