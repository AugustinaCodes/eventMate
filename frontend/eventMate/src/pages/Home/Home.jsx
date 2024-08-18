import styles from "./Home.module.scss";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  function handleButtonClick(formType) {
    navigate(`/${formType}`);
  }

  const isHomePage = currentPath === "/";

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <FaRegCalendarAlt className={styles.icon} />
        <h1 className={styles.companyName}>EventMate</h1>
        <p className={styles.slogan}>
          Bringing People Together, One Event at a Time
        </p>
      </div>
      <div className={styles.rightPane}>
        {isHomePage && (
          <div className={styles.buttons}>
            <button
              onClick={() => handleButtonClick("register")}
              className={styles.button}
            >
              Register
            </button>
            <button
              onClick={() => handleButtonClick("login")}
              className={styles.button}
            >
              Login
            </button>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}
