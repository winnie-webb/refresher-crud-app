import { useState } from "react";
import PropTypes from "prop-types";

function Todo({ name, handleDelete, setTodos, todos, todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState("");
  return (
    <>
      <div className="todo-container" key={todo.id}>
        <>
          {isEditing && (
            <>
              <input
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
              ></input>
              <button
                onClick={() => {
                  const newTodos = [...todos];
                  const todoForUpdate = newTodos.find(
                    (currentTodo) => currentTodo.id === todo.id
                  );
                  todoForUpdate.name = editingValue;
                  console.log(newTodos);
                  setTodos(newTodos);
                  setIsEditing(!isEditing);
                }}
              >
                Update
              </button>
            </>
          )}
        </>

        {!isEditing && (
          <>
            <span>{name}</span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </>
  );
}
Todo.propTypes = {
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default Todo;
