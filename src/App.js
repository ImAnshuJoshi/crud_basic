import './App.css';
import Login from './components/Login/Login.js';
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
} from "react-router-dom";
import Register from './components/Register/Register';
import Mainpage from './components/MainPage/Mainpage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <Routes>
      <Route path="/login/" element={<><Login/></>}/>
      <Route path="/" element={<Register/>}/>
      <Route path="/mainpage" element={<Mainpage/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
