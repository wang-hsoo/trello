import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './Componenet/Board';
import DraggbbleCard from './Componenet/DragabbleCard';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap:10px;
`









function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info:DropResult) => {

    const {destination, draggableId, source} = info;
    if(!destination) return;

    if(destination?.droppableId === source.droppableId){
      //same board movement
      setToDos(oldToDos => {
        const boardCopy = [...oldToDos[source.droppableId]];
        // 1) delete item on source.index
        boardCopy.splice(source.index, 1);
        // 2) put back the item on the destination.index
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...oldToDos,
          [source.droppableId] : boardCopy
        };
      });
    }

    if(destination.droppableId !== source.droppableId){
      //cross board 

      setToDos((allBoard) => {
        //움직임이 시작된 board의 id
        const sourceBoard = [...allBoard[source.droppableId]];
        //움직임이 끝나느 board의 id
        const targetBoard = [...allBoard[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, draggableId);
        return{
          ...allBoard,
          [source.droppableId] : sourceBoard,
          [destination.droppableId] : targetBoard
        }
      })
    }
    
    
  };

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map(boardId => <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />)}
          </Boards>
        </Wrapper>
      </DragDropContext>
  );
}

export default App;
