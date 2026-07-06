import React,{useState} from 'react'
import { useGoogleLogin} from '@react-oauth/google';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './header.css'
import fincopbrand from '../../assets/fincorpbrand.png'
import LoginModal from '../modals/LoginModal.jsx'
import config from '../../config.js';
import {  toast } from 'react-toastify';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loginLoader, setLoginLoader] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const facebookLogin=()=>{

  }
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        // setLoginLoader(true)
        // const loginToast = toast.loading('Authenticating with Google...');
        const response = await axios.post(`${config.apiUrl}/auth/login`, {
          code: codeResponse.code,
          roles: "admin",
        });
        setUser(response.data.user)
        // setLoginLoader(false)
        toast.success('Welcome back, Admin!');
        console.log(response.data.user)
        
      } catch (error) {
       
       const message = error.response?.data?.message || "Login failed";
       toast.error(message);
        // setLoginLoader(false)
        // console.log(error.response.message);
      }
    },
    onError: (error) => { console.log('Login Failed:')},
    flow: "auth-code",
  });
  const handleSocialLogin = (provider) => {
    // Handle social login logic here
    console.log(`Logging in with ${provider}`);
    setShowLoginModal(false);
    if(provider ==="Google"){
      googleLogin()
    }
     else if(provider ==="Facebbok"){
      facebookLogin()
    }
    
    // Example: You would typically call your backend API here
    // For demonstration, we'll set a mock user
    
    // setTimeout(() => {
    //   setUser({
    //     name: `${provider} User`,
    //     email: 'user@example.com',
    //     avatar: `https://ui-avatars.com/api/?name=${provider}+User`
    //   });
    //   setShowLoginModal(false);
    // }, 1000);
  };
  const handleLogout = () => {
    setUser(null);
  };
  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo">
            <img src={fincopbrand}/>
          </div>
          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/services" className="nav-link">Services</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
            <NavLink to="/blogs" className="nav-link">Blogs</NavLink>
            <NavLink to="/agent/dashboard" className="nav-link agent-nav-link">Agent Portal</NavLink>
          </nav>
          {/* Auth Section */}
          <div className="auth-section">
            {user ? (
              <div className="user-menu">
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="user-avatar"
                />
                <span className="user-name">{user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)} 
                className="login-btn bg-red-100"
                disabled={loginLoader}
              >
                {loginLoader?"Loading....":"Login"}
              </button>
            )}
          </div>
          {/* Mobile Menu Toggle */}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>
      </header>
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onSocialLogin={handleSocialLogin}
        />
      )}
    </>
  );
};

export default Header;