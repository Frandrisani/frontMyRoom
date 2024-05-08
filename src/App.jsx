import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/custom/custom.scss";
import WelcomApp from "./components/WelcomApp";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomApp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
