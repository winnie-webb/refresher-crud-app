import { useState } from "react";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const addTodo = () => {
    const newTodo = {
      name: inputValue.trim(),
      id: Math.floor(Math.random() * 10000000000),
    };
    setTodos([...todos, newTodo]);
    console.log([...todos, newTodo]);
  };
  const handleDelete = (todoId) => {
    const updatedTodos = todos.filter((todo) => todoId !== todo.id);
    setTodos(updatedTodos);
  };
  return (
    <>
      <div>
        <input
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          type="text"
        ></input>
        <button onClick={() => addTodo()}>Add</button>
      </div>
      {todos.map((todo, index) => (
        <div key={index} className="">
          <Todo
            setTodos={setTodos}
            todos={todos}
            todo={todo}
            name={todo.name}
            handleDelete={handleDelete}
          />
        </div>
      ))}
    </>
  );
}

export default TodoList;
