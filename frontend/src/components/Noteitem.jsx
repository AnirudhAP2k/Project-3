import React, { useContext }from "react";
import noteContext from "../context/NoteContext";
import editImg from "../edit.png";
import delImg from "../delete.png";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;
  const { note } = props;

  return (
    <div className=" col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <div className="container">
            <img  className="mx-1" src={delImg} alt="" height="25px" onClick={()=>(deleteNote(note._id))}/>
            <img  className="mx-1" src={editImg} alt="" height="20px" onClick={()=>(editNote(note._id))}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
