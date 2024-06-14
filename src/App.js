import './App.css';
import About from '../src/Pages/About/index';
import Home from '../src/Pages/Home/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Protected from './Components/Protected';
import Profile from './Pages/Profile';
import Navbar from '../src/Components/Layout/Header/index';
import Vscode from './Components/Vscode';
import DynmiceTable from './Components/DynmiceTable';
import Kanban from './Components/Todolist/kanban';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/vscode' element={<Vscode/>}/>
          <Route path='/dynmicetable' element={<DynmiceTable/>}/>
          <Route path='/kanban' element={<Kanban/>}/>



          <Route
          path="/profile"
          element={
              <Profile />
          }
        />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
