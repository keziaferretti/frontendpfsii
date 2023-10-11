import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Pagina from "../templates/componentes/Pagina.js";
import TabelaEmprestimo from "../tabelas/TabelaEmprestimo.jsx";
import Formulario from "../Formularios/FormEmprestimo.jsx";
import { urlBase } from "../utilitarios/definicoes.js";

export default function TelaFormEmprestimo(props) {

    const [exibirTabela, setExibirTabela] = useState(true);
    const [emprestimos, setEmprestimos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState(false);
    
    function apagarEmprestimo(emprestimo) {
        fetch(urlBase + "/emprestimo", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emprestimo),
        })
            .then((resposta) => {
                return resposta.json();
            })
            .then((retorno) => {
                if (retorno.resultado) {
                    alert("Não foi possível excluir o empréstimo");
                } else {
                    buscarEmprestimos();
                }
            });
    }

    function buscarEmprestimos() {
        fetch(urlBase + "/emprestimo", {
            method: "GET"
        })
            .then((resposta) => {
                return resposta.json();
            })
            .then((dados) => {
                if (Array.isArray(dados)) {
                    setProcessado(true);
                    setEmprestimos(dados);
                } else {
                    setProcessado(true);
                    setErro(dados.status);
                }
            });
    }

    useEffect(() => {
        buscarEmprestimos();
    }, []); 

    if (erro) {
        return (
            <div>
                <p>Erro ao obter os empréstimos do Backend: {erro.message}</p>
            </div>
        );
    } else if (!processado) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Carregando empréstimos...</span>
            </Spinner>
        );
    } else {
        return (
            <Pagina>
                <div>
                    {exibirTabela ? (
                        <TabelaEmprestimo
                            listaEmprestimos={emprestimos}
                            exibirTabela={setExibirTabela}
                            excluirEmprestimo={apagarEmprestimo}
                            setModoEdicao={setModoEdicao}
                            buscar={buscarEmprestimos}
                            setEmprestimos={setEmprestimos}
                            buscarEmprestimos={buscarEmprestimos} 
                        />
                    ) : (
                        <Formulario
                            listaEmprestimos={emprestimos}
                            setEmprestimos={setEmprestimos}
                            exibirTabela={setExibirTabela}
                            buscar={buscarEmprestimos}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                        />
                    )}
                </div>
            </Pagina>
        );
    }
}
