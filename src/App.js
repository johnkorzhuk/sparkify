import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./components/pages/Home"
import LoginPage from "./containers/LoginPage"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={LoginPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
