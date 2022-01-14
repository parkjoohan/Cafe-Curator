import React from 'react'
import {Switch, Route} from 'react-router-dom'

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

export default function Routers() {
  return (
    <Switch>
      <Route path="/login" component={LoginForm}></Route>
      <Route path="/signup" component={SignupForm}></Route>
    </Switch>
  )
}
