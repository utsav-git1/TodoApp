import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
