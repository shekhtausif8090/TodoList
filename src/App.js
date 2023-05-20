import React, { useState } from "react";
import styled from "styled-components";
import { useImmer } from "use-immer";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Button = styled.button`
  display: inline-block;
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  height: 30px;
  width: 50px;
  border-radius: 2px;
  cursor: pointer;
  margin-left: 4px;
`;
const Text = styled.input`
  border: 2px solid #000;
  padding: 2px;
`;
const List = styled.li`
  list-style-type: none;
  text-decoration: "line-through";
  font-size: 1.5rem;
  width: 100%;
`;
const ListWrapper = styled.div`
  cursor: pointer;
`;
function App() {
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useImmer([]);
  function handleChange(e) {
    setUserInput(e.target.value);
  }
  function handleClick() {
    if (userInput.trim() === "") {
      return;
    }
    const id = Math.random() * 100;
    setTodoList((prev) => {
      return [
        ...prev,
        {
          id: id,
          task: userInput.trim(),
        },
      ];
    });
    setUserInput("");
  }
  function handleClear() {
    setTodoList([]);
  }

  function deleteHandler(id) {
    const temp = todoList.filter((todo) => todo.id !== id);
    setTodoList(temp);
  }

  return (
    <Container>
      <div>
        <h2>Todo List</h2>
        <Text value={userInput} onChange={handleChange} />
        <Button onClick={handleClick}>Add</Button>
        <Button onClick={handleClear}>Clear </Button>
        <span>Click on todolist to delete</span>
        <div>
          <ul>
            {todoList.map((todo) => {
              return (
                <ListWrapper
                  key={todo.id}
                  onClick={() => deleteHandler(todo.id)}
                >
                  <List>{todo.task}</List>
                </ListWrapper>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
}
export default App;
