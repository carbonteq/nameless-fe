import { useDrag } from "react-dnd";

const Draggable = ({ type, children }: any) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type,
        item: { type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`w-24 h-12 border border-gray-500 rounded-full text-center p-2 m-2 cursor-pointer ${isDragging ? "hidden" : ""}`}
        >
            {children}
        </div>
    );
};

export default Draggable