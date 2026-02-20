import { Routes, Route, Link } from "react-router-dom";
// import "./styles/App.css";

import { AuthProvider } from "./context/AuthContext";
import AuthGuard, { GuestGuard } from "./components/AuthGuard/AuthGuard";

import MainPage from "./pages/HomePage";
import Navigation from "./components/Navigation/Navigation";
import Contributor from "./pages/Contributor/Contributor";
import Requester from "./pages/Requester/Requester";
import TaskBrowser from "./pages/TaskBrowser/TaskBrowser";
import MatchingPage from "./pages/MatchingPage/MatchingPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";

//Main application component that sets up routing and authentication context for the app

export default function App() {
  return (
    <AuthProvider>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          } />
          <Route path="/register" element={
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          } />
          <Route path="/contributor" element={
            <AuthGuard>
              <Contributor />
            </AuthGuard>
          } />
          <Route path="/requester" element={
            <AuthGuard>
              <Requester />
            </AuthGuard>
          } />
          <Route path="/taskbrowser" element={<TaskBrowser />} />
          <Route path="/matching" element={
            <AuthGuard>
              <MatchingPage />
            </AuthGuard>
          } />

          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
