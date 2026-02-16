import { Routes, Route, Link } from "react-router-dom";
// import "./styles/App.css";

import MainPage from "./pages/HomePage";
import Navigation from "./components/Navigation/Navigation";
import Contributor from "./pages/Contributor/Contributor";
import Requester from "./pages/Requester/Requester";
import TaskBrowser from "./pages/TaskBrowser/TaskBrowser";
import MatchingPage from "./pages/MatchingPage/MatchingPage";

export default function App() {
  return (
    <div>
<Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/contributor" element={<Contributor />} />
        <Route path="/requester" element={<Requester />} />
        <Route path="/taskbrowser" element={<TaskBrowser />} />
        <Route path='/matching' element={<MatchingPage />} />

        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </div>
  );
}
