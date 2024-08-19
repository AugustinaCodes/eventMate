import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";

export default function Sidebar({ activeSection, onLogout }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.userSection}>
        <h2>EventMate</h2>
        <button onClick={onLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
      <div className={styles.navButtons}>
        <Link to="/main/events">
          <button className={activeSection === "events" ? styles.active : ""}>
            Events
          </button>
        </Link>
        <Link to="/main/attendees">
          <button
            className={activeSection === "attendees" ? styles.active : ""}
          >
            Event Attendees
          </button>
        </Link>
      </div>
    </div>
  );
}
