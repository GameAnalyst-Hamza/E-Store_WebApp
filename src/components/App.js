import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Dashboard from "./Dashboard"
import Home from "./Home"
import AddProduct from "../components/AddProduct"
import Inventory from "./Inventory"
import Orders from "./Orders"

import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

function App() {
  return (
    // <Container
    //   className="d-flex align-items-center justify-content-center"
    //   style={{ minHeight: "100vh" , minWidth:"100vw"}}
    // >
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/inventory" component={Inventory} />
            <PrivateRoute path="/add-product" component={AddProduct} />
            <PrivateRoute path="/orders" component={Orders} />

            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
    // </Container>
  )
}

export default App