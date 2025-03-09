import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/hero';
import VsComputer from './pages/vs-computer';
import RandomOpponent from './pages/random-opponents';
import CreateRoom from './pages/create-room';
import JoinRoom from './pages/join-room';
import NotFound from './pages/not-found';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/vs-computer' element={<VsComputer/>} />
        <Route path='/random-opponent' element={<RandomOpponent/>} />
        <Route path='/create-room' element={<CreateRoom/>} />
        <Route path='/join-room' element={<JoinRoom/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
  );
}

export default App;
