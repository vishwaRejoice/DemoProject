import './App.css';
import About from '../src/Pages/About/index';
import Home from '../src/Pages/Home/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Protected from './Components/Protected';
import Profile from './Pages/Profile';
import Navbar from './Components/Header/Navbar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
