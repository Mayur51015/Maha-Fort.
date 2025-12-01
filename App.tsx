import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FortDetail from './pages/FortDetail';
import Directory from './pages/Directory';
import TreksMap from './pages/TreksMap';
import Resources from './pages/Resources';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <div className="print:hidden">
          <Navbar />
        </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/map" element={<TreksMap />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/fort/:id" element={<FortDetail />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </main>
        <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 print:hidden">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="mb-2">Sahyadri Forts Explorer © 2024</p>
            <p className="text-xs max-w-2xl mx-auto text-slate-500">
              Disclaimer: Trekking involves risk. Information provided here is for reference only. 
              Always check local weather, carry safety gear, and respect local customs. 
              Botany information is not a substitute for professional medical advice.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;