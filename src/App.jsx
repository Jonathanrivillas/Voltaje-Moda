import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Hero from './components/Hero'
import FeaturedOffers from './components/FeaturedOffers'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import New from './pages/New'
import Top from './pages/Top'
import Lower from './pages/Lower'
import Sets from './pages/Sets'
import Dresses from './pages/Dresses'
import OnePiece from './pages/OnePiece'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import ProductList from './components/ProductList'

function App() {
  return (
    <AuthProvider>
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
        <Route path="/new" element={<New />} />
        <Route path="/top" element={<Top />} />
        <Route path="/lower" element={<Lower />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/dresses" element={<Dresses />} />
        <Route path="/onepiece" element={<OnePiece />} />
        
        {/* Nuevas rutas de autenticación y productos */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/productos" element={<ProductList />} />
      </Routes>
      <Footer />
    </AuthProvider>
  )
}

export default App