import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
`

interface IDragabbleCardProps{
    toDo: string;
    index: number;
}

function DraggbbleCard ({toDo, index}:IDragabbleCardProps){
    
    return(
        <Draggable draggableId={toDo} index={index} key={toDo}>
            {(magic) => (
              <Card ref = {magic.innerRef}{...magic.draggableProps}{...magic.dragHandleProps}>
                {index + 1}
                {toDo}
            </Card>)}
        </Draggable>
    )
}

export default React.memo(DraggbbleCard);