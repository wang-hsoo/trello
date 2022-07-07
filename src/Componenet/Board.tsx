import { Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import DraggbbleCard from "./DragabbleCard";

const Wrapper = styled.div`
        padding-top: 30px;
        padding: 20px 10px;  
        background-color: ${(props) => props.theme.boardColor};
        border-radius: 5px;
`;

const Title = styled.h3`
    text-align: center;
    padding-bottom: 5px;
    font-weight: 500;
`;

interface IBoardProps{
    toDos: string[];
    boardId: string;
}

function Board({toDos, boardId}: IBoardProps){
    

    return(
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId='one'>
                {(magic) => 
                <div ref = {magic.innerRef}{...magic.droppableProps}>
                    {toDos.map( (toDo, index) => 
                    <DraggbbleCard key={toDo} index={index} toDo={toDo} />
                    )}
                    {magic.placeholder}
                </div>}
            </Droppable>
        </Wrapper>
    )
}

export default Board;