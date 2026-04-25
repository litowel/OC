import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Questionnaire from '@/pages/Questionnaire';
import Demo from '@/pages/Demo';
import Admin from '@/pages/Admin';
import Solutions from '@/pages/Solutions';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
