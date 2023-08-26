import React, { useContext, useEffect } from 'react';
import noteContext from '../context/NoteContext';

function About() {
  const a = useContext(noteContext);
  useEffect(()=>{
    a.update();
  })

  return (
    <div>
      This is about {a.state.name} and is at class {a.state.class};
    </div>
  )
}

export default About
