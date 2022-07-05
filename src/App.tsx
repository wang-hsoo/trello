import React from 'react';
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";



function App() {
  const onDragEnd = () => {

  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId='one'>
            {(provider) => 
            <ul ref = {provider.innerRef}{...provider.droppableProps}>
              <Draggable draggableId='first' index={0}>
                {(magic) => <li ref = {magic.innerRef}{...magic.draggableProps}{...magic.dragHandleProps}>One</li>}
              </Draggable>

              <Draggable draggableId='second' index={1}>
              {(magic) => <li ref = {magic.innerRef}{...magic.draggableProps}{...magic.dragHandleProps}>Two</li>}
              </Draggable>
            </ul>}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
