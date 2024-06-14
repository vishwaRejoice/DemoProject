import React, { useState } from "react";
import styled from "@emotion/styled";
import { columnsFromBackend, data } from "../Todolist/KanbanData";
import TaskCard from "../Todolist/TaskCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Board from "../Todolist/Board";
import AddData from "./AddData";

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend(data));
  const [values, setValues] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const columnTitle = destColumn?.title;
      let columname;

      if (columnTitle === "In-Progress") {
        columname = "inprogres";
      } else if (columnTitle === "To-do") {
        columname = "todo";
      } else if (columnTitle === "Done") {
        columname = "done";
      } else if (columnTitle === "QA-Test") {
        columname = "qatest";
      }

      const updatedItems = destItems?.map((item) => {
        return {
          ...item,
          status: columname
        };
      });
         const updateData = (originalData, newData) => {
        const updateMap = new Map(newData.map(item => [item.id, item]));
        const filteredData = originalData.filter(item => !updateMap.has(item.id));
        const mergedData = [...filteredData, ...newData];
        return mergedData;
      };
      
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: updatedItems,
        },
      });
   
      // const newData = updateData(data, updatedItems);
      // setColumns(columnsFromBackend(newData))
   
    }
  };

  const handleOnEdit = (item) => {
    setOpenModal(true);
    setEditItem(item?.id);
    setValues(item);
  };
  return (
    <>
      <AddData
        setColumns={setColumns}
        values={values}
        setValues={setValues}
        setOpenModal={setOpenModal}
        openModal={openModal}
        editItem={editItem}
        setEditItem={setEditItem}
      />
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Container>
          <TaskColumnStyles>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <TaskList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Title>{column.title}</Title>
                      {column.items.map((item, index) => (
                        <TaskCard
                          key={item}
                          item={item}
                          index={index}
                          column={column}
                          onclick={handleOnEdit}
                        />
                      ))}
                      {provided.placeholder}
                    </TaskList>
                  )}
                </Droppable>
              );
            })}
          </TaskColumnStyles>
        </Container>
      </DragDropContext>
    </>
  );
};

export default Kanban;
