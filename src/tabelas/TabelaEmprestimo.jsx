    import React, { useState } from "react";
    import { Button, Table, Container, Row, Col } from "react-bootstrap";
    import "./estilos/tabela.css";
    import 'bootstrap-icons/font/bootstrap-icons.css';

    export default function TabelaEmprestimo(props) {

        const [termoDeBusca, setTermoDeBusca] = useState('');
        const [exemplar, setExemplar] = useState([]);
        const [acervoLista, setAcervoLista] = useState([]);

        return (
            <body id="corpo" className="colorwhite ">
                <Container className="border mb-2 mt-2 corpoTabela" >
                    <h2 className="text-center m-4">Empréstimos Cadastrados</h2>
                    <Row className='mb-2 mt-2 '>
                        <Col>
                            <Button variant="success"
                                onClick={() => {
                                    props.exibirTabela(false);
                                    props.setModoEdicao(false);
                                }}>
                                Cadastrar
                            </Button>
                        </Col>
                    </Row>

                    <Table striped bordered hover className="text-center">
                        <thead className="colorwhite">
                            <tr>
                                <th>Código</th>
                                <th>Data de Empréstimo</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Categoria</th>
                                <th>Codigo Exemplar</th>
                                <th>Título Exemplar</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.listaEmprestimos?.map((emprestimo, indice) => {
                                // Converte a data de string para um objeto Date
                                const dataEmprestimo = new Date(emprestimo.dataEmprestimo);

                                // Obtém o dia, mês e ano da data
                                const dia = String(dataEmprestimo.getDate()).padStart(2, '0');
                                const mes = String(dataEmprestimo.getMonth() + 1).padStart(2, '0'); // Adicione 1 ao mês, pois ele é baseado em zero
                                const ano = dataEmprestimo.getFullYear();

                                // Formata a data como "dd/mm/yyyy"
                                const dataFormatada = `${dia}/${mes}/${ano}`;

                                return (
                                    <tr key={indice}>
                                        <td id="colorwhite">{emprestimo.codigo}</td>
                                        <td id="colorwhite">{dataFormatada}</td>
                                        <td id="colorwhite">{emprestimo.pessoa.nome}</td>
                                        <td id="colorwhite">{emprestimo.pessoa.cpf}</td>
                                        <td id="colorwhite">{emprestimo.pessoa.categoria}</td>
                                        <td id="colorwhite">
                                            {emprestimo.listaExemplares.map((exemplar, index) => (
                                                <div key={index}>{exemplar.exemplar.codigo}</div>
                                            ))}
                                        </td>
                                        <td id="colorwhite">
                                            {emprestimo.listaExemplares.map((exemplar, index) => (
                                                <div key={index}>{exemplar.exemplar.acervo.titulo}</div>
                                            ))}
                                        </td>
                                        <td>
                                            <Button variant="danger"
                                                onClick={() => {
                                                    if (window.confirm("Deseja realmente excluir o empréstimo?")) {
                                                        props.excluirEmprestimo(emprestimo);
                                                    }
                                                }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>

                </Container>
            </body>
        );
    }
