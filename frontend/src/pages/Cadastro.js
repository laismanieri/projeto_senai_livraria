import { useState } from 'react';
import logoIMG from './assets/logo.png'
import './login.css'
import cadastrar from './Cadastrar';

function Cadastro() {
  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmasenha, setConfirmasenha] = useState("")
  const [cpf, setCpf] = useState("")
  const [nascimento, setNascimento] = useState("")

  return (
   <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">

            <span className="login-form-title">Faça seu cadastro</span>

            <span className="login-form-title">
              <img src={logoIMG} alt="Universo dos livros" />
            </span>

            <div className="wrap-input">
              <input
                id='nome' 
                className={nome !== "" ? 'has-val input' : 'input'} 
                type="text" 
                value={nome}
                onChange={e => setNome(e.target.value)}
                />
              <span className='focus-input' data-placeholder="Nome"></span>
            </div>
            
            <div className="wrap-input">
              <input
                id='sobrenome' 
                className={sobrenome !== "" ? 'has-val input' : 'input'}  
                type="text" 
                value={sobrenome}
                onChange={e => setSobrenome(e.target.value)}
                />
              <span className='focus-input' data-placeholder="Sobrenome"></span>
            </div>

            <div className="wrap-input">
              <input
                id='cpf' 
                className={cpf !== "" ? 'has-val input' : 'input'}  
                type="text" 
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                />
              <span className='focus-input' data-placeholder="CPF"></span>
            </div>

            <div className="wrap-input">
              <input
                id='nascimento' 
                className={nascimento !== "" ? 'has-val input' : 'input'}  
                type="text" 
                value={nascimento}
                onChange={e => setNascimento(e.target.value)}
                />
              <span className='focus-input' data-placeholder="Data de nascimento"></span>
            </div>

            <div className="wrap-input">
              <input
                id='email' 
                className={email !== "" ? 'has-val input' : 'input'}  
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
              <span className='focus-input' data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                id='senha' 
                className={senha !== "" ? 'has-val input' : 'input'}  
                type="password" 
                value={senha}
                onChange={e => setSenha(e.target.value)}
                />
              <span className='focus-input' data-placeholder="Senha"></span>
            </div>

            <div className="wrap-input">
              <input
                id='confirmasenha' 
                className={confirmasenha !== "" ? 'has-val input' : 'input'}  
                type="password" 
                value={confirmasenha}
                onChange={e => setConfirmasenha(e.target.value)}
                />
              <span className='focus-input' data-placeholder="Confirmar senha"></span>
            </div>

            <div className='container-login-form-btn'>
              <button onClick={cadastrar} className='login-form-btn'>Cadastrar</button>
            </div>

          </form>
        </div>
      </div>
   </div>
  );
}

export default Cadastro;
