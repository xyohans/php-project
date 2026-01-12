import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import Services from "./pages/Service";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const logoutOnRefresh = async () => {
      // Only logout if page reload (F5 or refresh)
      if (performance.navigation.type === 1) {
        await fetch("http://localhost/project/backend/logout.php", {
          credentials: "include",
        });
      }
      setInitialized(true);
    };
    logoutOnRefresh();
  }, []);

  if (!initialized) return null; // prevent routes from rendering until logout check

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
