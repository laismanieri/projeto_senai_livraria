import { useState } from "react";
import logoIMG from "../assets/logo.png";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.containeUserLogin}>
      <div className={styles.itemLoginBemVindo}>Item 1</div>
      <div className={styles.itemLoginConta}>
        Item 2
      </div>
    </div>
  );
}

export default Login;
