import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import axios from 'axios'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import './App.css'

const App = () => (
  <>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  </>
)

export default App
