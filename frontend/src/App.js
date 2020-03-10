import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; //Forma de importar Bootstrap
import './App.css';

import Navigation from './components/Navigation'
import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'
import NoteList from './components/NoteList'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="container p-4">
          <Route path="/" exact component={NoteList}></Route>
          <Route path="/edit/:id" component={CreateNote}></Route>
          <Route path="/createnote" component={CreateNote}></Route>
          <Route path="/createuser" component={CreateUser}></Route>
        </div>
      </div>
    </Router>
  );
}

export default App;
