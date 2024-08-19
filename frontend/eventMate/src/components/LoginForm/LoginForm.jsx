import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const body = { username, password };

    try {
      const response = await axios.post(`${API_URL}/login`, body);
      localStorage.setItem("token", response.data.token);
      navigate("/main");
    } catch (error) {
      setError(
        "Login unsuccessful. Please check your credentials and try again."
      );
    }
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {/* <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> */}
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate("/")}
        >
          Back
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
