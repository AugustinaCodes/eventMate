import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeSection, setActiveSection] = useState(
    currentPath.split("/").pop() || "events"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar activeSection={activeSection} onLogout={handleLogout} />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}
