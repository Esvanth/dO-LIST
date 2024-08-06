// app/TodoList.js
"use client";
import React, { useState } from "react";

export default function TodoList() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  /**
 * My Todo List Application
 * Copyright (c) 2024 Esvanth
 * All rights reserved.
 */

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedTasks = mainTask.map((task, index) =>
        index === currentIndex ? { title, desc } : task
      );
      setMainTask(updatedTasks);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setMainTask([...mainTask, { title, desc }]);
    }
    setTitle("");
    setDesc("");
    console.log(mainTask);
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const editHandler = (i) => {
    setTitle(mainTask[i].title);
    setDesc(mainTask[i].desc);
    setIsEditing(true);
    setCurrentIndex(i);
  };

  let renderTask = <h2 className="text-gray-500 text-center">No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className="flex items-center justify-between mb-4 bg-gray-100 p-4 rounded shadow">
        <div className="flex items-center justify-between w-2/3">
          <h5 className="text-xl font-semibold text-gray-900">{t.title}</h5>
          <h6 className="text-md font-medium text-gray-600">{t.desc}</h6>
        </div>
        <div>
          <button
            onClick={() => editHandler(i)}
            className="bg-blue-500 text-white px-3 py-1 rounded font-bold mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => deleteHandler(i)}
            className="bg-red-500 text-white px-3 py-1 rounded font-bold"
          >
            Delete
          </button>
        </div>
      </li>
    ));
  }

  return (
    <>
      <h1 className="bg-purple-700 text-white p-5 text-5xl font-bold text-center">
        My Todo List
      </h1>
      <form onSubmit={submitHandler} className="flex flex-col items-center">
        <input
          type="text"
          className="text-2xl text-black bg-white border-gray-300 border-2 rounded m-2 px-4 py-2 w-3/4"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="text-2xl text-black bg-white border-gray-300 border-2 rounded m-2 px-4 py-2 w-3/4"
          placeholder="Enter description here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="bg-purple-700 text-white px-4 py-3 text-2xl font-bold rounded m-5">
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </form>
      <hr />
      <div className="bg-white p-5 rounded shadow mt-5 w-3/4 mx-auto">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
}
