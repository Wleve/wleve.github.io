import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Soon from './components/soon.jsx';
import Styles from './styles/App.css'; 

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/portfolio" element={<Home />} />
        <Route path="/soon" element={<Soon />} />
      </Routes>
      <div id="custom-cursor"></div>
    </HashRouter>
  );
}

export default App;