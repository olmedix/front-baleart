import './App.css';

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



function App() {
  return (
    <Router className="bg-gray-100 min-h-screen">
      <Header/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/spaces" element={<Spaces/>}/>
        <Route path="/spaces/:id" element={<SpaceDetails />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Authentication />} />
        <Route path="/register" element={<Authentication />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate replace to="/home"/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
