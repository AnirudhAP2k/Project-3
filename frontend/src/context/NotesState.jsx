import React, { useState } from 'react'
import noteContext from './NoteContext';

const NoteState = (props) => {
        const Notes = [
          {
            "_id": "64e47fc1b5843b88ed7458f4",
            "user": "64e474156bb4990e5b6c6cfe",
            "title": "Anirudh Panwar jjdjjjddj ",
            "description": "Thi sd the gpt rthe po024234235 note",
            "tag": "General",
            "Date": "2023-08-22T09:28:33.987Z",
            "__v": 0
          },
          {
            "_id": "64e47fc2b5843b88ed7458f6",
            "user": "64e474156bb4990e5b6c6cfe",
            "title": "Anirudh Panwar jjdjjjddj ",
            "description": "Thi sd the gpt rthe po024234235 note",
            "tag": "General",
            "Date": "2023-08-22T09:28:34.145Z",
            "__v": 0
          },
          {
            "_id": "64e47fc2b5843b88ed7458fc",
            "user": "64e474156bb4990e5b6c6cfe",
            "title": "Anirudh Panwar jjdjjjddj ",
            "description": "Thi sd the gpt rthe po024234235 note",
            "tag": "General",
            "Date": "2023-08-22T09:28:34.593Z",
            "__v": 0
          },
          {
            "_id": "64e47fc2b5843b8889ed7458fe",
            "user": "64e474156bb4990e5b6c6cfe",
            "title": "Anirudh Panwar jjdjjjddj ",
            "description": "Thi sd the gpt rthe po024234235 note",
            "tag": "General",
            "Date": "2023-08-22T09:28:34.733Z",
            "__v": 0
          },
          {
            "_id": "64e47fc2b5843b81238ed7458fe",
            "user": "64e474156bb4990e5b6c6cfe",
            "title": "Anirudh Panwar jjdjjjddj ",
            "description": "Thi sd the gpt rthe po024234235 note",
            "tag": "General",
            "Date": "2023-08-22T09:28:34.733Z",
            "__v": 0
          },
          {
            "_id": "64e47fc2b5843b88e67d17458fe",
            "user": "64e474156bb4990e5b6c6cfe",
            "title": "Anirudh Panwar jjdjjjddj ",
            "description": "Thi sd the gpt rthe po024234235 note",
            "tag": "General",
            "Date": "2023-08-22T09:28:34.733Z",
            "__v": 0
          },
          {
            "_id": "64e47fc2b5843b88ed7458fe",
            "user": "64e474156bb4990e5b6c6cfe",
            "title": "Anirudh Panwar jjdjjjddj ",
            "description": "Thi sd the gpt rthe po024234235 note",
            "tag": "General",
            "Date": "2023-08-22T09:28:34.733Z",
            "__v": 0
          },
          {
            "_id": "64e47fc2b5843b88ed712458fe",
            "user": "64e474156bb4990e5b6c6cfe",
            "title": "Anirudh Panwar jjdjjjddj ",
            "description": "Thi sd the gpt rthe po024234235 note",
            "tag": "General",
            "Date": "2023-08-22T09:28:34.733Z",
            "__v": 0
          }
        ]
    const [notes, setNotes] = useState(Notes);

    //Add Note;
    const addNote = (title, description, tag) => {
      const note = {
        "_id": "64e47fc2b5843b88ed712458fe [ADDED]",
        "user": "64e474156bb4990e5b6c6cfe [ADDED]",
        "title": title,
        "description": description,
        "tag": tag,
        "Date": "2023-08-22T09:28:34.733Z",
        "__v": 0
      }
      setNotes(notes.concat(note));
    }

    //Edit Note;
    const editNote = (id, title, description, tag) => {
      
    }

    //Delete Note;
    const deleteNote = (id) => {
      console.log("Note deletion " + id);
      const newNotes = notes.filter((notes)=>{return notes._id !== id});
      setNotes(newNotes);
    }
    return (
        <noteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;