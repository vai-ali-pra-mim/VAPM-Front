import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import { FaBars } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom';
import { FaRegStar } from 'react-icons/fa';
import btnHistorico from '../../assets/btn-historico.png';
import btnExtrato from '../../assets/btn-extrato.png';
import Swal from 'sweetalert2';

import './style.css';

export default function Entregador() {

      const [posts, setPosts] = useState({})
      const [entregador, setEntregador] = useState({})

      // useEffect(()=>{
      //   api.get("posts").then(item=>{
      //     console.log(item.data)
      //   })

      // }, posts)

      useEffect(() => {
        console.log(JSON.parse(sessionStorage.getItem('usuario')).data)
        setEntregador(JSON.parse(sessionStorage.getItem('usuario')).data)
      }, entregador)
      

  const vouAli = () => {

    const htmlConteudo = `
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

      button:hover{
        filter: brightness(90%);
      }
      </style>
      
      <h2 id="titulo">insira os dados do local que irá</h2>

      <div class="local-data">
      <ul>

      <li>
      <strong>insira o tipo de estabelecimento</strong>
      <input placeholder="digite um local... ex:padaria" id="teste" />
      </li>
      
      <li>
      <strong>Digite o nome do local</strong>
      <input placeholder="digite o nome..." />
      </li>
      
      <li>
      <strong>Quantidade max de intens</strong>
      <input type="number" placeholder="ex: 10" />
      </li>
      
      <li>
      <strong>Quantidade max (Kg)</strong>
      <input type="number" placeholder="ex: 2Kg" />
      </li>

      </ul>
      </div>
      
      <div class="agendar">
      <h2>Deseja agendar o trajeto?</h2>
      <button type="submit">Sim</button>
      </div>
      
      <div class="agendar-cont" id="testet">
      <strong>insira a data desejada</strong> </br> 
      <input type="date" />
      </div>
      `

    Swal.fire({
      title: 'Entregar',
      html: `
            <span>${htmlConteudo}</span>
            `,
      // showCancelButton: true,

      // cancelButtonColor: '#d33',
      confirmButtonText: 'Vou ali',
      confirmButtonColor: '#F09435',
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
        return [
          console.log(document.getElementById('teste').value)
        ]
      },


    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Post realizado com sucesso!',
          'seu post foi finalizado com sucesso',
          'success'
        )
      }
    })
  }

  const historico = () => {
    Swal.fire({
      title: `Estregas Feitas`,
      html: `

      <style>

      h3{
        margin-top: 20px;
        margin-bottom: 15px;
        text-align: left;
        // font-size: large;
      }
      .feed-historico ul{
        width: 500px;
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
          margin-left: 20%;
        }
      
        .feed-historico ul li p {
          color: #737380;
          line-height: 21px;
          font-size: 16px;
          margin-left: 20%;
          margin-top: 5px;
          margin-bottom: 5px;
        }
      
        .feed-historico ul li #imgUser{
          position: absolute;
          width: 80px;
          margin-top: 10px;
          padding-right: 10px;
        }

        .feed-historico ul li #imgStar{
          width: 15px;
        }
    
        .feed-historico h1{
          text-align: center;
          margin-bottom: 20px;
        }
      </style> 
      <h3>Entregas feitas</h3>
       <div class="feed-historico">
        <ul>
          <li>
          <img id="imgUser" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDc4LjAyNCA0NzguMDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzguMDI0IDQ3OC4wMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDExLjcwMyw3My41NjFjLTQ1LjExNy00Ny4wOTMtMTA3LjU0Mi03My42Ny0xNzIuNzYtNzMuNTVDMTA3LjE0NS0wLjE1NSwwLjE2NiwxMDYuNTU0LDAsMjM4LjM1Mw0KCQkJYy0wLjA4Miw2NS4xNywyNi40OTIsMTI3LjUzOCw3My41NSwxNzIuNjIzYzAuMTM3LDAuMTM2LDAuMTg4LDAuMzQxLDAuMzI0LDAuNDYxYzEuMzgyLDEuMzMxLDIuODg0LDIuNDU4LDQuMjg0LDMuNzM4DQoJCQljMy44NCwzLjQxMyw3LjY4LDYuOTQ2LDExLjcyNSwxMC4yNGMyLjE2NywxLjcwNyw0LjQyLDMuNDEzLDYuNjM5LDQuOTgzYzMuODIzLDIuODUsNy42NDYsNS43LDExLjYzOSw4LjMyOQ0KCQkJYzIuNzE0LDEuNzA3LDUuNTEzLDMuNDEzLDguMjk0LDUuMTJjMy42ODYsMi4yMTksNy4zNTYsNC40NTQsMTEuMTYyLDYuNDg1YzMuMjI2LDEuNzA3LDYuNTE5LDMuMTc0LDkuNzk2LDQuNzI3DQoJCQljMy41ODQsMS43MDcsNy4xMTcsMy40MTMsMTAuNzg2LDQuOTQ5YzMuNjY5LDEuNTM2LDcuMzU2LDIuNzMxLDExLjA3Niw0LjA2MnM2LjkyOSwyLjU2LDEwLjQ5NiwzLjY1Mg0KCQkJYzQuMDI4LDEuMjEyLDguMTU4LDIuMTUsMTIuMjU0LDMuMTU3YzMuNDEzLDAuODM2LDYuNzI0LDEuNzkyLDEwLjI0LDIuNDc1YzQuNzEsMC45MzksOS40ODksMS41MzYsMTQuMjY4LDIuMTg1DQoJCQljMi45NTMsMC40MSw1LjgzNywwLjk5LDguODIzLDEuMjhjNy44MTcsMC43NjgsMTUuNzAxLDEuMTk1LDIzLjY1NCwxLjE5NXMxNS44MzgtMC40MjcsMjMuNjU0LTEuMTk1DQoJCQljMi45ODctMC4yOSw1Ljg3MS0wLjg3LDguODIzLTEuMjhjNC43NzktMC42NDksOS41NTctMS4yNDYsMTQuMjY4LTIuMTg1YzMuNDEzLTAuNjgzLDYuODI3LTEuNzA3LDEwLjI0LTIuNDc1DQoJCQljNC4wOTYtMS4wMDcsOC4yMjYtMS45NDYsMTIuMjU0LTMuMTU3YzMuNTY3LTEuMDkyLDcuMDE0LTIuNDIzLDEwLjQ5Ni0zLjY1MmMzLjQ4Mi0xLjIyOSw3LjQ0MS0yLjU2LDExLjA3Ni00LjA2Mg0KCQkJczcuMjAyLTMuMjYsMTAuNzg2LTQuOTQ5YzMuMjc3LTEuNTUzLDYuNTcxLTMuMDIxLDkuNzk2LTQuNzI3YzMuODA2LTIuMDMxLDcuNDc1LTQuMjY3LDExLjE2Mi02LjQ4NQ0KCQkJYzIuNzgyLTEuNzA3LDUuNTgxLTMuMjYsOC4yOTQtNS4xMmMzLjk5NC0yLjYyOCw3LjgxNy01LjQ3OCwxMS42MzktOC4zMjljMi4yMTktMS43MDcsNC40NzEtMy4yNDMsNi42MzktNC45ODMNCgkJCWM0LjA0NS0zLjI0Myw3Ljg4NS02LjY5LDExLjcyNS0xMC4yNGMxLjM5OS0xLjI4LDIuOTAxLTIuNDA2LDQuMjg0LTMuNzM4YzAuMTM2LTAuMTE5LDAuMTg4LTAuMzI0LDAuMzI0LTAuNDYxDQoJCQlDNDk5LjY0NCwzMTkuNzk4LDUwMi44ODEsMTY4LjczMiw0MTEuNzAzLDczLjU2MXogTTM3My4zNDQsMzkzLjEwN2MtMy4xMDYsMi43MzEtNi4zMTUsNS4zMjUtOS41NTcsNy44MzQNCgkJCWMtMS45MTEsMS40NjgtMy44MjMsMi45MTgtNS43ODYsNC4zMThjLTMuMDg5LDIuMjM2LTYuMjI5LDQuMzUyLTkuNDIxLDYuMzgzYy0yLjMyMSwxLjQ4NS00LjY5MywyLjkxOC03LjA4Myw0LjMxOA0KCQkJYy0zLjAwNCwxLjcwNy02LjA1OSwzLjQxMy05LjE0OCw1LjEyYy0yLjczMSwxLjM5OS01LjUxMywyLjcxNC04LjMxMSw0LjAxMXMtNS44ODgsMi42NzktOC45MDksMy44OTENCgkJCWMtMy4wMjEsMS4yMTItNi4yMjksMi4zNTUtOS4zODcsMy40MTNjLTIuODg0LDAuOTktNS43NjgsMi4wMTQtOC42ODcsMi44ODRjLTMuNDEzLDEuMDI0LTYuOTgsMS44Ni0xMC41MTMsMi43MTQNCgkJCWMtMi43NjUsMC42NDgtNS40OTUsMS4zODItOC4yOTQsMS45MjljLTQuMDQ1LDAuNzg1LTguMTc1LDEuMzMxLTEyLjMyMiwxLjg5NGMtMi4zNTUsMC4zMDctNC42OTMsMC43MzQtNy4wNjYsMC45NzMNCgkJCWMtNi41NTQsMC42MzEtMTMuMTkzLDEuMDA3LTE5LjksMS4wMDdzLTEzLjM0Ni0wLjM3NS0xOS45LTEuMDA3Yy0yLjM3Mi0wLjIzOS00LjcxLTAuNjY2LTcuMDY2LTAuOTczDQoJCQljLTQuMTQ3LTAuNTYzLTguMjc3LTEuMTA5LTEyLjMyMi0xLjg5NGMtMi43OTktMC41NDYtNS41My0xLjI4LTguMjk0LTEuOTI5Yy0zLjUzMy0wLjg1My03LjA0OS0xLjcwNy0xMC41MTMtMi43MTQNCgkJCWMtMi45MTgtMC44Ny01LjgwMy0xLjg5NC04LjY4Ny0yLjg4NGMtMy4xNTctMS4wOTItNi4zMTUtMi4yMDItOS4zODctMy40MTNjLTMuMDcyLTEuMjEyLTUuOTczLTIuNTQzLTguOTA5LTMuODkxDQoJCQlzLTUuNTgxLTIuNjExLTguMzExLTQuMDExYy0zLjA4OS0xLjYwNC02LjE0NC0zLjI5NC05LjE0OC01LjEyYy0yLjM4OS0xLjM5OS00Ljc2Mi0yLjgzMy03LjA4My00LjMxOA0KCQkJYy0zLjE5MS0yLjAzMS02LjMzMi00LjE0Ny05LjQyMS02LjM4M2MtMS45NjMtMS4zOTktMy44NzQtMi44NS01Ljc4Ni00LjMxOGMtMy4yNDMtMi41MDktNi40NTEtNS4xMi05LjU1Ny03LjgzNA0KCQkJYy0wLjc1MS0wLjU2My0xLjQzNC0xLjI4LTIuMTY3LTEuOTI5YzAuNzYzLTU4LjA1NywzOC4wNi0xMDkuMzIxLDkzLjA2NS0xMjcuOTE1YzI3LjUwMywxMy4wODMsNTkuNDM1LDEzLjA4Myw4Ni45MzgsMA0KCQkJYzU1LjAwNCwxOC41OTQsOTIuMzAxLDY5Ljg1Nyw5My4wNjUsMTI3LjkxNUMzNzQuNzYsMzkxLjgyNywzNzQuMDc3LDM5Mi40NzYsMzczLjM0NCwzOTMuMTA3eiBNMTc5LjQzLDEzNi44NDkNCgkJCWMxOC40NzktMzIuODY0LDYwLjEtNDQuNTI1LDkyLjk2NC0yNi4wNDZzNDQuNTI1LDYwLjEsMjYuMDQ2LDkyLjk2NGMtNi4xMzEsMTAuOTA0LTE1LjE0MSwxOS45MTQtMjYuMDQ2LDI2LjA0Ng0KCQkJYy0wLjA4NSwwLTAuMTg4LDAtMC4yOSwwLjEwMmMtNC41MjYsMi41MTktOS4zMDksNC41NDUtMTQuMjY4LDYuMDQyYy0wLjg4NywwLjI1Ni0xLjcwNywwLjU5Ny0yLjY0NSwwLjgxOQ0KCQkJYy0xLjcwNywwLjQ0NC0zLjQ5OSwwLjc1MS01LjI1NywxLjA1OGMtMy4zMSwwLjU3OS02LjY1OSwwLjkxNS0xMC4wMTgsMS4wMDdoLTEuOTQ2Yy0zLjM1OS0wLjA5Mi02LjcwOC0wLjQyOC0xMC4wMTgtMS4wMDcNCgkJCWMtMS43MDctMC4zMDctMy41MTYtMC42MTQtNS4yNTYtMS4wNThjLTAuOTA1LTAuMjIyLTEuNzA3LTAuNTYzLTIuNjQ1LTAuODE5Yy00Ljk1OS0xLjQ5Ny05Ljc0Mi0zLjUyMi0xNC4yNjgtNi4wNDJsLTAuMzA3LTAuMTAyDQoJCQlDMTcyLjYxMiwyMTEuMzM0LDE2MC45NTEsMTY5LjcxMywxNzkuNDMsMTM2Ljg0OXogTTQwNS43NTMsMzU3LjMzNkw0MDUuNzUzLDM1Ny4zMzZjLTEwLjk1Mi01MS4wODMtNDQuNTktOTQuMzktOTEuMzc1LTExNy42NA0KCQkJYzM4LjI0NS00MS42NjEsMzUuNDc1LTEwNi40MzgtNi4xODYtMTQ0LjY4M2MtNDEuNjYxLTM4LjI0NS0xMDYuNDM4LTM1LjQ3NS0xNDQuNjgzLDYuMTg2DQoJCQljLTM1Ljk1NCwzOS4xNjYtMzUuOTU0LDk5LjMzMiwwLDEzOC40OTdjLTQ2Ljc4NSwyMy4yNTEtODAuNDIzLDY2LjU1Ny05MS4zNzUsMTE3LjY0QzYuNjksMjY1LjE1MywyOC4zNjYsMTM3LjM3MSwxMjAuNTQ5LDcxLjkyNw0KCQkJczIxOS45NjUtNDMuNzY4LDI4NS40MDksNDguNDE1YzI0LjYwMSwzNC42NTMsMzcuODA3LDc2LjEwNCwzNy43ODYsMTE4LjYwMkM0NDMuNzQ0LDI4MS40MDUsNDMwLjQ2LDMyMi44MDIsNDA1Ljc1MywzNTcuMzM2eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
          <strong>Robert Keneddy</strong>
          <span><img id="imgStar" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMXB0IiB2aWV3Qm94PSIwIC0xMCA1MTEuOTg2ODUgNTExIiB3aWR0aD0iNTExcHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTUxMC42NTIzNDQgMTg1LjkwMjM0NGMtMy4zNTE1NjMtMTAuMzY3MTg4LTEyLjU0Njg3NS0xNy43MzA0NjktMjMuNDI1NzgyLTE4LjcxMDkzOGwtMTQ3Ljc3MzQzNy0xMy40MTc5NjgtNTguNDMzNTk0LTEzNi43Njk1MzJjLTQuMzA4NTkzLTEwLjAyMzQzNy0xNC4xMjEwOTMtMTYuNTExNzE4LTI1LjAyMzQzNy0xNi41MTE3MThzLTIwLjcxNDg0NCA2LjQ4ODI4MS0yNS4wMjM0MzggMTYuNTM1MTU2bC01OC40MzM1OTQgMTM2Ljc0NjA5NC0xNDcuNzk2ODc0IDEzLjQxNzk2OGMtMTAuODU5Mzc2IDEuMDAzOTA2LTIwLjAzMTI1IDguMzQzNzUtMjMuNDAyMzQ0IDE4LjcxMDkzOC0zLjM3MTA5NCAxMC4zNjcxODctLjI1NzgxMyAyMS43MzgyODEgNy45NTcwMzEgMjguOTA2MjVsMTExLjY5OTIxOSA5Ny45NjA5MzctMzIuOTM3NSAxNDUuMDg5ODQ0Yy0yLjQxMDE1NiAxMC42Njc5NjkgMS43MzA0NjggMjEuNjk1MzEzIDEwLjU4MjAzMSAyOC4wOTM3NSA0Ljc1NzgxMyAzLjQzNzUgMTAuMzI0MjE5IDUuMTg3NSAxNS45Mzc1IDUuMTg3NSA0LjgzOTg0NCAwIDkuNjQwNjI1LTEuMzA0Njg3IDEzLjk0OTIxOS0zLjg4MjgxM2wxMjcuNDY4NzUtNzYuMTgzNTkzIDEyNy40MjE4NzUgNzYuMTgzNTkzYzkuMzI0MjE5IDUuNjA5Mzc2IDIxLjA3ODEyNSA1LjA5NzY1NyAyOS45MTAxNTYtMS4zMDQ2ODcgOC44NTU0NjktNi40MTc5NjkgMTIuOTkyMTg3LTE3LjQ0OTIxOSAxMC41ODIwMzEtMjguMDkzNzVsLTMyLjkzNzUtMTQ1LjA4OTg0NCAxMTEuNjk5MjE5LTk3Ljk0MTQwNmM4LjIxNDg0NC03LjE4NzUgMTEuMzUxNTYzLTE4LjUzOTA2MyA3Ljk4MDQ2OS0yOC45MjU3ODF6bTAgMCIgZmlsbD0iI2ZmYzEwNyIvPjwvc3ZnPg==" />
          4,7
          </span>
          <p>Mercado - Pão de açucar</p>

          <p>feita em 12/10/2020</p> 
          <strong>valor ganho</strong> 
          <strong>R$ 2,40 - 5,00</strong>
          </li>
        </ul>
      </div>

      `,
      width: 600,
      confirmButtonColor: '#F09435',
    })
  }

  const extrato = () => {
    Swal.fire({
      title: `Extrato`,
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

      <h2>Saldo em conta: R$ <span>17,79</span></h2>
       <div class="feed-historico">
        <ul>
          <li>
          <img id="extratoBanc"src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ4MHB0IiB2aWV3Qm94PSIwIDAgNDgwIDQ4MCIgd2lkdGg9IjQ4MHB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00NDAgMGgtMjg4Yy0yMi4wODIwMzEuMDI3MzQzOC0zOS45NzI2NTYgMTcuOTE3OTY5LTQwIDQwdjE4NGgxNnYtMTg0YzAtMTMuMjUzOTA2IDEwLjc0NjA5NC0yNCAyNC0yNGgyMDB2NDBjLjAyNzM0NCAyMi4wODIwMzEgMTcuOTE3OTY5IDM5Ljk3MjY1NiA0MCA0MGg0MHYzMTJjMCAxMy4yNTM5MDYtMTAuNzQ2MDk0IDI0LTI0IDI0aC0xMjB2MTZoMTUyYzIyLjA4MjAzMS0uMDI3MzQ0IDM5Ljk3MjY1Ni0xNy45MTc5NjkgNDAtNDB2LTM2OGMtLjAyNzM0NC0yMi4wODIwMzEtMTcuOTE3OTY5LTM5Ljk3MjY1NjItNDAtNDB6bS00OCA4MGMtMTMuMjUzOTA2IDAtMjQtMTAuNzQ2MDk0LTI0LTI0di0yOC42ODc1bDUyLjY4NzUgNTIuNjg3NXptNzIgMzI4YzAgMTMuMjUzOTA2LTEwLjc0NjA5NCAyNC0yNCAyNGgtLjIwNzAzMWM1LjI5Mjk2OS02Ljg4MjgxMiA4LjE3NTc4MS0xNS4zMTY0MDYgOC4yMDcwMzEtMjR2LTMyMGMwLS4xNzU3ODEtLjA4OTg0NC0uMzI4MTI1LS4xMDU0NjktLjUwMzkwNi0uMDM5MDYyLS42OTkyMTktLjE3NTc4MS0xLjM5NDUzMi0uNDA2MjUtMi4wNTQ2ODgtLjA4OTg0My0uMjU3ODEyLS4xNTIzNDMtLjUwMzkwNi0uMjY1NjI1LS43NTM5MDYtLjM4NjcxOC0uODcxMDk0LS45MjU3ODEtMS42NjQwNjItMS41OTc2NTYtMi4zNDM3NWwtNjYuMzEyNS02Ni4zNDM3NWg2MC42ODc1YzEzLjI1MzkwNiAwIDI0IDEwLjc0NjA5NCAyNCAyNHptMCAwIi8+PHBhdGggZD0ibTE1MiAyMDh2MTZoMTY4djI0aC04MHYxNmg4MHYyNGgtMzJ2MTZoMzJ2MjRoLTMydjE2aDMydjI0aC00OHYxNmgxMzZ2LTE2aC03MnYtMjRoNzJ2LTE2aC03MnYtMjRoNzJ2LTE2aC03MnYtMjRoNzJ2LTE2aC03MnYtMjRoNzJ2LTE2aC03MnYtMjRoNzJ2LTE2aC0yNTZ2MTZoMTY4djI0em0wIDAiLz48cGF0aCBkPSJtMjcyIDQwMGgxMzZ2MTZoLTEzNnptMCAwIi8+PHBhdGggZD0ibTI0MCA1Nmg5NnYxNmgtOTZ6bTAgMCIvPjxwYXRoIGQ9Im0yNDAgODhoNDh2MTZoLTQ4em0wIDAiLz48cGF0aCBkPSJtMzA0IDg4aDMydjE2aC0zMnptMCAwIi8+PHBhdGggZD0ibTI0MCAxMjBoOTZ2MTZoLTk2em0wIDAiLz48cGF0aCBkPSJtMjY0IDQzMmgtOHYtOTZoOGM0LjQxNzk2OSAwIDgtMy41ODIwMzEgOC04di00MGMwLTMuNDkyMTg4LTIuMjY1NjI1LTYuNTgyMDMxLTUuNjAxNTYyLTcuNjMyODEybC0xMjgtNDBjLTEuNTU4NTk0LS40OTIxODgtMy4yMzgyODItLjQ5MjE4OC00Ljc5Njg3NiAwbC0xMjggNDBjLTMuMzM1OTM3IDEuMDUwNzgxLTUuNjAxNTYyIDQuMTQwNjI0LTUuNjAxNTYyIDcuNjMyODEydjQwYzAgNC40MTc5NjkgMy41ODIwMzEgOCA4IDhoOHY5NmgtOGMtNC40MTc5NjkgMC04IDMuNTgyMDMxLTggOHYzMmMwIDQuNDE3OTY5IDMuNTgyMDMxIDggOCA4aDI1NmM0LjQxNzk2OSAwIDgtMy41ODIwMzEgOC04di0zMmMwLTQuNDE3OTY5LTMuNTgyMDMxLTgtOC04em0tMjQgMGgtMTZ2LTk2aDE2em0tNDggMHYtOTZoMTZ2OTZ6bS02NCAwdi05NmgxNnY5NnptLTY0IDB2LTk2aDE2djk2em0zMi05NmgxNnY5NmgtMTZ6bTY0IDBoMTZ2OTZoLTE2em0tMTQ0LTQyLjEyMTA5NCAxMjAtMzcuNDk2MDk0IDEyMCAzNy40OTYwOTR2MjYuMTIxMDk0aC0yNDB6bTE2IDQyLjEyMTA5NGgxNnY5NmgtMTZ6bTIyNCAxMjhoLTI0MHYtMTZoMjQwem0wIDAiLz48cGF0aCBkPSJtMTUyIDI4OGMwIDguODM1OTM4LTcuMTY0MDYyIDE2LTE2IDE2cy0xNi03LjE2NDA2Mi0xNi0xNiA3LjE2NDA2Mi0xNiAxNi0xNiAxNiA3LjE2NDA2MiAxNiAxNnptMCAwIi8+PHBhdGggZD0ibTE3NiA0MHYxNmMtMTMuMjUzOTA2IDAtMjQgMTAuNzQ2MDk0LTI0IDI0czEwLjc0NjA5NCAyNCAyNCAyNGgxNmM0LjQxNzk2OSAwIDggMy41ODIwMzEgOCA4cy0zLjU4MjAzMSA4LTggOGgtMzJ2MTZoMTZ2MTZoMTZ2LTE2YzEzLjI1MzkwNiAwIDI0LTEwLjc0NjA5NCAyNC0yNHMtMTAuNzQ2MDk0LTI0LTI0LTI0aC0xNmMtNC40MTc5NjkgMC04LTMuNTgyMDMxLTgtOHMzLjU4MjAzMS04IDgtOGgzMnYtMTZoLTE2di0xNnptMCAwIi8+PC9zdmc+" />
          
          <div class="info">
          <p>Robert Keneddy</p>
          <strong>Feita em:
          <span>14/10/2020</span>
          </strong>
          <strong>Valor ganho: R$ <span>5,34</span></strong>
          </div>

          <strong id="local">Local: </strong> 
          <strong id="local">Farmácia - Drogasil</strong>
          </li>
        </ul>
      </div>
      `,
      width: 700,
      confirmButtonColor: '#F09435',
    })
  }

  let timerInterval = () => {
    Swal.fire({
      title: 'Notificando o consumidor, que você irá ali!',
      timer: 2500,
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        }, 100)
      }
    })
  }

  return (
    <div className="container-entregador">
      <header>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <FaBars size={30} />
      </header>

      <aside>
        <img src={btnHistorico} onClick={historico} alt="Veja o historico de entregas" />
        <img src={btnExtrato} onClick={extrato} alt="Extrato" />
      </aside>

      <div className="user">
        <span>{String(entregador.nomeCompleto).split(" ")[0]} <FaRegUserCircle size={30} /> R${String(entregador.saldo)}</span>
        <button type="submit" onClick={vouAli}>VOU ALI</button>

        <div className="feed">

          <ul>
            <h1>Entregas pendentes</h1>
            <li onClick={timerInterval}>
              <FaRegUserCircle id="iconFeed" size={60} />
              <strong>Robert Keneddy</strong>
              <span><FaRegStar color="yellow" /> 4,7</span>
              <p>Irá ao mercado - Pão de açucar - em 5 min</p>

              <strong>aceita - até 5Kg e 10 intens</strong>
              <p>R$ 2,40 - 5,00</p>
            </li>
          </ul>
        </div>
      </div>


    </div>
  )
}