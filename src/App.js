import TelaMenu from "./interfaces/TelaMenuSistema.js";
import Tela404 from "./interfaces/Tela404.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaCadastroLivro from "./interfaces/TelaCadastroLivro.jsx";
import TelaFormExemplar from "./interfaces/TelaFormExemplar.jsx";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
       
          <Route path="/exemplar" element={<TelaFormExemplar/>} />
          <Route path="/cadastroLivro" element={<TelaCadastroLivro />} />
          <Route path="/" element={<TelaMenu></TelaMenu>}></Route>
          <Route path="*" element={<Tela404></Tela404>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
