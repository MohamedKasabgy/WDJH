import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Directory from './pages/Directory';
import Matching from './pages/Matching';
import Overview from './pages/Overview';
import Sectors from './pages/Sectors';
import About from './pages/About';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <div dir="rtl" lang="ar" className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/matching" element={<Matching />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
