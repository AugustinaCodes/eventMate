import styles from "./RegisterForm.module.scss";

export default function InputField({
  type,
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
