import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/layout/AuthContext";
import { ToastContainer } from "react-toastify";

import Home from './pages/pagesUser/Home';
import ResultadosPesquisa from "./pages/pagesUser/ResultadosPesquisa";
import ResultadosPesquisaAdm from "./pages/pagesAdm/ResultadosPesquisaAdm";
import Login from "./pages/pagesUser/Login";
import Contact from "./pages/pagesUser/Contact"
import InformacaoLivro from "./pages/pagesUser/InformacaoLivro";
import InformacaoLivroAdm from "./pages/pagesAdm/InformacaoLivroAdm";
import Adm from "./pages/pagesAdm/Adm";
import LoginEntrar from "./pages/pagesUser/LoginEntrar";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <ToastContainer autoClose={1500}/>      
        <AuthProvider>
          <Routes>
            <Route element={<Home />} path="/" exact></Route>
            <Route element={<Adm/>} path="/adm" />
            <Route element={<Login />} path="/login" />
            <Route element={<LoginEntrar/>} path="/login-entrar" />
            <Route element={<ResultadosPesquisa />} path="/resultados-pesquisa"></Route>
            <Route element={<ResultadosPesquisaAdm />} path="/resultados-pesquisa-adm"></Route>
            <Route element={<Contact />} path="/contact" />
            <Route element={<InformacaoLivroAdm />} path="/informacao-livro-adm/:id" />
            <Route element={<InformacaoLivro />} path="/informacao-livro/:id" />
          </Routes>        
        </AuthProvider>

      </BrowserRouter>  

    </div>
  );
}

export default App;
