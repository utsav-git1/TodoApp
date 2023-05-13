import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineEdit } from "react-icons/ai";
import TodoForm from "./TodoForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCalendar } from "react-icons/ai";
import { FaCheckSquare } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Todos = ({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  addReminder,
  displayTodos,
  search,
  setTodos,
}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
    date: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [todoList, setTodoList] = useState(todos);

  const submitUpdate = (value) => {
    updateTodo(edit.id, { ...value, date: edit.date });
    setEdit({
      id: null,
      value: "",
      date: "",
    });
  };

  useEffect(() => {
    if (displayTodos === "done") {
      setTodoList(todos.filter((todo) => todo.isDone === true));
    } else if (displayTodos === "pending") {
      setTodoList(todos.filter((todo) => todo.isDone !== true));
    } else {
      setTodoList(todos);
    }
  }, [displayTodos, todos]);

  useEffect(() => {
    if (search !== null) {
      const searchResults = todos.filter((todo) => todo.text.match(search));
      setTodoList(searchResults);
    }
  }, [search]);

  if (edit.id != null) {
    return (
      <TodoForm
        onSubmit={submitUpdate}
        buttonCaption="Update"
        currentText={edit.value}
      />
    );
  }

  return (
    <div className="list-wrapper">
      <DragDropContext
        onDragEnd={(param) => {
          const srcIndex = param.source.index;
          const destIndex = param.destination.index;
          let orderedTodo = [...todos];
          orderedTodo.splice(destIndex, 0, orderedTodo.splice(srcIndex, 1)[0]);
          setTodos(orderedTodo);
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todoList.map((todo, index) => (
                <Draggable
                  key={index}
                  draggableId={"draggable-" + index}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={todo.isDone ? "todo-done" : "todo"}
                      key={index}
                      onClick={() => setSelectedId(todo.id)}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                        boxShadow: snapshot.isDragging
                          ? "0 0 20px white"
                          : "none",
                      }}
                    >
                      <div className="icons">
                        <FaCheckSquare onClick={() => completeTodo(todo.id)} />
                      </div>
                      <div key={todo.id} {...provided.dragHandleProps}>
                        {todo.text}
                      </div>

                      <div className="icons">
                        <input
                          style={{
                            display:
                              isOpen && todo.id === selectedId
                                ? "none"
                                : "block",
                            width: "80px",
                            margin: "5px",
                            padding: "5px",
                            borderRadius: "5px",
                            backgroundColor:
                              new Date().toLocaleDateString() == todo.date
                                ? "yellow"
                                : "white",
                          }}
                          value={todo.date}
                        />
                        <div
                          style={{
                            zIndex: isOpen && todo.id !== selectedId ? 1 : 5,
                            fontSize: "medium",
                          }}
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {!isOpen && <AiFillCalendar />}
                          {isOpen && todo.id === selectedId && (
                            <DatePicker
                              onChange={(date) => addReminder(date, todo.id)}
                              onClickOutside={() => setIsOpen(false)}
                              open={isOpen}
                              shouldCloseOnSelect={true}
                            />
                          )}
                        </div>
                        <AiOutlineEdit
                          className="edit-icon"
                          onClick={() =>
                            setEdit({
                              id: todo.id,
                              value: todo.text,
                              date: todo.date,
                            })
                          }
                        />
                        <TiDeleteOutline
                          className="delete-icon"
                          onClick={() => removeTodo(todo.id)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Todos;
