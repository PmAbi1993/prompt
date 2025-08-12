import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import { useToast } from './components/Toast';
import { Dashboard } from './pages/Dashboard';
import { Builder } from './pages/Builder';
import { About } from './pages/About';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

function AppContent() {
  const { ToastContainer } = useToast();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/builder/:id" element={<Builder />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
