import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/custom/custom.scss";
import WelcomApp from "./components/WelcomApp";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import HomePage from "./components/HomePage";
import CardHome from "./components/CardHome";
import ApartmentPage from "./components/ApartmentPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomApp />} />
        <Route path="/apartment/:id" element={<ApartmentPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/card" element={<CardHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
