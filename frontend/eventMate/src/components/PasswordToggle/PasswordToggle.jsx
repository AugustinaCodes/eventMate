import styles from "./PasswordToggle.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordToggle({
  passwordVisible,
  togglePasswordVisibility,
  value,
  onChange,
}) {
  return (
    <div className={styles.passwordContainer}>
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder="Password"
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className={styles.eyeButton}
        onClick={togglePasswordVisibility}
      >
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}
