import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todos from "./Todos";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiCancel } from "react-icons/gi";

const getStoredTodos = () => {
  let list = localStorage.getItem("alltodos");
  return list ? JSON.parse(list) : [];
};

const TodoList = () => {
  const [todos, setTodos] = useState(getStoredTodos());
  const [isOpen, setIsOpen] = useState(false);
  const [displayTodos, setDisplayTodos] = useState("all");
  const [search, setSearch] = useState(null);

  useEffect(() => {
    localStorage.setItem("alltodos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

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

  const displayCompletedTodos = () => {
    const updatedTodos = getStoredTodos().filter((todo) => todo.isDone == true);
    setTodos(updatedTodos);
  };

  const displayInCompletedTodos = () => {
    const updatedTodos = getStoredTodos().filter((todo) => todo.isDone != true);
    setTodos(updatedTodos);
  };

  const searchTodo = (key) => {
    let string = key.text;
    setSearch(string);
  };

  const clearAll = () => {
    setTodos([]);
  };

  const addReminder = (date, id) => {
    let filteredTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.date = date.toLocaleDateString();
      }
      return todo;
    });
    setTodos(filteredTodo);
  };

  return (
    <div className="wrapper" style={{ display: "flex" }}>
      <div
        className="slider"
        style={{
          translate: isOpen
            ? window.matchMedia("(max-width: 780px)").matches
              ? "100%"
              : "370px"
            : window.matchMedia("(max-width: 780px)").matches
            ? "10px"
            : "200px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          className="menu-item"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "solid 2px",
            borderRadius: "7px",
            padding: "5px",
          }}
        >
          Menu
          <GiCancel onClick={() => setIsOpen(!isOpen)} />
        </div>
        <div className="menu-item" onClick={() => setDisplayTodos("done")}>
          Done
        </div>
        <div className="menu-item" onClick={() => setDisplayTodos("pending")}>
          Pending
        </div>
        <div
          className="menu-item"
          onClick={() => {
            setDisplayTodos("all");
            setSearch(null);
          }}
        >
          Show All
        </div>
        <div className="menu-item" onClick={clearAll}>
          Clear All
        </div>
      </div>
      <div className="todo-app">
        <h1>Today's Todos!</h1>
        <div
          style={{
            color: isOpen ? "black" : "white",
            textAlign: "left",
            fontSize: "25px",
          }}
        >
          <GiHamburgerMenu onClick={() => setIsOpen(true)} />
        </div>
        <TodoForm
          onSubmit={searchTodo}
          buttonCaption="Search Task"
          placeholder="Search"
        />
        <TodoForm
          onSubmit={addTodo}
          buttonCaption="Add Task"
          placeholder="Add Task"
        />
        <Todos
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          addReminder={addReminder}
          displayTodos={displayTodos}
          search={search}
          setTodos={setTodos}
        />
      </div>
    </div>
  );
};

export default TodoList;
