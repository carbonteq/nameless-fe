import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const DraggableItem = styled.div`
  width: 100px;
  height: 50px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #333;
  cursor: pointer;
`;

const Draggable = ({ type, children }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type,
        item: { type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <DraggableItem ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {children}
        </DraggableItem>
    );
};

export default Draggable;
