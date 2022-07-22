import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import cx from "classnames";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [todoItem, setTodoItem] = useState("");
  const [todos, setTodos] = useState([
    {
      id: "1234",
      message: "Buy Bread",
      done: false,
    },
    {
      id: "4567",
      message: "Buy Eggs",
      done: false,
    },
  ]);

  const inputChangeHandler = (e) => {
    setTodoItem(e.target.value);
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      addTodoHandler();
    }
  };

  const addTodoHandler = () => {
    if (todoItem) {
      setTodos([
        {
          id: uuidv4(),
          message: todoItem,
          done: false,
        },
        ...todos,
      ]);
      setTodoItem("");
    }
  };

  const toggleHandler = (id) => {
    const _todos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo, //all properties of todo
          done: !todo.done, //updating todo
        };
      }
      return todo;
    });

    setTodos(_todos);
  };

  return (
    <div className="w-3/4 max-w-[500px] mx-auto text-center">
      <div className="pt-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-400 to-blue-700">
          NeoTODO
        </h1>
        <p className="italic">a minimal todo application</p>
      </div>
      <div className="pt-12">
        <input
          className="w-full text-gray-900 border-none outline-none px-4 py-2 rounded text-center"
          type="text"
          value={todoItem}
          onChange={inputChangeHandler}
          onKeyDown={enterHandler}
        />
      </div>

      <ul className="pt-12">
        {todos
          .filter((todo) => !todo.done)
          .map((todo) => (
            <li
              key={todo.id}
              className={cx(styles.item)}
              onClick={() => toggleHandler(todo.id)}
            >
              {todo.message}
            </li>
          ))}

        {todos
          .filter((todo) => todo.done)
          .map((todo) => (
            <li
              key={todo.id}
              className={cx(styles.item, styles.done)}
              onClick={() => toggleHandler(todo.id)}
            >
              {todo.message}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;

//here we have
//undone todo-items on top
//done todo-items on bottom

//**for random unique ids, we can use the following:
//const randomID = () => Math.random().toString(36).slice(2);
//and call it --> id: randomID();

//or we can use uuid npm package--> which generates a unique id

//we can also use classnames( npm package) for conditionally joining classNames together
//npm install classnames
//import cx from 'classnames'
//<li className={cx('item', {todo.done: done})}
//here item is a className and done is a className

/* //add button if needed:
<button
  className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-r hover:bg-yellow-300"
  type="submit"
  onClick={addTodoHandler}
>
  ADD
</button>;
*/

//list item:
// className={todo.done ? "line-through" : ""}
