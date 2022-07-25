import './App.css';
import AllAuthors from './components/AllAuthors';
import CreateAuthor from './components/CreateAuthor';
import {Routes, Route, Link} from 'react-router-dom';
import { useState } from 'react';
import EditAuthor from './components/EditAuthor';


function App() {

  let [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="App container mt-3">
      <h1>Favorite Authors</h1>
      <Routes>

        <Route exact path="/" element={<AllAuthors formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} />} />

        <Route exact path="/new" element={<CreateAuthor formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}/>} />

        <Route exact path="/:_id" element={<EditAuthor />} />

      </Routes>
    </div>
  );
}

export default App;
