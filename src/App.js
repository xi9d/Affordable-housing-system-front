import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Footer from "./Component/Footer";

import Main from "./Pages/Main";
import Navbar from "./Component/Navbar";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route index element={<LandingPage/>}/>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/main" element={<Main/>}/>
      <Route path="/landing" element={<LandingPage/>}/>
      <Route path="*" element={<h1 className="max-w-full mx-auto max-y-full my-auto px-6 py-6 text-lg text-red-500">Not Found </h1>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  );
}
export default App;
