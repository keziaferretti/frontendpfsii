import TelaMenu from "./interfaces/TelaMenuSistema.js";
import Tela404 from "./interfaces/Tela404.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaCadastroLivro from "./interfaces/TelaCadastroLivro.jsx";
import TelaFormExemplar from "./interfaces/TelaFormExemplar.jsx";
import TelaCadastroPessoa from "./interfaces/TelaCadastroPessoa.jsx";
import TelaFormEmprestimo from "./interfaces/TelaCadastroEmprestimo.jsx";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
       
          <Route path="/exemplar" element={<TelaFormExemplar/>} />
          <Route path="/cadastroLivro" element={<TelaCadastroLivro />} />
          <Route path="/cadastroPessoa" element={<TelaCadastroPessoa />} />
          <Route path="/frontendpfsii" element={<TelaMenu></TelaMenu>}></Route>
          <Route path="/emprestimo" element={<TelaFormEmprestimo/>}></Route>
          <Route path="/" element={<TelaMenu></TelaMenu>}></Route>
          <Route path="*" element={<Tela404></Tela404>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
