import './App.css'
import Home from '../src/component/Home'
import Form from '../src/component/Form'
import { Link , Routes, Route } from 'react-router-dom';
import kalvium from "./assets/K.png"
import { useState } from 'react';

  

function App() {


  const [value , setValue] = useState('')

  const handleChange = (e) => {
    let changedData = e.target.value
    setValue(changedData)
    console.log(value)
  }

  return (
    
    <div className="App">
      <div className='navBar'>
                <img src={kalvium} alt="" />
                <input value={value} onChange={handleChange} placeholder='Search Book' type="text" />

                <div className='rightDiv'>

                  <Link style={{color: "black" , marginRight:"3vw", textDecoration: "none"}} to="/">Home</Link>
                  <Link style={{color: "black" ,textDecoration: "none"}} to="/form">Register</Link>

                </div>
                
            </div>
      <Routes>
        <Route path="/" element={<Home searchInput={value} />} />
        <Route path="*" element={<Home searchInput={value} />} />
        <Route path="/form" element={<Form />} />


      </Routes>
    </div>
  )
}

export default App
