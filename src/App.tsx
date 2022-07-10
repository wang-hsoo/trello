import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDostate, toDoState } from './atoms';
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

const CreateBoard = styled.form`
  width: 100%;
`;

interface IBoardForm{
  board:string;
}









function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {register, setValue, handleSubmit} = useForm<IBoardForm>();
  

  const onDragEnd = (info:DropResult) => {

    const {destination, draggableId, source} = info;
    if(!destination) return;

    if(destination?.droppableId === source.droppableId){
      //same board movement
      setToDos(oldToDos => {
        const boardCopy = [...oldToDos[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1) delete item on source.index
        boardCopy.splice(source.index, 1);
        // 2) put back the item on the destination.index
        boardCopy.splice(destination?.index, 0, taskObj);
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
        const taskObj = sourceBoard[source.index];
        //움직임이 끝나느 board의 id
        const targetBoard = [...allBoard[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, taskObj);
        return{
          ...allBoard,
          [source.droppableId] : sourceBoard,
          [destination.droppableId] : targetBoard
        }
      })
    }
    
    
  };

  const onValid = ({board}: IBoardForm) => {
    setToDos((allBoard) => {
      return{
        ...allBoard,
        [board]:[]
      }
    });
    setValue("board", "");
  }

  const setBoard = () => {
    localStorage.setItem("trello",  JSON.stringify(toDos));
    console.log(toDos);
  }

  useEffect(() => {
    const getBoard = localStorage.getItem("trello" );
    if(typeof getBoard === 'string'){
      var parseBoard = JSON.parse(getBoard);

      setToDos(() => {
        return{
          ...parseBoard
        }
      });

    }
  },[]);

  useEffect(()=>{
    setBoard();
  },[toDos]);

  

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <CreateBoard onSubmit={handleSubmit(onValid)}>
            <h3>create Board</h3>
            <input type="text" placeholder='boardName'  {...register("board", {required: true})}/>
        </CreateBoard>
        <Wrapper>
          
          <Boards>
            {Object.keys(toDos).map(boardId => <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />)}

          </Boards>
        </Wrapper>
      </DragDropContext>
  );
}

export default App;
