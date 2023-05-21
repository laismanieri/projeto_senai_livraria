import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

import styles from "../styles/Contact.module.css";

import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/NavBar";

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Mensagem enviada com sucesso!");
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Link to={"/"}>
          <h1 className={styles.voltarHome}>
            <AiOutlineArrowLeft />
            Voltar
          </h1>
        </Link>

        <div className={styles.linhaHorizontal} />

        <form className={styles.formContact} onSubmit={handleSubmit}>
          <label className={styles.formContactLabel} htmlFor="name">
            Nome:
          </label>
          <input
            className={styles.formContactInput}
            type="text"
            name="nome"
            placeholder=" Nome"
            maxlength="100"
            required
          />

          <label className={styles.formContactLabel} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.formContactInput}
            type="email"
            name="E-mail"
            placeholder=" E-mail"
            maxlength="100"
            required
          />

          <label className={styles.formContactLabel} htmlFor="telefone">
            Telefone:
          </label>
          <input
            className={styles.formContactInput}
            type="tel"
            name="Telefone"
            placeholder=" Telefone"
            maxlength="30"
          />

          <label className={styles.formContactLabel} htmlFor="message">
            Digite a sua sugestão:
          </label>
          <textarea
            className={styles.formContactTextArea}
            placeholder=" Digite sua mensagem aqui..."
            name="mensagem"
            cols="30"
            rows="7"
            required
          />

          <button className={styles.formContactButton} type="submit">
            Enviar
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
