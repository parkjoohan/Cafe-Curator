import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/common/Home';
import LoginForm from "./components/user/LoginForm";
import SignupForm from "./components/user/SignupForm";
import Feed from './components/feed/Feed';
import SkeletonPrint from './components/feed/SkeletonPrint';
import BookMarkPrint from './components/feed/BookMarkPrint';
import Detail from './components/feed/article/Detail'
import Mainfeed from './components/feed/Mainfeed';
import userProfile from './components/user/userProfile'
import StoreProfile from './components/store/StoreProfile';

export default function Routers(props) {
  return (
    <Switch>
      <Route exact path="/"><Home user={props.user}/></Route>
      <Route path="/login"><LoginForm setUser={props.setUser}/></Route>
      <Route path="/signup" component={SignupForm}></Route>
      <Route exact path="/feed"><Mainfeed setFootershow={props.setFootershow}/></Route>
      <Route path="/feed/bookmark" component={BookMarkPrint}></Route>
      <Route path="/article/:pk" component={Detail}></Route>
      <Route path="/profile/:pk" component = {userProfile}></Route>
      <Route path="/store/:pk" component = {StoreProfile}></Route>
    </Switch>
  )
}
