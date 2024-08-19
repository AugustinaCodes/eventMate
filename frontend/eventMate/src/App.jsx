import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Events from "./components/Events/Events";
import Attendees from "./components/Attendees/Attendees";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Route>
      <Route path="/main" element={<Dashboard />}>
        <Route path="events" element={<Events />} />
        <Route path="attendees" element={<Attendees />} />
      </Route>
    </Routes>
  );
}

export default App;
