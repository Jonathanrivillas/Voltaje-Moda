import './App.css'
import { Routes, Route } from 'react-router-dom'
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


function App() {
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
        <Route path="/new" element={<New />} />
        <Route path="/top" element={<Top />} />
        <Route path="/lower" element={<Lower />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/dresses" element={<Dresses />} />
        <Route path="/onepiece" element={<OnePiece />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App