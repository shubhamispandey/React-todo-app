import React, { useState, useEffect } from "react";
import "./style.css";

const Todo = () => {
  //   !------------------------------
  const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList");
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };

  //   !------------------------------
  const [userInput, setUserInput] = useState("");
  const [todoItems, setTodoItems] = useState(getLocalData());
  const [editId, setEditId] = useState("");

  //   !------------------------------
  const inputChangeHandler = (e) => {
    setUserInput(e.target.value);
  };

  //   !------------------------------
  const addTodoHandler = () => {
    if (!userInput) {
      alert("Enter Input");
    } else if (userInput && editId) {
      setTodoItems(
        todoItems.map((el) => {
          if (el.id === editId) {
            return { ...el, name: userInput };
          }
          return el;
        })
      );
      setUserInput("");
      setEditId("");
    } else {
      const newData = {
        id: new Date().getTime().toString(),
        name: userInput,
      };
      const updatedTodoItems = [...todoItems, newData];
      setTodoItems(updatedTodoItems);
      setUserInput("");
    }
  };

  //   !------------------------------
  const deleteTodoHandler = (id) => {
    const newData = todoItems.filter((el) => el.id !== id);
    setTodoItems(newData);
  };

  //   !------------------------------
  const editTodoHandler = (id) => {
    const updateData = todoItems.find((el) => el.id === id);
    setUserInput(updateData.name);
    setEditId(id);
  };

  //   !------------------------------
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.png" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={userInput}
              onChange={inputChangeHandler}
            />
            {editId ? (
              <i className="far fa-edit add-btn" onClick={addTodoHandler}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addTodoHandler}></i>
            )}
          </div>
          {/* show our items  */}
          <div className="showItems">
            {todoItems.map((curElm) => {
              return (
                <div className="eachItem" key={curElm.id}>
                  <h3>{curElm.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => {
                        editTodoHandler(curElm.id);
                      }}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => {
                        deleteTodoHandler(curElm.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => {
                setTodoItems([]);
              }}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
