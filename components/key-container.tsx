import { useDrop } from 'react-dnd';

const KeyContainer = ({ children }) => {
    const [, drop] = useDrop({
        accept: ['type', 'constraint'],
        drop: (item, monitor) => {
            console.log('Dropped item:', item);
        },
    });

    return (
        <div ref={drop} className="w-52 h-24 border border-black flex flex-col items-center justify-center">
            <input type="text" placeholder="Key" className="border p-1" />
            {children}
        </div>
    );
};

export default KeyContainer;
