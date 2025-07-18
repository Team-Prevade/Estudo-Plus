import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Disciplinas from './pages/Disciplinas';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth'; 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path='/home' element={<RequireAuth page={<Home/>}/>} />
          <Route path="/disciplinas" element={<RequireAuth page={<Disciplinas />}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
