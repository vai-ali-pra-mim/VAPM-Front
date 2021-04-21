import React, { useState } from 'react';
import Swal from 'sweetalert2';

import requestApi from '../../../services/APIs/MainAPIUsuarios'

export default function vouAli(idUsuario) {

  Swal.fire({
    title: 'Novo Post',
    html: `
          <span>
          <style>

*{
 text-align: left;
}

#titulo{
 margin-top: 20px;
 margin-bottom: 20px;
 text-align: left;
}

.local-data strong{
 margin-bottom: 40px;
}

.local-data ul{
 display: grid;
 grid-template-columns: repeat(2, 1fr);
 grid-gap: 24px;
 list-style: none;
}

.local-data ul li strong{
 display: block;
 margin-bottom: 3px;
}

input{
 width: 280px;
 height: 40px;
 border: 1px solid black;
 border-radius: 20px;
 padding: 0 10px; 
 background-color: #E4E4E4;
}

.agendar{
 display: flex;
 flex-direction: row;
 margin-top: 20px;
 margin-bottom: 20px;
}

.agendar h2{
 text-align: left;
}

button{
 border-radius: 15px;
 text-align: center;
 width: 120px;
 height: 40px;
 border: 0;
 text-decoration: none;
 transition: filter 0.2s;
 padding: 0px 20px;
 background-color: #F09435;
 color: white;
 font-size: larger;
 margin-left: 15px;
}

#descricao{
  resize:none;
}
#btn-submit{
  margin-left: 20.0vw;
  height: 3.5vw;
}
button:hover{
 filter: brightness(90%);
}
</style>

<h2 id="titulo">insira os dados do local que irá</h2>

<div class="local-data">

<form>
<ul>

<li>
<strong>Titulo do post</strong>
<input  id="titulo-post" required minlength="5"  />
</li>

<li>
<strong>Descrição</strong>
<textarea placeholder="O que você vai comprar? ... ex:padaria" id="descricao" required minlength="10" maxlength="110" wrap="hard" required > </textarea>
</li>

<li>
<strong>Taxa entrega (R$)</strong>
<input  id="taxaEntrega" type="number" value="0" required />
</li>

<li>
<strong>Quantidade máxima de itens</strong>
<input placeholder="Número de itens que você poderá entregar" value="1" type="number" id="limiteQuantidadeItens" required />
</li>

<li>
<strong>Peso máxima da entrega (Kgs)</strong>
<input placeholder="Peso máximos dos itens que você poderá entregar" value="5" type="number" id="limitePesoEntrega" required />
</li>

<li>
<strong>Tempo estimado para realizar a tarefa</strong>
<input type="time" id="tempoEstimadoRealizacao" value="00:30" required />
</li>

<li>
<strong>Local tarefa</strong>
<input placeholder="digite um local... ex:padaria" id="localTarefa" required minlength="5" required />
</li>

</ul>
</br>

<div class="agendar-cont" id="testet">
<strong>Insira a data e horário desejada</strong>
</br>
<input type="datetime-local" id="datetime" required />
</br>
<button type="submit" id="btn-submit">Enviar</button>
</div>
<form>
                
          </span>
          `,

    showCancelButton: false,
    showConfirmButton: false,
    // cancelButtonColor: '#d33',
    // confirmButtonText: 'Vou ali',
    // confirmButtonColor: '#F09435',
    // backdrop: `
    // url('/assets/logo.svg')
    // rgba(0,0,0,.4)
    // left top
    // no-repeat`,
    width: 800,
    // testee: () => {
    //   return [
    //     document.getElementById('testet').style = "display: block;"
    //   ]
    // },
    preConfirm: () => {
    },
  }).then((result) => {
    // if (result.isConfirmed) {    
    // }
  })

  document.getElementById("btn-submit").addEventListener("click",
    function (e) {
      e.preventDefault();
      let data = {
        titulo: document.getElementById("titulo-post").value,
        descricao: document.getElementById("descricao").value,
        taxaEntrega: Number(document.getElementById("taxaEntrega").value),
        limiteQuantidadeItens: Number(document.getElementById("limiteQuantidadeItens").value),
        limitePesoEntrega: Number(document.getElementById("limitePesoEntrega").value),
        localTarefa: document.getElementById("localTarefa").value,
        tempoEstimadoRealizacao: document.getElementById("tempoEstimadoRealizacao").value,
        entregador_id: idUsuario,
        dataHoraRealizacao: document.getElementById("datetime").value,
        foiEntregue: 0,
        foiAceito: 0
      }
      if (data.titulo.length >= 5 &&
        data.descricao.length >= 5 &&
        data.dataHoraRealizacao != '' &&
        data.taxaEntrega >= 0 &&
        data.limiteQuantidadeItens > 0 &&
        data.localTarefa.length > 5 &&
        data.tempoEstimadoRealizacao.length != ''
      ) {
        //console.log(data);
        try {
          requestApi.post("/posts", data)

          Swal.fire(
            'Post realizado com sucesso!',
            'seu post foi finalizado com sucesso',
            'success'
          )

          setTimeout(() => {
            document.location.reload()
          }, 2000)
        }
        catch (e) {
          console.log('Error ');
          console.log(e)
        }

      } else {
        //console.log(data);
        Swal.fire(
          'Preenchimento incorreto ou vazio',
          'Algum campo foi preenchido incorretamente ou está vazio. Preencha novamente  ',
          'info'
        )
      }
    })
}