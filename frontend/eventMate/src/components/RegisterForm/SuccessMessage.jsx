import styles from "./RegisterForm.module.scss";

export default function SuccessMessage({ countdown, navigate }) {
  return (
    <div className={styles.successMessage}>
      <h2>Registration Successful</h2>
      <p>You can now log in with your username and password.</p>
      <p>
        Redirecting back to the login page in <strong>{countdown}</strong>{" "}
        seconds...
      </p>
      <button onClick={() => navigate("/login")}>
        Go back to the login page now
      </button>
    </div>
  );
}
