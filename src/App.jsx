import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Soon from './components/soon.jsx';
import Styles from './styles/App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/soon" element={<Soon />} />
      </Routes>
      <div id="custom-cursor"></div>
    </Router>
  );
}

export default App;