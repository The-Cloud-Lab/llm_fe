
import  '../src/App.css';

import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/Auth/signin'
import TaskList from './pages/Tasks/Taskslist';
import Home from './pages/home/home'
import Modallist from './pages/modalsList/modallist'

function App() {
 

  return (
    <>
       <Routes>
       
         <Route path="/" element={<SignIn />} /> 
          {/* <Route path="TaskList" element={<TaskList />} /> */}
         <Route path="Home" element={<Home />} />
          <Route path="/Home/modalList" element={<Modallist />} />
          
       </Routes>
    </>

  )
}

export default App
