import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";

// Authentication
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Question from "./Pages/Question";
import MyResults from "./Pages/MyResults";

// Layout
import Layout from "./Components/Layout";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>

          {/* Authentication */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes inside Layout */}
          <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="questions/:id" element={<Question />} />
            <Route path="my-results" element={<MyResults />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;