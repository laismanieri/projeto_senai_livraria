import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/NavBar";
import styles from "../styles/PerfilUsuario.module.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../components/layout/AuthContext";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";

function PerfilUsuario() {
  const [activeItem, setActiveItem] = useState("Dados Pessoais");
  const { user, setUser } = useContext(AuthContext);

  <FormDadosPessoais
  active={activeItem === "Dados Pessoais"}
  user={user}
/>

  useEffect(() => {
    // Lógica para buscar os dados do usuário logado
    // e atualizar o estado "user" com os dados do usuário
    const fetchUserData = async () => {
      try {
        // Faça uma requisição ao servidor para buscar os dados do usuário
        const response = await fetch("http://localhost:8082/usuario"); // substitua "/api/user" pela rota correta para buscar os dados do usuário
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    // Lógica para executar o logout
    // Por exemplo, redirecionar o usuário para a página de login
    // ou limpar o token de autenticação, se aplicável
  };

  const handleFormSubmit = async (updatedUserData) => {
    try {
      const response = await fetch("http://localhost:8082/usuario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        toast.success("Dados atualizados com sucesso!");
        // Atualizar o estado "user" com os dados atualizados
        setUser(updatedUserData);
      } else {
        toast.error("Erro ao atualizar os dados do usuário.");
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
      toast.error("Erro ao atualizar os dados do usuário.");
    }
  };


  const renderForm = () => {
    switch (activeItem) {
      case "Dados Pessoais":
        return (
          <FormDadosPessoais
            active={activeItem === "Dados Pessoais"}
            user={user} // Passe o objeto "user" do contexto de autenticação
          />
        );
      case "Endereço":
        return <FormEndereco active={activeItem === "Endereço"} />;
      case "Pedidos":
        return <FormPedidos active={activeItem === "Pedidos"} />;
      case "Sair":
        return (
          <div className={styles.formSair}>
            <Button onClick={handleLogout} className={styles.buttonSair}>
              Sair
            </Button>
          </div>
        );
  
      default:
        return null;
    }
  };
 
  return (
    <>
      <Navbar />
        {/* {renderForm()} */}

      <div className={styles.container}>
        <Link to={"/"}>
          <h1 className={styles.voltarHome}>
            <AiOutlineArrowLeft />
            Voltar
          </h1>
        </Link>

        <div className={styles.linhaHorizontal} />

        <div className={styles.containerGridPerfil}>
          <div className={styles.gridPerfil}>
            <ul className={styles.gridPerfilLista}>
              <li
                className={`${styles.gridPerfilListaItem} ${activeItem === "Olá" ? styles.active : ""}`}
                onClick={() => handleItemClick("Olá")}
              >
                <FaUserCircle className={styles.imagemPerfil} />
                <span>Olá</span>
              </li>
              <li
                className={`${styles.gridPerfilListaItem} ${activeItem === "Dados Pessoais" ? styles.active : ""}`}
                onClick={() => handleItemClick("Dados Pessoais")}
              >
                Dados Pessoais
              </li>
              <li
                className={`${styles.gridPerfilListaItem} ${activeItem === "Endereço" ? styles.active : ""}`}
                onClick={() => handleItemClick("Endereço")}
              >
                Endereço
              </li>
              <li
                className={`${styles.gridPerfilListaItem} ${activeItem === "Pedidos" ? styles.active : ""}`}
                onClick={() => handleItemClick("Pedidos")}
              >
                Pedidos
              </li>
              <li
                className={`${styles.gridPerfilListaItem} ${activeItem === "Sair" ? styles.active : ""}`}
                onClick={() => handleItemClick("Sair")}
              >
                Sair
              </li>
            </ul>
          </div>

          <div className={styles.gridPerfilForm}>{renderForm()}</div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// Componentes de formulário de exemplo
function FormDadosPessoais({ active, user }) {
  const authContext = useContext(AuthContext); 
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const alternarMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  
  if (!authContext.user) {
    return null; // Renderiza null se o objeto user for nulo
  }

  return (
    <div className={active ? `${styles.active}` : ""}>
      <li className={`${styles.gridPerfilListaItem} ${active ? styles.active : ""}`}>
        Dados Pessoais
      </li>
      <div className={styles.linhaHorizontal} />
      <Form handleFormSubmit>
        <Form.Group as={Row} controlId="formNome">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaUser className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="text"
              placeholder="Nome"
              defaultValue={user.nome}
              readOnly
              // onChange={(event) => setNome(event.target.value)}
              // required
            />
          </div>
        </Form.Group>
        <Form.Group as={Row} controlId="formCpf">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaUser className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="text"
              placeholder="CPF"
              readOnly
              defaultValue={user.cpf}
              // onChange={(event) => setCpf(event.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group as={Row} controlId="formEmail">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaEnvelope className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="email"
              placeholder="E-mail"
              defaultValue={user.email}
              // onChange={(event) => setEmail(event.target.value)}
              // required
            />
          </div>
        </Form.Group>

        <div>
          <Button
            className={styles.buttonExpandirSenha}
            variant="secondary"
            onClick={handleToggleExpand}
          >
            {isExpanded ? "Recolher" : "Expandir"} Alterar Senha
          </Button>

          {isExpanded && (
            <div>
              <Form.Group as={Row} controlId="formSenha">
                <div className={styles.iconContainer}>
                  <Form.Label column sm={2}>
                    <FaLock className={styles.iconFormLogin} />
                  </Form.Label>
                  <Form.Control
                    className={styles.inputFormLogin}
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Senha"
                    // value={user.senha}
                    // onChange={(event) => setSenha(event.target.value)}
                    // required
                  />

                  <div
                    className={styles.alternarSenha}
                    onClick={alternarMostrarSenha}
                  >
                    {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </Form.Group>
              <Form.Group as={Row} controlId="formSenha">
                <div className={styles.iconContainer}>
                  <Form.Label column sm={2}>
                    <FaLock className={styles.iconFormLogin} />
                  </Form.Label>
                  <Form.Control
                    className={styles.inputFormLogin}
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Senha"
                    // value={senha}
                    // onChange={(event) => setSenha(event.target.value)}
                    // required
                  />

                  <div
                    className={styles.alternarSenha}
                    onClick={alternarMostrarSenha}
                  >
                    {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </Form.Group>
            </div>
          )}
        </div>

        <Button type="submit" className={styles.buttonSalvarPerfil}>
          Salvar
        </Button>
      </Form>
    </div>
  );
}

function FormEndereco() {
  return (
    <div>
      <h1>Endereço</h1>
      <div className={styles.linhaHorizontal} />
      <Form id="livroForm">
        <Row>
          <Col>
          
            <Form.Group controlId="cep">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="CEP"
                  name="cep"
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="uf">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Estado"
                  name="uf"
                  // required
                  // value={uf}
                  // onChange={(event) => setUf(event.target.value)}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="cidade">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Cidade"
                  name="cidade"
                  // value={cidade}
                  // onChange={(event) => setCidade(event.target.value)}
                  // required
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="logradouro">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Rua"
                  name="logradouro"
                  // value={logradouro}
                  // onChange={(event) => setLogradouro(event.target.value)}
                  // required
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="bairro">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Bairro"
                  name="bairro"
                  // value={bairro}
                  // onChange={(event) => setBairro(event.target.value)}
                  // required
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="numero">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Número"
                  name="numero"
                  // value={numero}
                  // onChange={(event) => setNumero(event.target.value)}
                  // required
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="complemento">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Complemento"
                  name="complemento"
                  // value={complemento}
                  // onChange={(event) =>
                  //   setComplemento(event.target.value)
                  // }
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className={styles.buttonSalvarPerfil}>
          Salvar
        </Button>
      </Form>
    </div>
  );
}

function FormPedidos() {
  return <div>Pedidos</div>;
}
export default PerfilUsuario;
