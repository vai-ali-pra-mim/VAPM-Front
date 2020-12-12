import React from 'react';
import Swal from 'sweetalert2';

export default function InformacoesSolicitanteModal(solicitante, logradouro) {

  Swal.fire({
    title: `Solicitante`,
    html: `
    <style>

    h2{
      margin-bottom: 15px;
      text-align: center;
      // font-size: large;
    }
    .feed-historico ul{
      width: 550px;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      list-style: none;
      justify-content: center;
      cursor: pointer;
      margin: 0 auto;   
    }
    
    .feed-historico li {
      background: linear-gradient(180deg, rgba(248, 85, 42, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #FFFEFE;;
      padding: 24px;
      border-radius: 8px;
      position: relative;
      text-align: left;
      margin-bottom: 20px;
    }
      .feed-historico ul li strong {
        // margin-left: 20%;
      }
    
      .feed-historico ul li p {
        color: #737380;
        line-height: 21px;
        font-size: 16px;
        // margin-left: 20%;
      }
    
      .feed-historico ul li #extratoBanc{
        position: absolute;
        width: 80px;
        margin-top: 10px;
        padding-right: 20px;
      }

      .feed-historico ul li #imgStar{
        width: 15px;
      }
  
      .feed-historico h1{
        text-align: center;
        margin-bottom: 20px;
      }

      .feed-historico #local{
        margin-left: 15%;
      }

      .info{
        display: flex;
        flex-direction: row;
        margin-left: 15%;
        margin-bottom: 20px;
      }

      .info strong{
        padding-left: 20px;
        padding-right: 20px;
      }

    </style> 

     <div class="feed-historico">
      <ul>
        <li>
        <img id="extratoBanc"src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ4MHB0IiB2aWV3Qm94PSIwIDAgNDgwIDQ4MCIgd2lkdGg9IjQ4MHB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00NDAgMGgtMjg4Yy0yMi4wODIwMzEuMDI3MzQzOC0zOS45NzI2NTYgMTcuOTE3OTY5LTQwIDQwdjE4NGgxNnYtMTg0YzAtMTMuMjUzOTA2IDEwLjc0NjA5NC0yNCAyNC0yNGgyMDB2NDBjLjAyNzM0NCAyMi4wODIwMzEgMTcuOTE3OTY5IDM5Ljk3MjY1NiA0MCA0MGg0MHYzMTJjMCAxMy4yNTM5MDYtMTAuNzQ2MDk0IDI0LTI0IDI0aC0xMjB2MTZoMTUyYzIyLjA4MjAzMS0uMDI3MzQ0IDM5Ljk3MjY1Ni0xNy45MTc5NjkgNDAtNDB2LTM2OGMtLjAyNzM0NC0yMi4wODIwMzEtMTcuOTE3OTY5LTM5Ljk3MjY1NjItNDAtNDB6bS00OCA4MGMtMTMuMjUzOTA2IDAtMjQtMTAuNzQ2MDk0LTI0LTI0di0yOC42ODc1bDUyLjY4NzUgNTIuNjg3NXptNzIgMzI4YzAgMTMuMjUzOTA2LTEwLjc0NjA5NCAyNC0yNCAyNGgtLjIwNzAzMWM1LjI5Mjk2OS02Ljg4MjgxMiA4LjE3NTc4MS0xNS4zMTY0MDYgOC4yMDcwMzEtMjR2LTMyMGMwLS4xNzU3ODEtLjA4OTg0NC0uMzI4MTI1LS4xMDU0NjktLjUwMzkwNi0uMDM5MDYyLS42OTkyMTktLjE3NTc4MS0xLjM5NDUzMi0uNDA2MjUtMi4wNTQ2ODgtLjA4OTg0My0uMjU3ODEyLS4xNTIzNDMtLjUwMzkwNi0uMjY1NjI1LS43NTM5MDYtLjM4NjcxOC0uODcxMDk0LS45MjU3ODEtMS42NjQwNjItMS41OTc2NTYtMi4zNDM3NWwtNjYuMzEyNS02Ni4zNDM3NWg2MC42ODc1YzEzLjI1MzkwNiAwIDI0IDEwLjc0NjA5NCAyNCAyNHptMCAwIi8+PHBhdGggZD0ibTE1MiAyMDh2MTZoMTY4djI0aC04MHYxNmg4MHYyNGgtMzJ2MTZoMzJ2MjRoLTMydjE2aDMydjI0aC00OHYxNmgxMzZ2LTE2aC03MnYtMjRoNzJ2LTE2aC03MnYtMjRoNzJ2LTE2aC03MnYtMjRoNzJ2LTE2aC03MnYtMjRoNzJ2LTE2aC03MnYtMjRoNzJ2LTE2aC0yNTZ2MTZoMTY4djI0em0wIDAiLz48cGF0aCBkPSJtMjcyIDQwMGgxMzZ2MTZoLTEzNnptMCAwIi8+PHBhdGggZD0ibTI0MCA1Nmg5NnYxNmgtOTZ6bTAgMCIvPjxwYXRoIGQ9Im0yNDAgODhoNDh2MTZoLTQ4em0wIDAiLz48cGF0aCBkPSJtMzA0IDg4aDMydjE2aC0zMnptMCAwIi8+PHBhdGggZD0ibTI0MCAxMjBoOTZ2MTZoLTk2em0wIDAiLz48cGF0aCBkPSJtMjY0IDQzMmgtOHYtOTZoOGM0LjQxNzk2OSAwIDgtMy41ODIwMzEgOC04di00MGMwLTMuNDkyMTg4LTIuMjY1NjI1LTYuNTgyMDMxLTUuNjAxNTYyLTcuNjMyODEybC0xMjgtNDBjLTEuNTU4NTk0LS40OTIxODgtMy4yMzgyODItLjQ5MjE4OC00Ljc5Njg3NiAwbC0xMjggNDBjLTMuMzM1OTM3IDEuMDUwNzgxLTUuNjAxNTYyIDQuMTQwNjI0LTUuNjAxNTYyIDcuNjMyODEydjQwYzAgNC40MTc5NjkgMy41ODIwMzEgOCA4IDhoOHY5NmgtOGMtNC40MTc5NjkgMC04IDMuNTgyMDMxLTggOHYzMmMwIDQuNDE3OTY5IDMuNTgyMDMxIDggOCA4aDI1NmM0LjQxNzk2OSAwIDgtMy41ODIwMzEgOC04di0zMmMwLTQuNDE3OTY5LTMuNTgyMDMxLTgtOC04em0tMjQgMGgtMTZ2LTk2aDE2em0tNDggMHYtOTZoMTZ2OTZ6bS02NCAwdi05NmgxNnY5NnptLTY0IDB2LTk2aDE2djk2em0zMi05NmgxNnY5NmgtMTZ6bTY0IDBoMTZ2OTZoLTE2em0tMTQ0LTQyLjEyMTA5NCAxMjAtMzcuNDk2MDk0IDEyMCAzNy40OTYwOTR2MjYuMTIxMDk0aC0yNDB6bTE2IDQyLjEyMTA5NGgxNnY5NmgtMTZ6bTIyNCAxMjhoLTI0MHYtMTZoMjQwem0wIDAiLz48cGF0aCBkPSJtMTUyIDI4OGMwIDguODM1OTM4LTcuMTY0MDYyIDE2LTE2IDE2cy0xNi03LjE2NDA2Mi0xNi0xNiA3LjE2NDA2Mi0xNiAxNi0xNiAxNiA3LjE2NDA2MiAxNiAxNnptMCAwIi8+PHBhdGggZD0ibTE3NiA0MHYxNmMtMTMuMjUzOTA2IDAtMjQgMTAuNzQ2MDk0LTI0IDI0czEwLjc0NjA5NCAyNCAyNCAyNGgxNmM0LjQxNzk2OSAwIDggMy41ODIwMzEgOCA4cy0zLjU4MjAzMSA4LTggOGgtMzJ2MTZoMTZ2MTZoMTZ2LTE2YzEzLjI1MzkwNiAwIDI0LTEwLjc0NjA5NCAyNC0yNHMtMTAuNzQ2MDk0LTI0LTI0LTI0aC0xNmMtNC40MTc5NjkgMC04LTMuNTgyMDMxLTgtOHMzLjU4MjAzMS04IDgtOGgzMnYtMTZoLTE2di0xNnptMCAwIi8+PC9zdmc+" />
        
        <div class="info">
        <strong>${solicitante.nomeCompleto}</strong>
        <strong>Feita em:
        <span>14/10/2020</span>
        </strong>
        <strong>Valor ganho: R$ <span>5,34</span></strong>
        </div>

        <strong id="local">Local: </strong> 
        <p id="local">${logradouro} - ${solicitante.complemento}</p>
        <strong id="local">Ponto de referência:</strong>
        <p id="local">${solicitante.pontoReferencia ? solicitante.pontoReferencia : "Não incluso"}</p>
        <strong id="local">Telefone de contato:</strong>
        <p id="local">${solicitante.telefone}</p>
        </li>
      </ul>
    </div>
    `,
    width: 700,
    confirmButtonColor: '#F09435',
  })
}