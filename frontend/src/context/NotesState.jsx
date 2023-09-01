import React, { useState } from "react";
import noteContext from "./NoteContext";
import Alert from "../components/Alert";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  let Notes = [];
  const token = localStorage.getItem("auth-token");
  const [notes, setNotes] = useState(Notes);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application-json",
        "auth-token": token
      },
    });
    const json = await response.json()
    Notes = json.notes;
    setNotes(Notes);
  };

  //Add Note;
  const addNote = async (title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify({title, description, tag})
      });
      const newNote = await response.json();
      setNotes(notes.concat(newNote));
    }
  //Edit Note;
  const editNote = async (id, title, description, tag) => {
    // console.log(id, title);
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({title, description, tag})
    });
    getNotes();
  };

  //Delete Note;
    const deleteNote = async (id) => {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token": token
        },
      });
      <Alert alert={response.status}/>
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider value={{ notes, getNotes, deleteNote, editNote, addNote }}>
      {props.children}
    </noteContext.Provider>
  );
}
export default NoteState;
