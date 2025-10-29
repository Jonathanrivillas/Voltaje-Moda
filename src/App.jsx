import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Hero from './components/Hero'
import FeaturedOffers from './components/FeaturedOffers'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Top from './pages/Top'
import Lower from './pages/Lower'
import Sets from './pages/Sets'
import Dresses from './pages/Dresses'
import OnePiece from './pages/OnePiece'
import AdminPanel from './components/AdminPanel'

// Componente separado para el contenido que usa useAuth
function AppContent() {
  return (
    <>
      <Banner />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturedOffers />
              <Newsletter />
            </>
          }
        />
        <Route path="/top" element={<Top />} />
        <Route path="/lower" element={<Lower />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/dresses" element={<Dresses />} />
        <Route path="/onepiece" element={<OnePiece />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App