import './App.css';
import { useState } from 'react';

//components
import Header from './components/Header';
import Footer from './components/Footers';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

//pages
import Home from './pages/Home';
import Spaces from './pages/Spaces';
import SpaceDetails from './pages/SpaceDetails';
import Comments from './pages/Comments';
import Contact from './pages/Contact';
import Authentication from './pages/Authentication';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';



function App() {

  const [user, setUser] = useState(null);



  return (
    <Router>
      <Header setUser={setUser}/>
      <Routes>
        <Route path="/login" element={<Authentication user={user} setUser={setUser} />} />
        <Route path="/register" element={<Authentication />} />

        <Route path="/home" element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
          }/>
        <Route path="/spaces" element={
          <PrivateRoute>
            <Spaces/>
          </PrivateRoute>
          }/>
        <Route path="/spaces/:id" element={
          <PrivateRoute>
            <SpaceDetails />
          </PrivateRoute>
          }/>
        <Route path="/comments" element={
          <PrivateRoute>
            <Comments />
          </PrivateRoute>
          }/>
        <Route path="/contact" element={
          <PrivateRoute>
            <Contact/>
          </PrivateRoute>
          }/> 
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
          }/>
        <Route path="*" element={
          <PrivateRoute>
            <Navigate replace to="/home"/>
          </PrivateRoute>
          }/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
