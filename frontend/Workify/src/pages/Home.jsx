import React from 'react'
import Herosection from '../components/Herosection'
import Midsection from '../components/Midsection'
import Cardsection from '../components/Cardsection'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import IntroPage from '../components/IntroPage'

const Home = () => {
  return (
    <div>

    <IntroPage />
    <Herosection />
    <Midsection />
    <Cardsection />
    <Footer />
    </div>
  )
}

export default Home