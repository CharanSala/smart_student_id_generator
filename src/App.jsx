import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './Pages/Home';
import Dataform from './Pages/Dataform';
import Id_card from './Pages/Id_card';
import Older_cards from './Pages/older_cards';
import Navbar from './Pages/Navbar';

const App = () => {
  const [theme, setTheme] = useState("light");

  // Toggle function
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Update the HTML element's class so Tailwind dark mode works
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        {/* Pass toggleTheme and theme as props to Navbar */}
        <Navbar toggleTheme={toggleTheme} theme={theme} />
          <Routes>
            <Route path="/" element={<Home toggleTheme={toggleTheme} theme={theme} />} />
            <Route path="/dataform" element={<Dataform />} />
            <Route path="/idcard" element={<Id_card />} />
            <Route path="/oldercards" element={<Older_cards />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
