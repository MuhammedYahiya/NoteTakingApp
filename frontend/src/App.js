import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screen/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screen/MyNotes/Notes"
import LoginScreen from "./screen/LoginScreen/Login";
import RegisterScreen from "./screen/RegisterPage/SignUp";
import CreateNote from "./screen/CreateNote/createNote";
import SingleNote from "./screen/SingleNote/SingleNote";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="mynotes/createnote" element={<CreateNote />} />
        <Route path="/note/:id" element={<SingleNote />} />
        <Route path="/mynotes" element={<MyNotes />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;

