import { Con, IColumn } from "../drag-test/page"

interface IKey {
    name: string,
    typeSelected: string,
    constraints: Con[]
}

export const convertToRowFromSchema = (keys: IKey[]) => {

    const rows: IColumn[] = []
    keys.map(key => {
        let temp: string[] = []
        temp.push(key.typeSelected)
        key.constraints.map(con => temp.push(con.name))
        rows.push({
            name: key.name,
            typeSelected: key.typeSelected,
            constraints: key.constraints,
            items: temp
        })
    })

    console.log("CONVERTED TO ROWS => ", rows);

    return rows
}
