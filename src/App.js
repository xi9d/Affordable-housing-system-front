import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Footer from "./Component/Footer";
import Plots from "./Pages/Plots";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route index element={<LandingPage/>}/>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/plots" element={<Plots/>}/>
      <Route path="*" element={<h1 className="max-w-full mx-auto max-y-full my-auto px-6 py-6 text-lg text-red-500">Not Found </h1>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  );
}
export default App;
