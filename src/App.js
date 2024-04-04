import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Footer from './Component/Footer';
import Main from './Pages/Main';
import Navbar from './Component/Navbar';
import About from './Pages/About';
import AddPlot from './Pages/AddPlot';
import NotFound from './Component/NotFound';
import Profile from './Pages/Profile';
import AdminDashboard from "./Pages/AdminDashboard";
import {AuthProvider} from "./Hooks/AuthContext";
import ViewPlot from "./Pages/ViewPlot";
import ViewPlotOwner from "./Pages/ViewPlotOwner";
import Plots from "./Pages/Plots";
import {ControllerProvider} from"./Hooks/ControllerProvider"
import Contact from "./Pages/Contact";
import Availability from "./Pages/Availability";



function App() {
  return (
      <div className="App">
          <ControllerProvider>
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
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/addPlot" element={<AddPlot/>}/>
            <Route path="/plots/room-type" element={<Plots/>}/>
            <Route path="/dashboard" element={<AdminDashboard/>}/>
            <Route path="/view-plot" element={<ViewPlot/>}/>
              <Route path="/available/set" element={<Availability/>}/>
            <Route path="/view-plot-owner" element={<ViewPlotOwner/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
          </ControllerProvider>
      </div>
  );
}

export default App;
