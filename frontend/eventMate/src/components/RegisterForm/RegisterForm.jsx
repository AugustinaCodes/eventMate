import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../../services/userService";
import { useEffect, useState } from "react";
import styles from "./RegisterForm.module.scss";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: async (userData) => {
      await registerUser(userData);
    },
    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  useEffect(() => {
    let timer;
    if (isSuccess && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      navigate("/login");
    }
    return () => clearInterval(timer);
  }, [isSuccess, countdown, navigate]);

  if (isError) {
    return <h1>Some error happened while registering: {error.message} </h1>;
  }

  if (isSuccess) {
    return (
      <div className={styles.successMessage}>
        <h2>Registration Successful</h2>
        <p>You can now log in with your username and password.</p>
        <p>
          Redirecting back to the homepage in <strong>{countdown}</strong>{" "}
          seconds...
        </p>
        <button onClick={() => navigate("/")}>
          Go back to the homepage now
        </button>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const requestBody = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    mutate(requestBody);
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </form>
    </div>
  );
}
