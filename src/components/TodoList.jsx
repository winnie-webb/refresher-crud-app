import { useEffect, useState } from "react";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/api/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  const addTodo = async () => {
    const newTodo = {
      name: inputValue.trim(),
    };
    setTodos([...todos, newTodo]);
    await fetch(`http://localhost:3000/api/todos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
  };
  const handleDelete = async (todoId) => {
    const updatedTodos = todos.filter((todo) => todoId !== todo._id);
    setTodos(updatedTodos);
    fetch(`http://localhost:3000/api/todos/${todoId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
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
