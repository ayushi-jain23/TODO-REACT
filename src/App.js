import * as React from "react";
// import './style.css';

export default function App() {
  const [text, setText] = React.useState("");
  const [arr, setArr] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState([]);
  const [newEditedText, setNewEditedText] = React.useState({});

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const clear = () => {
    setText("");
  };

  const add = () => {
    setArr([...arr, text]);
    setText("");
  };

  const del = (index) => {
    const newTextArr = [...arr];
    newTextArr.splice(index, 1);
    setArr(newTextArr);
  };

  const edit = (index) => {
    setEditIndex((prevIndex) => [...prevIndex, index]);
  };

  const handleUpdate = (index, event) => {
    setNewEditedText({ ...newEditedText, ...{ [index]: event.target.value } });
  };

  const save = (index) => {
    const newTextArr = [...arr];
    newTextArr[index] = newEditedText[index];
    setArr(newTextArr);
    removeDataFromEditIndex(index);
  };

  const cancel = (index) => {
    removeDataFromEditIndex(index);
  };

  const removeDataFromEditIndex = (index) => {
    const newEditIndexArr = [...editIndex];
    let indexOfElementInNewEditIndexArr = newEditIndexArr.indexOf(index);
    newEditIndexArr.splice(indexOfElementInNewEditIndexArr, 1);
    setEditIndex(newEditIndexArr);
    setNewEditedText({ ...newEditedText, ...{ [index]: "" } });
  };

  return (
    <div>
      <h1>TODO APP</h1>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={() => text && add()}> ADD </button>
      <button onClick={clear}> CLEAR </button>
            
      <ul id="list">
        {arr.map((task, index) => {
          let isEditTrue = editIndex.includes(index);
          return (
            <li key={index}>
              {!isEditTrue ? (
                <>
                  {task}   
                  <button onClick={() => edit(index)}> Edit </button>
                  <button onClick={() => del(index)}> Delete </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={newEditedText[index] || ""}
                    onChange={(e) => handleUpdate(index, e)}
                  />
                  <button
                    onClick={() =>
                      newEditedText[index] ? save(index) : alert("enter value")
                    }
                  >
                     Save 
                  </button>
                  <button onClick={() => cancel(index)}> Cancel </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
