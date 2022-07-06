import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import DraggbbleCard from './Componenet/DragabbleCard';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`

const Board = styled.div`
  padding-top: 30px;
  padding: 20px 10px;  
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  
`







function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({draggableId, destination, source}:DropResult) => {
    if(!destination) return;
    setToDos(oldToDos => {
      const copyToDos = [...oldToDos];

      // 1) delete item on source.index
      copyToDos.splice(source.index, 1);
      // 2) put back the item on the destination.index
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    });
  };

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId='one'>
              {(magic) => 
              <Board ref = {magic.innerRef}{...magic.droppableProps}>
                {toDos.map( (toDo, index) => 
                  <DraggbbleCard key={toDo} index={index} toDo={toDo} />
                  )}
                  {magic.placeholder}
              </Board>}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
  );
}

export default App;
