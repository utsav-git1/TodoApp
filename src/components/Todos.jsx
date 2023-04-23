import React, { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineEdit } from "react-icons/ai";
import TodoForm from "./TodoForm";

const Todos = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id != null) {
    return (
      <TodoForm
        onSubmit={submitUpdate}
        buttonCaption="Update"
        currentText={edit.value}
      />
    );
  }

  return todos.map((todo, index) => (
    <div className={todo.isDone ? "todo-done" : "todo"} key={index}>
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <AiOutlineEdit
          className="edit-icon"
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
        />
        <TiDeleteOutline
          className="delete-icon"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
    </div>
  ));
};

export default Todos;
