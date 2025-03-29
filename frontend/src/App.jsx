
import './App.css'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextEditor from './components/TextEditor';
import Home from './components/Home';
import { StoreContext } from './GlobalState/StoreContext';
import { useContext, useEffect } from "react";


function App() {
  const { setUser} = useContext(StoreContext);

  useEffect(()=>{
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      setUser(user)
  },[])

  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<TextEditor />} />
        
      </Routes>
    </Router>
  )
}

export default App
