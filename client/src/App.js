import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import User from "./components/routes/User";
import Admin from "./components/routes/Admin";
import NotFound from "./components/NotFound";

function App() {
  const UserRoutes = User();
  const AdminRoutes = Admin();
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container">
          <Routes>
            {UserRoutes}
            {AdminRoutes}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
