import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import PieChart from './containers/Graph'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <Navbar />
          <PieChart/>
    </div>
  );
}

export default App;
