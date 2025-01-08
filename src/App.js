
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.tsx';
import FormPage from './components/FormPage/FormPage.tsx';
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
