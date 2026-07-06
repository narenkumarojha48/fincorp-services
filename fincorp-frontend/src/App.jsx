// imports from libraries
import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import css files
import './App.css'
// imports of application components
import Layout from './pages/Layout'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import Homepage from './pages/home/Homepage'
import  PrivacyPolicy   from './pages/PrivacyPolicy'
import Terms from "./pages/Terms";
import DSADisclosure from "./pages/DSADisclosure";
import Grievance from "./pages/Grievance";
import Services from './pages/services/Services'
import Blogs from './pages/blogs/Blogs'
import BlogDetail from './pages/blogs/BlogDetail'

// agent imports
import AgentLogin from './pages/agents/AgentLogin'
import AgentRegister from './pages/agents/AgentRegister'
import AgentDashboard from './pages/agents/AgentDashboard'
import AgentProfile from './pages/agents/AgentProfile'
import AgentLayout from './components/agent/AgentLayout'
import PrivateRoute from './components/agent/PrivateRoute'



function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Homepage/>} />
            <Route path='about' element={<About/>}/>
            <Route path='services' element={<Services/>}/>
            <Route path='contact' element={<Contact/>}/>
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="dsa-disclosure" element={<DSADisclosure />} />
            <Route path="grievance" element={<Grievance />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id" element={<BlogDetail />} />
            <Route path="agent/login" element={<AgentLogin />} />
            <Route path="agent/register" element={<AgentRegister />} />
          </Route>

          {/* Agent Dashboard Routes (no main header, uses AgentLayout sidebar) */}
          <Route path="/agent" element={<PrivateRoute><AgentLayout /></PrivateRoute>}>
            <Route index element={<AgentDashboard />} />
            <Route path="dashboard" element={<AgentDashboard />} />
            <Route path="profile" element={<AgentProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
