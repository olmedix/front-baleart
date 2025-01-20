import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { SpacesProvider } from './contexts/SpacesContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { FiltersProvider } from './contexts/FiltersContext';
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
import ForgotPassword from './pages/ForgotPassword';
import Authentication from './pages/Authentication';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';




function App() {

  return (
    <SpacesProvider>

    <AuthProvider>
    <LanguageProvider>
      
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<Authentication />} />
      
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
        <Route path="/forgot-password" element={
         
            <ForgotPassword />
          
          }/>
        <Route path="*" element={
          <PrivateRoute>
            <Navigate replace to="/home"/>
          </PrivateRoute>
          }/>
      </Routes>
      <Footer/>
    </Router>
    
    </LanguageProvider>
    </AuthProvider>
    
    </SpacesProvider>
  )
}

export default App
