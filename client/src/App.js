import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';

import Container from 'react-bootstrap/Container';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";


function App() {

  const { token } = useSelector(state => state.auth)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
          
        </Route>
        {/* <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<h1>Error 404 Page not found !!</h1>} /> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
