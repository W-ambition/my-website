import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Index from '../pages/Index'

const MyRouter = () => {
  return (
    <Router>
      <Route path="/login/" exact component={Login} />
      <Route path="/" exact component={Index} />
    </Router>
  )
}

export default MyRouter