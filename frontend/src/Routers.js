import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/common/Home';
import EmailForm from "./components/user/EmailForm";
import LoginForm from "./components/user/LoginForm";
import SignupForm from "./components/user/SignupForm";
import TermsModal from './components/user/TermsModal';
import BookMarkPrint from './components/feed/bookMark/BookMarkPrint';
import LikePrint from './components/feed/like/LikePrint';
import Detail from './components/feed/article/Detail'
import Mainfeed from './components/feed/main/Mainfeed';
import Mainfeed2 from './components/feed/main/MainFeed2';
import Mainfeed3 from './components/feed/search/Mainfeed3';
import userProfile from './components/user/userProfile'
import StoreProfile from './components/store/StoreProfile';
//  searchtest용입니다. 테스트 끝나면 지울거임
import Search from './components/feed/article/Search'
import PopularSearch from './components/feed/search/PopularSearch'
import RecentSearch from './components/feed/search/RecentSearch'
import LocationSearch from './components/feed/search/LocationSearch'
import CafeSearch from './components/feed/search/CafeSearch'
import AccountSearch from './components/feed/search/AccountSearch'

export default function Routers(props) {
  return (
    <Switch>
      <Route exact path="/"><Home user={props.user}/></Route>
      <Route path="/login"><LoginForm setUser={props.setUser}/></Route>
      <Route path="/email" component={EmailForm}></Route>
      <Route path="/signup" component={SignupForm}></Route>
      <Route exact path="/feed"><Mainfeed setFootershow={props.setFootershow}/></Route>
      <Route exact path="/feed2"><Mainfeed2 setFootershow={props.setFootershow}/></Route>
      <Route exact path="/feed3"><Mainfeed3 setFootershow={props.setFootershow}/></Route>
      <Route path="/bookmark" component={BookMarkPrint}></Route>
      <Route path="/like" component={LikePrint}></Route>
      <Route path="/article/:pk" component={Detail}></Route>
      <Route path="/profile/:pk" component = {userProfile}></Route>
      <Route path="/store/:pk" component = {StoreProfile}></Route>
      <Route path="/termmodal" component = {TermsModal}></Route>
      {/* searchtest용입니다. 테스트 끝나면 지울거임 */}
      <Route path="/search" component = {Mainfeed3}></Route>
      <Route path="/popularsearch" component = {PopularSearch}></Route>
      <Route path="/recentsearch" component = {RecentSearch}></Route>
      <Route path="/locationsearch" component = {LocationSearch}></Route>
      <Route path="/cafesearch" component = {CafeSearch}></Route>
      <Route path="/accountsearch" component = {AccountSearch}></Route>
    </Switch>
  )
}
