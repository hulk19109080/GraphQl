import React, { useContext, useEffect, useState } from "react";
import { CredentialContext } from "../App";

function Todo() {
  const [todoText, setTodoText] = useState();
  const [filter, setFilter] = useState("uncompleted");

  const [todos, setTodos] = useState([]);
  const [credentials] = useContext(CredentialContext);

  const persist = (newTodos) => {
    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(todos),
    }).then(() => {});
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo._id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };

  useEffect(() => {
    fetch("http://localhost:4000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, [credentials]);

  const changeFilter = (filtered) => {
    setFilter(filtered);
  };
  const getTodos = () => {
    return todos.filter((todo) =>
      filter === "completed" ? todo.checked : !todo.checked
    );
  };
  return (
    <div>
      <select
        class="form-select"
        onChange={(e) => changeFilter(e.target.value)}
      >
        <option value="completed">Completed</option>
        <option value="uncompleted">Not Completed</option>
      </select>

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Toggle</th>
          </tr>
        </thead>
        {getTodos().map((todo, id) => (
          <tbody>
            <tr>
              <td>{id}</td>
              <td>
                <label htmlFor="check">{todo.text}</label>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => toggleTodo(todo._id)}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <form onSubmit={addTodo}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter the Task ....."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button className="btn m-2 btn-secondary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default Todo;

{
  /* <div key={todo._id}>
  <input
    type="checkbox"
    checked={todo.checked}
    onChange={() => toggleTodo(todo._id)}
  />
  <label htmlFor="check">{todo.text}</label>
</div> */
}
