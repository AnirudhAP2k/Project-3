import React, { useState } from "react";
import noteContext from "./NoteContext";
import Alert from "../components/Alert";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  let Notes = [];
  const [notes, setNotes] = useState(Notes);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application-json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRlNDc0MTU2YmI0OTkwZTViNmM2Y2ZlIiwiaWF0IjoxNjkyNjkzNTUwfQ.ZWXXsKzrfUUd4ESyq_FQyn4txYaxk-ZvkKLIT76u3ac",
      },
    });
    const json = await response.json()
    Notes = json.notes;
    // console.log(Notes);
    setNotes(Notes);
  };

  //Add Note;
  const addNote = async (title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRlNDc0MTU2YmI0OTkwZTViNmM2Y2ZlIiwiaWF0IjoxNjkyNjkzNTUwfQ.ZWXXsKzrfUUd4ESyq_FQyn4txYaxk-ZvkKLIT76u3ac",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRlNDc0MTU2YmI0OTkwZTViNmM2Y2ZlIiwiaWF0IjoxNjkyNjkzNTUwfQ.ZWXXsKzrfUUd4ESyq_FQyn4txYaxk-ZvkKLIT76u3ac",
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
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRlNDc0MTU2YmI0OTkwZTViNmM2Y2ZlIiwiaWF0IjoxNjkyNjkzNTUwfQ.ZWXXsKzrfUUd4ESyq_FQyn4txYaxk-ZvkKLIT76u3ac",
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
