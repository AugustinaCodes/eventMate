import { useState } from "react";
import styles from "./Home.module.scss";
import { FaRegCalendarAlt } from "react-icons/fa";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  function handleButtonClick(formType) {
    setShowForm(formType);
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <FaRegCalendarAlt className={styles.icon} />
        <h1 className={styles.companyName}>Eventmate</h1>
        <p className={styles.slogan}>
          Bringing People Together, One Event at a Time
        </p>
      </div>
      <div className={styles.rightPane}>
        {!showForm && (
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
        {showForm === "register" && <RegisterForm />}
        {showForm === "login" && <LoginForm />}
      </div>
    </div>
  );
}
