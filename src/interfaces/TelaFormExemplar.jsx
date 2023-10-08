import Pagina from "../templates/componentes/Pagina.js";
import FormExemplar from "../Formularios/FormExemplar.jsx";
import TabelaExemplar from "../tabelas/TabelaExemplar.jsx";
import { urlBase } from "../utilitarios/definicoes.js";
import "../tabelas/estilos/tabela.css";
import {Spinner} from "react-bootstrap"
import { useState, useEffect } from "react";

export default function TelaFormExemplar(props){

    const [exibirTabela, setExibirTabela] = useState (true);
    const [exemplar, setExemplar] = useState ([]);
    const [modoEdicao, setModoEdicao] = useState (false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState (false);
    const [exemplarEmEdicao, setExemplarEmEdicao] = useState({
        codigo: "",
        titulo: "",
        quantidade: "",
        dataCadastro: "",
        acervo: {
            codigo: "",
        }
    });

    function prepararExemplarParaEdicao(exemplar) {
        setModoEdicao(true);
        setExemplarEmEdicao({
            codigo: exemplar.codigo,
            titulo: exemplar.acervo.titulo,
            quantidade: exemplar.quantidade,
            dataCadastro: exemplar.dataCadastro,
            acervo: {
                codigo: exemplar.acervo.codigo
            },
            
        });
        setExibirTabela(false);
    }
    

    function apagarExemplar(exemplar){
        fetch(urlBase+"/exemplar", {
            method: "DELETE",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(exemplar)
        }).then((resposta) =>{
            return resposta.json()
        }).then((retorno) => {
            if(retorno.resultado){
                alert("Não foi possível excluir a exemplar")
            }
            else{
                buscarExemplar()
            }
        })
    }


    function buscarExemplar() {
        fetch(urlBase + "/exemplar", {
            method: "GET"
        })
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error('Erro na requisição');
            }
            return resposta.json();
        })
        .then((dados) => {
            if (Array.isArray(dados)) {
                setExemplar(dados);
            } else {
                setErro(dados.status);
            }
            setProcessado(true);
        })
        .catch((error) => {
            console.error('Erro na busca de exemplar:', error);
            setProcessado(true);
        });
    }
    
    

    useEffect(() =>{
        buscarExemplar();
    },[])

    if (erro){
        return <div>
            <p>Erro ao obter os exemplar do Backend : {erro.message}</p>
        </div>
    }else if (!processado){
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando exemplar...</span>
        </Spinner>
    }
    else{
        return <Pagina>
            <div>
            {
                exibirTabela ? 
                <TabelaExemplar 
                listaExemplar={exemplar} 
                exibirTabela={setExibirTabela}
                editarExemplar={prepararExemplarParaEdicao}
                excluirExemplar={apagarExemplar}
                setModoEdicao={setModoEdicao}
                buscar={buscarExemplar}
                setExemplar={setExemplar}
                /> 
                :
                <FormExemplar 
                listaExemplar={exemplar} 
                setExemplar={setExemplar}
                exibirTabela={setExibirTabela}
                buscar={buscarExemplar}
                modoEdicao={modoEdicao}
                setModoEdicao={setModoEdicao}
                exemplar={exemplarEmEdicao}
                />
            }
            </div>
        </Pagina>
        }
}