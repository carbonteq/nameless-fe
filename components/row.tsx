import { Tooltip } from '@nextui-org/react';
import { CONSTRAINTS, DEFAULT_CONSTRAINTS, TYPES } from './constants';
import { useDrop, } from 'react-dnd';

const Row = ({
    index,
    setType,
    renderDroppedItems,
    addItemToRow,
    addTypeToRow,
    addConstraintToRow,
    rows,
    rowSelected,
    setRowSelected,
    handleRemoveRow,
    handleDuplicateRow
}) => {

    //console.log("CONSTRAINTS FOR SPECIFIC TYPE => ", defaultConstraints[rows[index].typeSelected])
    const acceptConstraints: string[] = DEFAULT_CONSTRAINTS[rows[index].typeSelected] || []

    const [_, drop] = useDrop({
        accept: [...acceptConstraints, ...TYPES],

        canDrop: (item: any, monitor) => {
            const canDrop = [...acceptConstraints, ...TYPES].includes(item.type);

            if (!canDrop) {
                alert(`Item of type ${item.type} cannot be dropped here.`);
            }
            return canDrop;
        },

        drop: (item, monitor) => {

            if (TYPES.includes(item.type)) {
                setType(item.type);
                if (!addTypeToRow(index, item.type)) {
                    addItemToRow(index, item.type);
                    setRowSelected(index)
                };
            }

            if (CONSTRAINTS.includes(item.type)) {
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
            className={`flex relative p-2 gap-4 min-h-[70px] h-auto flex-none flex-wrap items-center border border-gray-500 rounded-xl ${index === rowSelected ? "border-gray-950 dark:border-white" : ""}`}
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
