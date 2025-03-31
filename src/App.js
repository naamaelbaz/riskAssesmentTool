
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/Pages/HomePage/HomePage.tsx'
import FormPage from '../src/Pages/FormPage/FormPage.tsx';
function App() {
  return (
    <div>  
      <Router>
      <nav>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/form" element={<FormPage />} />
     
      </Routes>
    </Router>



     
    </div>
  );
}

export default App;
