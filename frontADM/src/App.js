import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import ResultadosDaPesquisa from './components/layout/ResultadoPesquisa';

function App() {
  return (
    <Router>

      <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/contato' element={<Contato/>}></Route>
          <Route path="/search" element={<ResultadosDaPesquisa/>} />
      </Routes>

    </Router>
  );
}

export default App;
