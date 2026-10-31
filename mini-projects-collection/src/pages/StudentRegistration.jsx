import { useState } from "react";
import styles from "../styles/StudentRegistration.module.css";

const INITIAL_FORM = {
  name: "",
  username: "",
  college: "",
  email: "",
  password: "",
  address: "",
};

function StudentRegistration() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (field, value) => {
    const trimmedValue = value.trim();

    switch (field) {
      case "name":
        return trimmedValue ? "" : "Name is required";

      case "username":
        if (trimmedValue && trimmedValue !== trimmedValue.toLowerCase()) {
          return "Username must be lowercase only";
        }
        return "";

      case "college":
        return trimmedValue ? "" : "College is required";

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
          return "Enter a valid email address";
        }
        return "";

      case "password":
        if (value.length < 8) {
          return "Password must be at least 8 characters";
        }
        return "";

      case "address":
        return trimmedValue ? "" : "Address is required";

      default:
        return "";
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (submitted) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    Object.keys(INITIAL_FORM).forEach((field) => {
      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setSubmitted(true);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    // All validations passed.
    console.log("Registration successful:", formData);
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.heading}>Student Registration Form</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="student-name">Name</label>
            <input
              id="student-name"
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="student-username">Username</label>
            <input
              id="student-username"
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="student-college">College</label>
            <input
              id="student-college"
              type="text"
              name="college"
              placeholder="Enter college"
              value={formData.college}
              onChange={handleChange}
            />
            {errors.college && <p className={styles.error}>{errors.college}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="student-email">Email</label>
            <input
              id="student-email"
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="student-password">Password</label>
            <input
              id="student-password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="student-address">Address</label>
            <input
              id="student-address"
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className={styles.error}>{errors.address}</p>}
          </div>

          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>
      </section>
    </main>
  );
}

export default StudentRegistration;
