
import './App.css'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextEditor from './components/TextEditor';
import Home from './components/Home';

function App() {
  


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
