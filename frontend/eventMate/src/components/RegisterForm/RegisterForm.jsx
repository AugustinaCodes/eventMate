import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser, checkUsername } from "../../services/userService";
import { useEffect, useState } from "react";
import styles from "./RegisterForm.module.scss";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../validation/userValidation";
import SuccessMessage from "./SuccessMessage";
import PasswordToggle from "./PasswordToggle";
import InputField from "./InputField";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [usernameExists, setUsernameExists] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (username) {
        const exists = await checkUsername(username);
        setUsernameExists(exists);
      } else {
        setUsernameExists(false);
      }
    };

    checkUsernameAvailability();
  }, [username]);

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
    return <SuccessMessage countdown={countdown} navigate={navigate} />;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateUser({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    setErrors(validationErrors || {});

    if (validationErrors || usernameExists) return;

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
        <InputField
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName}
        />
        <InputField
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName}
        />
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={
            usernameExists
              ? "Username already exists. Please choose another."
              : ""
          }
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <PasswordToggle
          passwordVisible={passwordVisible}
          togglePasswordVisibility={() => setPasswordVisible(!passwordVisible)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </form>
    </div>
  );
}
