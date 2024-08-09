import { Tooltip } from '@nextui-org/react';
import { useDrop } from 'react-dnd';

const Row = ({
    index,
    setType,
    renderDroppedItems,
    addItemToRow,
    addTypeToRow,
    addConstraintToRow,
    rows,
    defaultConstraints,
    rowSelected,
    setRowSelected,
    handleRemoveRow,
    handleDuplicateRow
}) => {

    //console.log("CONSTRAINTS FOR SPECIFIC TYPE => ", defaultConstraints[rows[index].typeSelected])
    const acceptConstraints: string[] = defaultConstraints[rows[index].typeSelected] || []

    const [_, drop] = useDrop({
        accept: [...acceptConstraints, 'string', 'email', 'number', 'boolean'],

        canDrop: (item, monitor) => {
            const canDrop = [...acceptConstraints, 'string', 'email', 'number', 'boolean'].includes(item.type);

            if (!canDrop) {
                alert(`Item of type ${item.type} cannot be dropped here.`);
            }
            return canDrop;
        },

        drop: (item, monitor) => {

            if (item.type === "string" || item.type === "email" || item.type === "number" || item.type === 'boolean') {
                setType(item.type);
                if (!addTypeToRow(index, item.type)) {
                    addItemToRow(index, item.type);
                    setRowSelected(index)
                };

            }

            if (item.type === "min" || item.type === "max" || item.type === "minLength" || item.type === "maxLength" || item.type === "regex" || item.type === "integer" || item.type === "default" || item.type === "optional" || item.type === "format") {
                if (!addConstraintToRow(index, item.type)) {
                    addItemToRow(index, item.type);
                    setRowSelected(index)
                }
            }
        },
    });

    const handleClick = (index: number) => {
        setRowSelected(index)
    }


    return (
        <div
            key={index}
            ref={drop}
            className={`flex relative p-2 gap-4 h-[70px] flex-none flex-wrap items-center border border-gray-500 rounded-xl ${index === rowSelected ? "border-gray-950 dark:border-white" : ""}`}
            onClick={() => handleClick(index)}
        >
            <span className={`pl-2 ${index === rowSelected ? "font-black text-xl" : " font-medium "}`}>{index + 1}</span>
            {renderDroppedItems(index)}
            <button
                className="absolute top-2 right-2 font-black w-[20px] h-[20px] text-[10px] bg-red-500 rounded-full"
                type="button"
                onClick={() => handleRemoveRow(index)}
            >
                X
            </button>
            <Tooltip
                content="Duplicate"
                placement="right"
            >
                <button className="absolute border flex items-center justify-center bg-gray-400 border-gray-500 bottom-2 right-2 font-black w-[20px] h-[20px] text-[20px] rounded-full"
                    type="button"
                    onClick={() => handleDuplicateRow(index)}>
                    <span>+</span>
                </button>
            </Tooltip>

        </div>
    );
};

export default Row;
