import { Form, Button, Container } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import "./estilos/EstiloForm.css";
import { urlBase } from '../utilitarios/definicoes';
export default function FormPessoa(props) {

  const [validado, setValidado] = useState(false);
  const [pessoa, setPessoa] = useState(props.pessoa);
  const cpfRef = useRef(null);
  const teleRef = useRef(null);
  const cepRef = useRef(null);

  const formatCpf = (value) => {
    const formattedValue = value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return formattedValue
  }

  const formatPhone = (value) => {
    const formattedValue = value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');

    return formattedValue;
  };

  const formatCep = (value) => {
    const formattedValue = value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d{3})$/, '$1-$2');

    return formattedValue;
  };

  function manipularMudanca(e) {
    const { value } = e.target;
    //Mascaras para os campos de CPF, Telefone e CEP
    const formattedValueCpf = formatCpf(value);
    cpfRef.current.value = formattedValueCpf;
    const formattedValueTele = formatPhone(value);
    teleRef.current.value = formattedValueTele;
    const formattedValueCep = formatCep(value);
    cepRef.current.value = formattedValueCep;


    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setPessoa({ ...pessoa, [id]: valor });
  }

  function gravarDados(pessoa) {
    if (!props.modoEdicao) {
      fetch(urlBase + "/pessoa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pessoa),
      }).then((resposta) => {
        window.alert("Pessoa cadastrada com sucesso!")
      });
    }
    else {
      fetch(urlBase + "/pessoa", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pessoa),
      }).then((resposta) => {
        window.alert("Atualizado com sucesso!")
      });
    }
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (!form.checkValidity()) {
      evento.preventDefault();
      evento.stopPropagation();
    }
    else {
      gravarDados(pessoa)
    }
    setValidado(true);

    return false;
  }

  return (

    <body id="corpo">
      <Container className="background mb-3">
        <h1 className='text-center colorWhite'>Cadastro de Pessoas</h1>
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao} className='mainForm'>

          <Form.Group className="mb-3" controlId="FormCpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control type="text" required placeholder="000.000.000-00" value={pessoa.cpf} id="cpf" onChange={manipularMudanca} ref={cpfRef} maxLength={14} />
            <Form.Control.Feedback type="invalid">
              Digite um CPF valido!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="FormCategoria">
            <Form.Label>Categoria</Form.Label>
            <Form.Select value={pessoa.categoria} required id="categoria" onChange={manipularMudanca} aria-label="Default select example">
              <option value={setValidado}>Selecione uma das opções</option>
              <option value="Aluno">Aluno</option>
              <option value="Professor">Professor</option>
              <option value="Funcionário">Funcionário</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecione uma categoria
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="FormNome">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type="text" required value={pessoa.nome} id="nome" onChange={manipularMudanca} placeholder="Digite o nome completo" />
            <Form.Control.Feedback type="invalid">
              Digite um nome valido!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="FormSexo">
            <Form.Label>Gênero</Form.Label>
            <Form.Select value={pessoa.sexo} required id="sexo" onChange={manipularMudanca} aria-label="Default select example">
              <option value={setValidado}>Selecione uma das opções</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Indefinido">Indefinido</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecione o gênero
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="FormEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" required value={pessoa.email} id="email" onChange={manipularMudanca} placeholder="@gmail.com" />
            <Form.Control.Feedback type="invalid">
              Digite um e-mail valido!
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="FormTelefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" required value={pessoa.telefone} id="telefone" onChange={manipularMudanca} placeholder="(00)00000-0000" ref={teleRef} maxLength={15} />
            <Form.Control.Feedback type="invalid">
              Digite um telefone valido!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="FormCidade">
            <Form.Label>Cidade</Form.Label>
            <Form.Control type="text" required value={pessoa.cidade} id="cidade" onChange={manipularMudanca} placeholder="Informe sua cidade" />
            <Form.Control.Feedback type="invalid">
              Digite uma cidade valida!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="FormEndereco">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" required value={pessoa.endereco} id="endereco" onChange={manipularMudanca} placeholder="Informe seu endereco" />
            <Form.Control.Feedback type="invalid">
              Digite um endereço alido!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="FormCep">
            <Form.Label>CEP</Form.Label>
            <Form.Control type="text" required value={pessoa.cep} id="cep" onChange={manipularMudanca} placeholder="00000-000" ref={cepRef} maxLength={9} />
            <Form.Control.Feedback type="invalid">
              Digite um CEP valido!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="FormDataNasc">
            <Form.Label>Data de nascimento</Form.Label>
            <Form.Control required value={pessoa.dataNasc} id="dataNasc" onChange={manipularMudanca} type="date" />
            <Form.Control.Feedback type="invalid">
              Digite uma data de nascimento valida!
            </Form.Control.Feedback>
          </Form.Group>

          <div className="botao" type="submit">
            <Button type="submit" variant="primary" id="cadastrar">{props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button>{' '}
            <Button type="button" className="btn btn-secondary" onClick={() => { props.exibirTabela(true); props.setModoEdicao(false) }}>Voltar</Button>{' '}
          </div>
        </Form>
      </Container>
    </body>
  );
}