import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  let Notes = [];
  const [notes, setNotes] = useState(Notes);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {  
    setAlert ({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
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
          "auth-token": localStorage.getItem("auth-token")
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
        "auth-token": localStorage.getItem("auth-token")
      },
      body: JSON.stringify({title, description, tag})
    });
    getNotes();
  };

  //Delete Note;
    const deleteNote = async (id) => {
      // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token")
        },
      });
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNotes);
  };
  

  return (
    <noteContext.Provider value={{ notes, alert, getNotes, deleteNote, editNote, addNote, showAlert}}>
      {props.children}
    </noteContext.Provider>
  );
}
export default NoteState;
