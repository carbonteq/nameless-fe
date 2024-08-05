import { useDrop } from 'react-dnd';

const Row = ({
    index,
    setType,
    renderDroppedItems,
    addItemToRow,
    addTypeToRow,
    addConstraintToRow,
    rows,
    defaultConstraints
}) => {

    //console.log("CONSTRAINTS FOR SPECIFIC TYPE => ", defaultConstraints[rows[index].typeSelected])
    const acceptConstraints: string[] = defaultConstraints[rows[index].typeSelected] || []

    const [_, drop] = useDrop({
        accept: [...acceptConstraints, 'string', 'email', 'integer'],

        canDrop: (item, monitor) => {
            const canDrop = [...acceptConstraints, 'string', 'email', 'integer'].includes(item.type);
            if (!canDrop) {
                alert(`Item of type ${item.type} cannot be dropped here.`);
            }
            return canDrop;
        },

        drop: (item, monitor) => {

            if (item.type === "string" || item.type === "email" || item.type === "integer") {
                setType(item.type);
                if (!addTypeToRow(index, item.type)) {
                    addItemToRow(index, item.type);
                };

            }

            if (item.type === "Min" || item.type === "Max") {
                if (!addConstraintToRow(index, item.type)) {
                    addItemToRow(index, item.type);
                }
            }

            if (item.type === "regex") {
                if (!addConstraintToRow(index, item.type)) {
                    addItemToRow(index, item.type);
                }
            }
        },
    });

    return (
        <div
            key={index}
            ref={drop}
            className={`flex p-2 gap-4 h-[70px] flex-none flex-wrap items-center border border-gray-500 rounded-xl`}

        >
            {renderDroppedItems(index)}
        </div>
    );
};

export default Row;
