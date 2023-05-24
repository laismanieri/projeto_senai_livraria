import { Form, Button, Row, Col } from "react-bootstrap";

function UsuarioEndereco(){

    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, SetCidade] = useState("");
    const [uf, setUf] = useState("");
    const [cep, setCep] = useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault();
    
        const endereco = {
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            cep,
        };

        axios
        .post("http://localhost:8082/endereco", endereco)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log("Endereço cadastrado com sucesso!");
            window.alert("Endereço cadastrado com sucesso!");
          } else {
            console.error("Erro ao cadastrar endereço.");
          }
          limparFormulario();
        })
        .catch((error) => {
          // Lógica para manipular a resposta em caso de erro
          console.error(error);
        });
    };
  
    return(
        <Form onSubmit={handleFormSubmit}>
        <Form.Group as={Row} controlId="formLogradouro">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaUser className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="text"
              placeholder="logradouro"
              value={logradouro}
              onChange={(event) => setLogradouro(event.target.value)}
              required
            />
          </div>
        </Form.Group>
        <Form.Group as={Row} controlId="formNumero">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaUser className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="text"
              placeholder="numero"
              value={numero}
              onChange={(event) => setNumero(event.target.value)}
              required
            />
          </div>
        </Form.Group>
        <Form.Group as={Row} controlId="formComplemento">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaUser className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="text"
              placeholder="complemento"
              value={complemento}
              onChange={(event) => setComplemento(event.target.value)}
              required
            />
          </div>
        </Form.Group>
        <Form.Group as={Row} controlId="formBairro">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaUser className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="text"
              placeholder="bairro"
              value={bairro}
              onChange={(event) => setBairro(event.target.value)}
              required
            />
          </div>
          </Form.Group>
          <Form.Group as={Row} controlId="formCidade">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaUser className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="text"
              placeholder="cidade"
              value={cidade}
              onChange={(event) => SetCidade(event.target.value)}
              required
            />
          </div>
        </Form.Group>
        <Form.Group as={Row} controlId="formUf">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaUser className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="text"
              placeholder="uf"
              value={uf}
              onChange={(event) => setUf(event.target.value)}
              required
            />
          </div>
        </Form.Group>
        <Form.Group as={Row} controlId="formCep">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaUser className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="text"
              placeholder="cep"
              value={cep}
              onChange={(event) => setCep(event.target.value)}
              required
            />
          </div>
        </Form.Group>
        <div className={styles.buttonContainer}>
            <Button type="submit" className={styles.buttonLoginCadastrar}>
              Salvar
            </Button>
          </div>
     
       
        </Form>
        
        
    );
    
}
export default UsuarioEndereco;