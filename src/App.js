import React from 'react'
import StartQuiz from './components/StartQuiz'
import Quiz from './components/Quiz';
import {
  Routes,
  Route
} from "react-router-dom";
function App() {

  return (
    <div className="App">
   
      <Routes>
          <Route path = '' element = {<StartQuiz/>} />
          <Route path = "/quiz" element = {<Quiz/>} />
      </Routes>
    </div>
  );
}

export default App;
