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

const Title = styled.h2`
    text-align: center;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 18px;
`;

interface IBoardProps{
    toDos: string[];
    boardId: string;
}

function Board({toDos, boardId}: IBoardProps){
    

    return(
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
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