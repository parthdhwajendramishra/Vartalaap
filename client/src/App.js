// import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './components/Contact';
import About from './components/About';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';



// import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

function App() {
  const { token } = useSelector(state => state.auth)
  return (
    <BrowserRouter>
      {/* <Layout/> */}
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route  path="login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route exact path='/about' element={< About />}></Route>
        <Route exact path='/contact' element={< Contact />}></Route>
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
      </Routes>
      
    </BrowserRouter >

  );
}

export default App;
