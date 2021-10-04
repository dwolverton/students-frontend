import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import StudentList from './components/StudentList';
import StudentsForYearList from './components/StudentsForYearList';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <h1>Students API Demo</h1>
        <nav className="App__nav">
          <ul>
            <li><NavLink to="/">All Students</NavLink></li>
            <li><NavLink to="/year/1">First Year Students</NavLink></li>
            <li><NavLink to="/year/2">Second Year Students</NavLink></li>
            <li><NavLink to="/year/3">Third Year Students</NavLink></li>
            <li><NavLink to="/year/4">Fourth Year Students</NavLink></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/year/:year">
            Year goes here..
            <StudentsForYearList />
          </Route>
          <Route path="/">
            <StudentList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;