import logo from './logo.svg';
import './App.css';
import UserInput from './userInputComponent/input.js';
import Saved from './savedPage/saved.js';
import {Route, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<UserInput/>}/>
        <Route path="/save" element={<Saved/>}/>
      </Routes>
      {/* <UserInput/> */}
    </div>
  );
}

export default App;
