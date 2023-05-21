import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './pages/pagesUser/Home';
import ResultadosPesquisa from "./pages/pagesUser/ResultadosPesquisa";
import ResultadosPesquisaAdm from "./pages/pagesAdm/ResultadosPesquisaAdm";
import Login from "./pages/pagesUser/Login";
import Cadastro from "./pages/pagesUser/Cadastro";
import Contact from "./pages/pagesUser/Contact"
import InformacaoLivro from "./pages/pagesUser/InformacaoLivro";
import InformacaoLivroAdm from "./pages/pagesAdm/InformacaoLivroAdm";
import Adm from "./pages/pagesAdm/Adm";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" exact></Route>
          <Route element={<Adm/>} path="/adm" />
          <Route element={<Login />} path="/login" />
          <Route element={<Cadastro />} path="/cadastro" />
          <Route element={<ResultadosPesquisa />} path="/resultados-pesquisa"></Route>
          <Route element={<ResultadosPesquisaAdm />} path="/resultados-pesquisa-adm"></Route>
          <Route element={<Contact />} path="/contact" />
          <Route element={<InformacaoLivroAdm />} path="/informacao-livro-adm/:id" />
          <Route element={<InformacaoLivro />} path="/informacao-livro/:id" />
     </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
