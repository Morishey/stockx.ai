// import React from "react";
// import "./App.css";

// function App() {
//   return (
//     <div className="app">
//       {/* Header */}
//       <header className="header">
//         <h1 className="logo">StockX<span>.ai</span></h1>
//         <nav className="nav">
//           <a href="#">Home</a>
//           <a href="#">Markets</a>
//           <a href="#">Portfolio</a>
//           <a href="#">Account</a>
//         </nav>
//       </header>

//       {/* Main Section */}
//       <main className="hero">
//         <div className="hero-content">
//           <h2>Welcome to <span>StockX.ai</span></h2>
//           <p>Track, trade, and grow your wealth with AI-driven insights.</p>
//           <button className="glow-btn">Get Started</button>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import MyAccount from "./pages/MyAccount"; // make sure this path is correct

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="header">
          <h1 className="logo">
            StockX<span>.ai</span>
          </h1>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/markets">Markets</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/account">Account</Link> {/* 👈 Link instead of <a href> */}
          </nav>
        </header>

        {/* Main Section */}
        <main className="hero">
          <Routes>
            <Route
              path="/"
              element={
                <div className="hero-content">
                  <h2>
                    Welcome to <span>StockX.ai</span>
                  </h2>
                  <p>Track, trade, and grow your wealth with AI-driven insights.</p>
                  <button className="glow-btn">Get Started</button>
                </div>
              }
            />
            {/* 👇 This displays your MyAccount.jsx page */}
            <Route path="/account" element={<MyAccount />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
