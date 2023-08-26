import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import NoteState from './context/NotesState';

function App() {
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert="This is an alert"/>
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  )
}
export default App;
