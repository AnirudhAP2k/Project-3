import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes, showAlert } = context;
  let navigate = useNavigate(); 

  useEffect(() => {
    if(localStorage.getItem('auth-token')){
    getNotes();
    }
    else{
      showAlert("Log In Required", "danger")
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
      <AddNote/>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "There are no notes to display. Add a note"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note}/>;
        })}
      </div>
    </>
  );
}

export default Notes;
