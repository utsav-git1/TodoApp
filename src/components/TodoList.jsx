import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todos from "./Todos";

const getStoredTodos = () => {
  let list = localStorage.getItem("todos");
  return list ? JSON.parse(list) : [];
};

const TodoList = () => {
  const [todos, setTodos] = useState(getStoredTodos());

  const addTodo = (todo) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const updateTodo = (id, updatedValue) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedValue : todo))
    );
  };

  const removeTodo = (id) => {
    const leftTodos = [...todos].filter((todo) => todo.id !== id);

    setTodos(leftTodos);
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) todo.isDone = !todo.isDone;
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="todo-app">
        <h1>Today's Todos!</h1>
        <TodoForm onSubmit={addTodo} buttonCaption="Add Todo" />
        <Todos
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </div>
    </>
  );
};

export default TodoList;
