import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListCard } from './components/List-card/ListCard';
import AddCard from './components/Add-card/AddCard';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import SingleCard from './components/Card/SingleCard';
import NoCard from './components/None/NoCard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ListCard />} />
          <Route path="/add" element={<AddCard />} />
          {/* <Route path="/update" element={<UpdateCard />} /> */}
          <Route path="/card/:id" element={<SingleCard />} />
          <Route path="/empty" element={<NoCard />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
