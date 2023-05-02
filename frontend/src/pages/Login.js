import { useState } from 'react';
import logoIMG from './assets/logo.png'
import './login.css'
import {Link} from 'react-router-dom'


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
   <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">

            <span className="login-form-title">Bem vindo!</span>

            <span className="login-form-title">
              <img src={logoIMG} alt="Universo dos livros" />
            </span>

            <div className="wrap-input">
              <input 
                className={email !== "" ? 'has-val input' : 'input'} 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
              <span className='focus-input' data-placeholder="Email"/>
            </div>
            
            <div className="wrap-input">
              <input 
                className={password !== "" ? 'has-val input' : 'input'}  
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
              <span className='focus-input' data-placeholder="Password"></span>
            </div>
            
            <a className='txt2-gs' href='#'>Esqueceu a senha ?</a>

            <div className='container-login-form-btn'>
              <button className='login-form-btn'>Login</button>
            </div>

            <div className='divide-wrap'>
                <hr className='divide'/>
            </div>

            <div className='text-center'>
              <span className='txt1'>Não possui uma conta ?</span>
              <Link to="/cadastro">
                <h1>Criar conta</h1>
              </Link>

              {/* <a className='txt2' href='#'>Criar conta.</a> */}
            </div>

          </form>
        </div>
      </div>
   </div>
  );
}

export default Login;
