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
  const [endereco, setEndereco] = useState({
    cep: "",
    uf: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    numero: "",
    complemento: "",
  });

  <FormDadosPessoais
    active={activeItem === "Dados Pessoais"}
    user={user}
    endereco={endereco}
  />;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8082/usuario");
        const userData = await response.json();
        console.log(userData);
        setUser(userData);

        // Definir o estado do endereço com base nos dados do usuário
        setEndereco({
          cep: userData.endereco.cep || "",
          uf: userData.endereco.uf || "",
          cidade: userData.endereco.cidade || "",
          logradouro: userData.endereco.logradouro || "",
          bairro: userData.endereco.bairro || "",
          numero: userData.endereco.numero || "",
          complemento: userData.endereco.complemento || "",
        });
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

  const renderForm = () => {
    switch (activeItem) {
      case "Dados Pessoais":
        return (
          <FormDadosPessoais
            user={user}
            endereco={endereco}
            setEndereco={setEndereco}
          />
        );
      case "Pedidos":
        return <FormPedidos active={activeItem === "Pedidos"} />;
      default:
        return null;
    }
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

        <div className={styles.containerGridPerfil}>
          <div className={styles.gridPerfil}>
            <ul className={styles.gridPerfilLista}>
              <li
                className={`${styles.gridPerfilListaItem} ${
                  activeItem === "Olá" ? styles.active : ""
                }`}
                onClick={() => handleItemClick("Olá")}
              >
                <FaUserCircle className={styles.imagemPerfil} />
                <span>Olá</span>
              </li>
              <li
                className={`${styles.gridPerfilListaItem} ${
                  activeItem === "Dados Pessoais" ? styles.active : ""
                }`}
                onClick={() => handleItemClick("Dados Pessoais")}
              >
                Dados Pessoais
              </li>
              <li
                className={`${styles.gridPerfilListaItem} ${
                  activeItem === "Pedidos" ? styles.active : ""
                }`}
                onClick={() => handleItemClick("Pedidos")}
              >
                Pedidos
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
function FormDadosPessoais({ active, user, endereco, setEndereco }) {
  const authContext = useContext(AuthContext);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedEndereco, setIsExpandedEndereco] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Construir o objeto de dados do usuário atualizado
      const dadosUsuarioAtualizados = {
        nome: event.target.elements.formNome.value,
        email: event.target.elements.formEmail.value,
        endereco: {
          cep: event.target.elements.cep.value,
          uf: event.target.elements.uf.value,
          cidade: event.target.elements.cidade.value,
          logradouro: event.target.elements.logradouro.value,
          bairro: event.target.elements.bairro.value,
          numero: event.target.elements.numero.value,
          complemento: event.target.elements.complemento.value,
        },
      };
      console.log(dadosUsuarioAtualizados);
      console.log(user.id);
      // Fazer a solicitação PUT para atualizar os dados do usuário
      const response = await fetch(`http://localhost:8082/usuario/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosUsuarioAtualizados),
      });

      if (response.ok) {
        toast.success("Dados atualizados com sucesso!");
      } else {
        toast.error("Erro ao atualizar os dados.");
      }
      console.log(user.id);
    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
      toast.error("Erro ao atualizar os dados.");
    }
  };

  const alternarMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleExpandEndereco = () => {
    setIsExpandedEndereco(!isExpandedEndereco);
  };


  if (!authContext.user) {
    return null; // Renderiza null se o objeto user for nulo
  }

  return (
    <div className={active ? `${styles.active}` : ""}>
      <li
        className={`${styles.gridPerfilListaItem} ${
          active ? styles.active : ""
        }`}
      >
        Dados Pessoais
      </li>
      <div className={styles.linhaHorizontalForm} />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group as={Row} controlId="formNome">
              <Form.Label column sm={2}>
                Nome:
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  className={styles.inputForm}
                  type="text"
                  placeholder="Nome"
                  defaultValue={user.nome}
                  required
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group as={Row} controlId="formCpf">
              <Form.Label column sm={2}>
                CPF:
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  className={styles.inputForm}
                  type="text"
                  placeholder="CPF"
                  readOnly
                  defaultValue={user.cpf}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group as={Row} controlId="formEmail">
              <Form.Label column sm={2}>
                E-mail:
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  className={styles.inputForm}
                  type="email"
                  placeholder="E-mail"
                  defaultValue={user.email}
                  required
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Button
            className={styles.buttonExpandirSenha}
            variant="secondary"
            onClick={handleToggleExpandEndereco}
          >
            {isExpandedEndereco ? "Recolher" : "Expandir"} Alterar endereço
          </Button>
        {isExpandedEndereco && (
        <div>
          <Row>
            <Col>
              <Form.Group controlId="cep">
                <Form.Label column sm={2}>
                  CEP:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    className={styles.inputForm}
                    type="text"
                    placeholder="CEP"
                    name="cep"
                    defaultValue={user.enderecos[0].cep}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="uf">
                <Form.Label column sm={2}>
                  Estado:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    className={styles.inputForm}
                    type="text"
                    placeholder="Estado"
                    name="uf"
                    defaultValue={user.enderecos[0].uf}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="cidade">
                <Form.Label column sm={2}>
                  Cidade:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    className={styles.inputForm}
                    type="text"
                    placeholder="Cidade"
                    name="cidade"
                    defaultValue={user.enderecos[0].cidade}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="logradouro">
                <Form.Label column sm={2}>
                  Rua:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    className={styles.inputForm}
                    type="text"
                    placeholder="Rua"
                    name="logradouro"
                    defaultValue={user.enderecos[0].logradouro}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="bairro">
                <Form.Label column sm={2}>
                  Bairro:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    className={styles.inputForm}
                    type="text"
                    placeholder="Bairro"
                    name="bairro"
                    defaultValue={user.enderecos[0].bairro}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="numero">
                <Form.Label column sm={2}>
                  Número:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    className={styles.inputForm}
                    type="text"
                    placeholder="Número"
                    name="numero"
                    defaultValue={user.enderecos[0].numero}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="complemento">
                <Form.Label column sm={2}>
                  Complemento:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    className={styles.inputForm}
                    type="text"
                    placeholder="Complemento"
                    name="complemento"
                    defaultValue={user.enderecos[0].complemento}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </div>

        )}
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
                    <FaLock className={styles.iconFormLabel} />
                  </Form.Label>
                  <Form.Control
                    className={styles.inputForm}
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Senha Atual"
                    // value={user.senha}
                    // onChange={(event) => setSenha(event.target.value)}
                    // required
                  />

                  <div
                    className={styles.alternarSenha}
                    onClick={alternarMostrarSenha}
                  >
                    {mostrarSenha ? <FaEyeSlash /> : <FaEye  className={styles.iconFormLabel}/>}
                  </div>
                </div>
              </Form.Group>
              <Form.Group as={Row} controlId="formSenha">
                <div className={styles.iconContainer}>
                  <Form.Label column sm={2}>
                    <FaLock className={styles.iconFormLabel} />
                  </Form.Label>
                  <Form.Control
                    className={styles.inputForm}
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Nova Senha"
                    // value={user.senha}
                    // onChange={(event) => setSenha(event.target.value)}
                    // required
                  />

                  <div
                    className={styles.alternarSenha}
                    onClick={alternarMostrarSenha}
                  >
                    {mostrarSenha ? <FaEyeSlash /> : <FaEye  className={styles.iconFormLabel}/>}
                  </div>
                </div>
              </Form.Group>
              <Form.Group as={Row} controlId="formSenha">
                <div className={styles.iconContainer}>
                  <Form.Label column sm={2}>
                    <FaLock className={styles.iconFormLabel} />
                  </Form.Label>
                  <Form.Control
                    className={styles.inputForm}
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Confirme a Nova Senha"
                    // value={senha}
                    // onChange={(event) => setSenha(event.target.value)}
                    // required
                  />

                  <div
                    className={styles.alternarSenha}
                    onClick={alternarMostrarSenha}
                  >
                    {mostrarSenha ? <FaEyeSlash /> : <FaEye  className={styles.iconFormLabel}/>}
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

function FormPedidos() {
  return <div>Pedidos</div>;
}
export default PerfilUsuario;
