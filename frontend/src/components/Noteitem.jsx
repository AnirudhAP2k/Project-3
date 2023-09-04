import React, { useContext, useState } from "react";
import noteContext from "../context/NoteContext";
import editImg from "../edit.png";
import delImg from "../delete.png";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, editNote, showAlert } = context;
  const { note } = props;

  const [notes, setNotes] = useState(note);

  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div
        className="modal fade"
        id={`exampleModaledit-${note._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModaleditLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={notes.title}
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
                  name="description"
                  value={notes.description}
                  onChange={onChange}
                />
              </div>{" "}
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="tag"
                  value={notes.tag}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
              disabled={note.title.length === notes.title.length && note.description.length === notes.description.length}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  editNote(note._id, notes.title, notes.description, notes.tag);
                  showAlert("Note Updated Successfully", "success");
                }}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-md-3 my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-dark"
            style={{ left: "50%" }}
          >
            {note.tag}
          </span>
            <div className="container">
              <img
                className="mx-1"
                src={delImg}
                alt=""
                height="25px"
                onClick={() => {deleteNote(note._id); showAlert("Note Deleted Successfully", "success"); }}
              />
              <img
                className="mx-1"
                src={editImg}
                alt=""
                height="20px"
                data-bs-toggle="modal"
                data-bs-target={`#exampleModaledit-${note._id}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
