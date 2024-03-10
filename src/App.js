// App.js

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Footer from './Component/Footer';
import Main from './Pages/Main';
import Navbar from './Component/Navbar';
import About from './Pages/About';
import AddPlot from './Component/AddPlot';
import ViewPlot from './Pages/ViewPlot';
import NotFound from './Component/NotFound';
import Profile from './Pages/Profile';
import Plots from './Pages/Plots';
import {AuthProvider} from "./Hooks/AuthContext";


function App() {


  return (
      <div className="App">
        <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/main" element={<Main />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/about/" element={<About />} />
            <Route path="/add-plot" element={<AddPlot />} />
            <Route path="/plots/:type" element={<Plots />} />
            <Route path="/viewplot/:id" element={<ViewPlot />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
      </div>
  );
}

export default App;
