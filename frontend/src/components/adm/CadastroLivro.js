import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import styles from "../adm/CadastroLivro.module.css";

function CadastroLivro() {
  function postLivro() {
    var livro = {
      anoPublicacao: document.getElementById('anoPublicacao').value,
      titulo: document.getElementById('titulo').value,
      autor: document.getElementById('autor').value,
      genero: document.getElementById('genero').value,
      editora: document.getElementById('editora').value,
      sinopse: document.getElementById('sinopse').value,
      imagem: document.getElementById('imagem').value,
      qtdePagina: document.getElementById('qtdePagina').value,
      oferta: document.getElementById('oferta').checked,
      destaque: document.getElementById('destaque').checked,
      detalhes: [
        {
          tipoLivro: 'FISICO',
          preco: parseFloat(document.getElementById('precoFisico').value),
          qtdeEstoque: parseInt(document.getElementById('qtdeEstoqueFisico').value),
        },
        {
          tipoLivro: 'EBOOK',
          preco: parseFloat(document.getElementById('precoEbook').value),
          qtdeEstoque: parseInt(document.getElementById('qtdeEstoqueEbook').value),
        }
      ]
    };
  
    fetch('http://localhost:8082/livro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(livro)
    })
      .then(response => {
        if (response.ok) {
          console.log('Livro cadastrado com sucesso!');
          alert('Livro cadastrado com sucesso!');
        } else {
          console.error('Erro ao cadastrar livro.');
        }
      })
      .catch(error => {
        console.error('Erro ao cadastrar livro:', error);
      });
  }
  

  return (
    <>
<form id="livroForm">
  <label for="anoPublicacao">Ano de Publicação:</label>
  <input type="text" id="anoPublicacao" name="anoPublicacao" required/><br/>

  <label for="titulo">Título:</label>
  <input type="text" id="titulo" name="titulo" required/><br/>

  <label for="autor">Autor:</label>
  <input type="text" id="autor" name="autor" required/><br/>

  <label for="genero">Gênero:</label>
  <input type="text" id="genero" name="genero" required/><br/>

  <label for="editora">Editora:</label>
  <input type="text" id="editora" name="editora" required/><br/>

  <label for="sinopse">Sinopse:</label>
  <textarea id="sinopse" name="sinopse" required></textarea><br/>

  <label for="imagem">URL da Imagem:</label>
  <input type="text" id="imagem" name="imagem" required/><br/>

  <label for="qtdePagina">Quantidade de Páginas:</label>
  <input type="number" id="qtdePagina" name="qtdePagina" required/><br/>

  <label for="oferta">Oferta:</label>
  <input type="checkbox" id="oferta" name="oferta"/><br/>

  <label for="destaque">Destaque:</label>
  <input type="checkbox" id="destaque" name="destaque"/><br/>

  <hr/>

  <h3>Detalhes do Livro</h3>

  <h4>Tipo de Livro: Físico</h4>
  <label for="precoFisico">Preço:</label>
  <input type="number" step="0.01" id="precoFisico" name="precoFisico" required/><br/>
  <label for="qtdeEstoqueFisico">Quantidade em Estoque:</label>
  <input type="number" id="qtdeEstoqueFisico" name="qtdeEstoqueFisico" required/><br/>

  <h4>Tipo de Livro: Ebook</h4>
  <label for="precoEbook">Preço:</label>
  <input type="number" step="0.01" id="precoEbook" name="precoEbook" required/><br/>
  <label for="qtdeEstoqueEbook">Quantidade em Estoque:</label>
  <input type="number" id="qtdeEstoqueEbook" name="qtdeEstoqueEbook" required/><br/>

  <button type="button" onClick={postLivro}>Enviar</button>
</form>

    </>
  );
}

export default CadastroLivro;
