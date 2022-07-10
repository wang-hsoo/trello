import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggbbleCard from "./DragabbleCard";
import { useEffect } from "react";


const Wrapper = styled.div`
        padding: 10px 0px;  
        background-color: ${(props) => props.theme.boardColor};
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width : 100% ;
  input{
    width: 100%;
  }
`;

interface IBoardProps{
    toDos: IToDo[];
    boardId: string;
}

interface IAreaProps{
    isDraggingOver: boolean;
    draggingFromThisWith:boolean;
}

interface IForm{
    toDo: string;
}

function Board({toDos, boardId}: IBoardProps){
    const setToDos = useSetRecoilState(toDoState);
    const {register, setValue, handleSubmit} = useForm<IForm>();
    const onValid = ({toDo}:IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };

        setToDos((allBoards) => {
            return{
                ...allBoards,
                [boardId]: [
                    ...allBoards[boardId],
                    newToDo
                ],
            }
        });

        setValue("toDo", "");
    }

    return(
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", {required: true})} type="text" placeholder={`Add task on ${boardId}`} />
            </Form>
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => 
                <Area 
                    isDraggingOver = {snapshot.isDraggingOver} 
                    draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} 
                    ref = {magic.innerRef}{...magic.droppableProps}
                    //ref react 코드를 이용해 html 요소를 지정하고, 가져올 수 있는 방법
                >
                    {toDos.map( (toDo, index) => 
                    <DraggbbleCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
                    )}
                    {magic.placeholder}
                </Area>}
            </Droppable>

        </Wrapper>
    )
}

export default Board;