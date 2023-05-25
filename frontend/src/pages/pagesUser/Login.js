import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [endereco, setEndereco] = useState({
    uf: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    numero: "",
    complemento: "",
    cep: ""
  });
  
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");


  const buscarEndereco = (cep) => {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        const data = response.data;
        setEndereco(data);
        setUf(data.uf);
        setCidade(data.localidade);
        setBairro(data.bairro);
        setLogradouro(data.logradouro);
      })
      .catch((error) => {
        console.error("Erro ao obter dados do endereço.", error);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const usuario = {
      email,
      nome,
      senha,
      cpf,
      enderecos: [endereco]
    };

    axios
      .post("http://localhost:8082/usuario", usuario)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Cadastro efetuado com sucesso");
          limparFormulario();
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("cpf")) {
            toast.error("Já existe um usuário com o mesmo CPF");
          } else if (errorMessage.includes("email")) {
            toast.error("Já existe um usuário com o mesmo e-mail");
          } else {
            toast.error(errorMessage);
          }
        } else {
          toast.error("Erro ao cadastrar-se");
          console.error("Erro ao cadastrar-se.", error);
        }
      });
  };

  const limparFormulario = () => {
    setEmail("");
    setNome("");
    setSenha("");
    setCpf("");
    setCep("");
    setUf("");
    setCidade("");
    setBairro("");
    setLogradouro("");
    setNumero("");
    setComplemento("")

  };

  const alternarMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.containeUserLogin}>
      <div className={styles.itemLoginBemVindo}>
        <div>
          {" "}
          <img src="/img/logo.png" alt="Logo" className={styles.loginLogo} />
        </div>
        <div>
          <h1>Bem vindo de volta</h1>
        </div>
        <div className={styles.loginInfo}>
          <h2 className={styles.loginInfoH2}>
            Para se manter conectado conosco, faça o login com suas informações
            pessoais
          </h2>
        </div>
        <div>
          <Link to="/login-entrar">
            <button className={styles.buttonLoginEntrar}>Entrar</button>
          </Link>
        </div>
      </div>

      <div className={styles.itemLoginConta}>
        <h2 className={styles.loginContaH2}>Criar Conta </h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group as={Row} controlId="formNome">
            <div className={styles.iconContainer}>
              <Form.Label column sm={2}>
                <FaUser className={styles.iconFormLogin} />
              </Form.Label>
              <Form.Control
                className={styles.inputFormLogin}
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                required
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
                placeholder="Cpf"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
                required
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
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
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                required
              />

              <div
                className={styles.alternarSenha}
                onClick={alternarMostrarSenha}
              >
                {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </Form.Group>

          <div>
            <Button
              className={styles.buttonExpandirEndereco}
              variant="secondary"
              onClick={handleToggleExpand}
            >
              {isExpanded ? "Recolher" : "Expandir"} Cadastro de Endereço
            </Button>

            {isExpanded && (
              <Form id="livroForm">
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="cep">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Cep"
                            name="uf"
                            required
                            value={cep}
                            onChange={(event) => {
                              const cepValue = event.target.value;
                              setCep(cepValue);
                              if (cepValue.length === 8) {
                                buscarEndereco(cepValue);
                              }
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="uf">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Estado"
                            name="uf"
                            required
                            value={uf}
                            onChange={(event) => setUf(event.target.value)}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="cidade">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Cidade"
                            name="cidade"
                            value={cidade}
                            onChange={(event) => setCidade(event.target.value)}
                            required
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="logradouro">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Rua"
                            name="logradouro"
                            value={logradouro}
                            onChange={(event) => setLogradouro(event.target.value)}
                            required
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="bairro">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Bairro"
                            name="bairro"
                            value={bairro}
                            onChange={(event) => setBairro(event.target.value)}
                            required
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="numero">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Número"
                            name="numero"
                            value={numero}
                            onChange={(event) => setNumero(event.target.value)}
                            required
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="complemento">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Complemento"
                            name="complemento"
                            value={complemento}
                            onChange={(event) =>
                              setComplemento(event.target.value)
                            }
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Form>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <Button type="submit" className={styles.buttonLoginCadastrar}>
              Cadastrar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
