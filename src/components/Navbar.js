import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Register from './Register'
import Demo from '../Demo'
import './Navbar.css'

function Navbar() {
  const owner='Naveen'
  const offers='Affortable Prizes'
  return (
    <div>
    <div className='nav-bar'>
      <Link to="/" id='nav'>HOMIEEE</Link>
      <Link to='/about' id='nav'>ABOUTIIEEE</Link>
      <Link to='/register' id='nav'>REGISTER</Link>
      </div>
      <Routes>
          <Route path='/' element={<Home name1={owner} />}></Route>
          <Route path='/about' element={<About weboffers={offers}/>}></Route>
          <Route path='/register' element={<Demo/>}/>
      </Routes>

    
    </div>
  )
}

export default Navbar