import React, { useState } from "react";

const TodoForm = (props) => {
  const [input, setInput] = useState(
    props.currentText ? props.currentText : ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Array.from(input).some((chars) => chars !== " "))
      props.onSubmit({
        id: Math.floor(Math.random() * 1000),
        text: input,
        date: "",
      });

    setInput("");
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder={props.placeholder}
        value={input}
        onChange={handleChange}
        maxLength={40}
        style={{ backgroundColor: input.length >= 40 && "red" }}
      />
      <button className="todo-button">{props.buttonCaption}</button>
    </form>
  );
};

export default TodoForm;
