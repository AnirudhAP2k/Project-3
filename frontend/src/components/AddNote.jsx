import React, { useContext, useState }from "react";
import noteContext from "../context/NoteContext";

function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    const onChange = (e) => {
        setNote({...note, [e.target.id]: e.target.value});
    }
  return (
    <div>
      <div className="justify-flex my-3">
        <h2>Add a Note</h2>
        <form className="my-4">
          <div className="mb-3">
                <label htmlFor="title" className="form-label">
                Title
                </label>
                <input
                type="text"
                className="form-control"
                id="title"
                onChange={onChange}
                />
          </div>
          <div className="mb-3">
                <label htmlFor="description" className="form-label">
                Description
                </label>
                <input
                type="text"
                className="form-control"
                id="description"
                onChange={onChange}
                />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;