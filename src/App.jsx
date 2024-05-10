import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/custom/custom.scss";
import WelcomApp from "./components/WelcomApp";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import HomePage from "./components/HomePage";
import CreateAd from "./components/CreateAd";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomApp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/new-ad" element={<CreateAd />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
