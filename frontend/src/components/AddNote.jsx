import React, { useContext, useState }from "react";
import noteContext from "../context/NoteContext";

function AddNote() {
    const context = useContext(noteContext);
    const { addNote, showAlert } = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("Note Added Successfully", "success");
        setNote({title: "", description: "", tag: ""})
    }
    const onChange = (e) => {
        setNote({...note, [e.target.id]: e.target.value});
    }
  return (
    <div>
      <div className="justify-flex my-3">
        <h2 style={{marginTop: "50px"}}>Add a Note</h2>
        <form className="my-4">
          <div className="mb-3">
                <label htmlFor="title" className="form-label">
                Title
                </label>
                <input
                type="text"
                className="form-control"
                id="title"
                value={note.title}
                placeholder='"Enter atleast 2 character"'
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
                value={note.description}
                placeholder='"Enter atleast 5 character"'
                onChange={onChange}
                />
          </div> <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                Tag
                </label>
                <input
                type="text"
                className="form-control"
                id="tag"
                value={note.tag}
                placeholder='"Personal"'
                onChange={onChange}
                />
          </div>
          <button disabled={note.title.length<2 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
