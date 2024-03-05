//Styles
import { Button } from '@nextui-org/react'
import Nav from '../Components/Nav.jsx'

// Logic
import axios from 'axios'
import {Link} from 'react-router-dom'

const endpoint = "http://localhost:8000/api"

const Feed = () => {

  const logout = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${endpoint}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('token')
      window.location.href = "http://localhost:5173/"
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-screen'>
      <Nav />
    </div>
  )
}

export default Feed