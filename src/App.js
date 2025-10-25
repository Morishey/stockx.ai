// // App.jsx
// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import "./App.css";

// // Pages
// import MyAccount from "./pages/MyAccount";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AuthChoice from "./pages/AuthChoice";
// import Home from "./pages/Home";
// import LoadingScreen from "./pages/LoadingScreen";
// import SuccessTransition from "./pages/SuccessTransition";
// import AdminLogin from "./pages/AdminLogin";
// import AdminPanel from "./pages/AdminPanel";

// // Components
// import Header from "./components/Header";

// /* ---------- PAGE WRAPPER ---------- */
// function PageWrapper({ children }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.4, ease: "easeInOut" }}
//       style={{ width: "100%" }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// /* ---------- APP CONTENT ---------- */
// function AppContent() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingAction, setLoadingAction] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Restore login state
//   useEffect(() => {
//     const storedLogin = localStorage.getItem("isLoggedIn");
//     if (storedLogin === "true") setIsLoggedIn(true);
//   }, []);

//   // Save login state
//   useEffect(() => {
//     localStorage.setItem("isLoggedIn", isLoggedIn);
//   }, [isLoggedIn]);

//   /* ---------- LOGIN ---------- */
//   const handleLogin = () => {
//     const loginRestricted = localStorage.getItem("loginRestricted") === "true";
//     if (loginRestricted) {
//       alert("🚫 Logins are currently disabled by the Admin.");
//       return;
//     }

//     setLoadingAction("login");
//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoggedIn(true);
//       setIsLoading(false);
//       navigate("/account");
//     }, 2000);
//   };

//   /* ---------- LOGOUT ---------- */
//   const handleLogout = () => {
//     setLoadingAction("logout");
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoggedIn(false);
//       localStorage.removeItem("isLoggedIn");
//       setIsLoading(false);
//       navigate("/login");
//     }, 2000);
//   };

//   /* ---------- DISABLE SCROLL ON AUTH-LIKE PAGES ---------- */
//   useEffect(() => {
//     const noScrollPages = [
//       "/",
//       "/login",
//       "/register",
//       "/auth",
//       "/success",
//       "/admin-login",
//     ];
//     if (noScrollPages.includes(location.pathname)) {
//       document.body.classList.add("no-scroll");
//     } else {
//       document.body.classList.remove("no-scroll");
//     }
//   }, [location.pathname]);

//   /* ---------- SHOW LOADING SCREEN ---------- */
//   if (isLoading) {
//     let message = "Please wait...";
//     if (loadingAction === "login") message = "Preparing your dashboard...";
//     if (loadingAction === "logout") message = "Exiting dashboard...";
//     return <LoadingScreen message={message} />;
//   }

//   /* ---------- ROUTES ---------- */
//   return (
//     <>
//       {/* ✅ Hide Header on specific pages */}
//       {![
//         "/",
//         "/login",
//         "/register",
//         "/auth",
//         "/success",
//         "/admin-login",
//         "/admin/panel",
//       ].includes(location.pathname) && (
//         <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
//       )}

//       <AnimatePresence mode="wait">
//         <Routes location={location} key={location.pathname}>
//           {/* HOME PAGE */}
//           <Route
//             path="/"
//             element={
//               <PageWrapper>
//                 <Home />
//               </PageWrapper>
//             }
//           />

//           {/* AUTH CHOICE */}
//           <Route
//             path="/auth"
//             element={
//               <PageWrapper>
//                 <AuthChoice />
//               </PageWrapper>
//             }
//           />

//           {/* ACCOUNT PAGE */}
//           <Route
//             path="/account"
//             element={
//               <PageWrapper>
//                 <MyAccount />
//               </PageWrapper>
//             }
//           />

//           {/* LOGIN PAGE */}
//           <Route
//             path="/login"
//             element={
//               <PageWrapper>
//                 <Login onLogin={handleLogin} />
//               </PageWrapper>
//             }
//           />

//           {/* REGISTER PAGE */}
//           <Route
//             path="/register"
//             element={
//               <PageWrapper>
//                 <Register />
//               </PageWrapper>
//             }
//           />

//           {/* SUCCESS TRANSITION PAGE */}
//           <Route
//             path="/success"
//             element={
//               <PageWrapper>
//                 <SuccessTransition />
//               </PageWrapper>
//             }
//           />

//           {/* ADMIN LOGIN PAGE */}
//           <Route
//             path="/admin-login"
//             element={
//               <PageWrapper>
//                 <AdminLogin />
//               </PageWrapper>
//             }
//           />

//           {/* ✅ ADMIN PANEL PAGE */}
//           <Route
//             path="/admin/panel"
//             element={
//               <PageWrapper>
//                 <AdminPanel />
//               </PageWrapper>
//             }
//           />
//         </Routes>
//       </AnimatePresence>
//     </>
//   );
// }

// /* ---------- MAIN APP WRAPPER ---------- */
// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

// Pages
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthChoice from "./pages/AuthChoice";
import Home from "./pages/Home";
import LoadingScreen from "./pages/LoadingScreen";
import SuccessTransition from "./pages/SuccessTransition";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

// Components
import Header from "./components/Header";

/* ---------- PAGE WRAPPER ---------- */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- APP CONTENT ---------- */
function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Restore login states
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedAdmin = localStorage.getItem("isAdmin");
    if (storedLogin === "true") setIsLoggedIn(true);
    if (storedAdmin === "true") setIsAdmin(true);
  }, []);

  // Save login states
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("isAdmin", isAdmin);
  }, [isAdmin]);

  /* ---------- LOGIN ---------- */
  const handleLogin = () => {
    const loginRestricted = localStorage.getItem("loginRestricted") === "true";
    if (loginRestricted) {
      alert("🚫 Logins are currently disabled by the Admin.");
      return;
    }

    setLoadingAction("login");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
      navigate("/account");
    }, 2000);
  };

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    setLoadingAction("logout");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      setIsLoading(false);
      navigate("/login");
    }, 2000);
  };

  /* ---------- DISABLE SCROLL ---------- */
  useEffect(() => {
    const noScrollPages = [
      "/",
      "/login",
      "/register",
      "/auth",
      "/success",
      "/admin-login",
    ];
    if (noScrollPages.includes(location.pathname)) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [location.pathname]);

  /* ---------- LOADING SCREEN ---------- */
  if (isLoading) {
    let message = "Please wait...";
    if (loadingAction === "login") message = "Preparing your dashboard...";
    if (loadingAction === "logout") message = "Exiting dashboard...";
    return <LoadingScreen message={message} />;
  }

  /* ---------- ROUTES ---------- */
  return (
    <>
      {![
        "/",
        "/login",
        "/register",
        "/auth",
        "/success",
        "/admin-login",
        "/admin",
        "/admin/panel",
      ].includes(location.pathname) && (
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* HOME */}
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />

          {/* AUTH CHOICE */}
          <Route
            path="/auth"
            element={
              <PageWrapper>
                <AuthChoice />
              </PageWrapper>
            }
          />

          {/* ACCOUNT */}
          <Route
            path="/account"
            element={
              <PageWrapper>
                <MyAccount />
              </PageWrapper>
            }
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login onLogin={handleLogin} />
              </PageWrapper>
            }
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={
              <PageWrapper>
                <Register />
              </PageWrapper>
            }
          />

          {/* SUCCESS */}
          <Route
            path="/success"
            element={
              <PageWrapper>
                <SuccessTransition />
              </PageWrapper>
            }
          />

          {/* ADMIN LOGIN */}
          <Route
            path="/admin-login"
            element={
              <PageWrapper>
                <AdminLogin setIsAdmin={setIsAdmin} />
              </PageWrapper>
            }
          />

          {/* ✅ ADMIN PANEL (Protected) */}
          <Route
            path="/admin/panel"
            element={
              isAdmin ? (
                <PageWrapper>
                  <AdminPanel setIsAdmin={setIsAdmin} />
                </PageWrapper>
              ) : (
                <Navigate to="/admin-login" replace />
              )
            }
          />

          {/* Redirect /admin → /admin-login */}
          <Route path="/admin" element={<Navigate to="/admin-login" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

/* ---------- MAIN APP WRAPPER ---------- */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
