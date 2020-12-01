import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import btnVeja from '../../assets/btn-veja.png';
import btnFavoritos from '../../assets/btn-favoritos.png';
import Swal from 'sweetalert2';
import api from '../../services/api'
import MapChart from '../../components/MapChart'
import { Link, useHistory } from 'react-router-dom';
import './style.css';

export default function Consumidor() {
    const [mostrarMapa, setMostrarMapa] = useState(false);
    const [usuario, setUsuario] = useState({})
    const [posts, setPosts] = useState([])

    useEffect(() => {
        var user = JSON.parse(sessionStorage.getItem('usuario')).data;
        setUsuario(user)

    }, [])

    useEffect(async () => {
        var user = JSON.parse(sessionStorage.getItem('usuario')).data;
        console.log(String(usuario.coordenadas))
        let p = await api.get(`/usuarios/entregadores/${user.coordenadas}`)

        setPosts(p.data);
        console.log(p.data);
    }, [])

 

    function encontrarEntregadorEspecifico(e) {
        console.log(e.target.value)

        posts.map(item => {
            if (item.nomeCompleto.includes(`${e.target.value}`))
                console.log(item)

        })

    }

    useEffect(()=>{
        document.getElementById("map").style.display = "none";
    },[])

    const melhoresEnt = () => {
        if (mostrarMapa) {
            document.getElementById("posts").style.display = "block";
            document.getElementById("map").style.display = "none";
            setMostrarMapa(false);
        }
        else {
            document.getElementById("posts").style.display = "none";
            document.getElementById("map").style.display = "block";
            setMostrarMapa(true);
        }

    //     const melhoresEnt = () => {
    //     Swal.fire({
    //         html:`
    //         <style>
    //         h2{
    //             margin-top: 20px;
    //             margin-bottom: 15px;
    //             text-align: left;
    //             // font-size: large;
    //           }

    //           #imgUser1{
    //               width: 30px;
    //           } 

    //           .feed-entregadores ul{
    //             width: 550px;
    //             display: grid;
    //             grid-template-columns: repeat(1, 1fr);
    //             list-style: none;
    //             justify-content: center;
    //             cursor: pointer;
    //             margin: 0 auto;   
    //           }
              
    //           .feed-entregadores li {
    //             background: linear-gradient(180deg, rgba(248, 85, 42, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #FFFEFE;;
    //             padding: 24px;
    //             border-radius: 8px;
    //             position: relative;
    //             text-align: left;
    //             margin-bottom: 20px;
    //           }

    //             .feed-entregadores ul li #imgUser2{
    //               position: absolute;
    //               width: 80px;
    //               margin-top: 10px;
    //               padding-right: 10px;
    //             }
        
    //             .feed-entregadores ul li #imgRun{
    //              width: 50px;
    //             }

    //             .feed-entregadores ul li{
    //                 display: flex;
    //                 flex-direction: row;
    //             }

    //             .feed-entregadores .info{
    //              margin-left: 25%;
    //              display: inline-block;
    //             }

    //             .local-info{
    //              margin-left: 40px;
    //             }

    //         </style>
    //         <strong><span>José</span>
    //         <img id="imgUser1" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDc4LjAyNCA0NzguMDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzguMDI0IDQ3OC4wMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDExLjcwMyw3My41NjFjLTQ1LjExNy00Ny4wOTMtMTA3LjU0Mi03My42Ny0xNzIuNzYtNzMuNTVDMTA3LjE0NS0wLjE1NSwwLjE2NiwxMDYuNTU0LDAsMjM4LjM1Mw0KCQkJYy0wLjA4Miw2NS4xNywyNi40OTIsMTI3LjUzOCw3My41NSwxNzIuNjIzYzAuMTM3LDAuMTM2LDAuMTg4LDAuMzQxLDAuMzI0LDAuNDYxYzEuMzgyLDEuMzMxLDIuODg0LDIuNDU4LDQuMjg0LDMuNzM4DQoJCQljMy44NCwzLjQxMyw3LjY4LDYuOTQ2LDExLjcyNSwxMC4yNGMyLjE2NywxLjcwNyw0LjQyLDMuNDEzLDYuNjM5LDQuOTgzYzMuODIzLDIuODUsNy42NDYsNS43LDExLjYzOSw4LjMyOQ0KCQkJYzIuNzE0LDEuNzA3LDUuNTEzLDMuNDEzLDguMjk0LDUuMTJjMy42ODYsMi4yMTksNy4zNTYsNC40NTQsMTEuMTYyLDYuNDg1YzMuMjI2LDEuNzA3LDYuNTE5LDMuMTc0LDkuNzk2LDQuNzI3DQoJCQljMy41ODQsMS43MDcsNy4xMTcsMy40MTMsMTAuNzg2LDQuOTQ5YzMuNjY5LDEuNTM2LDcuMzU2LDIuNzMxLDExLjA3Niw0LjA2MnM2LjkyOSwyLjU2LDEwLjQ5NiwzLjY1Mg0KCQkJYzQuMDI4LDEuMjEyLDguMTU4LDIuMTUsMTIuMjU0LDMuMTU3YzMuNDEzLDAuODM2LDYuNzI0LDEuNzkyLDEwLjI0LDIuNDc1YzQuNzEsMC45MzksOS40ODksMS41MzYsMTQuMjY4LDIuMTg1DQoJCQljMi45NTMsMC40MSw1LjgzNywwLjk5LDguODIzLDEuMjhjNy44MTcsMC43NjgsMTUuNzAxLDEuMTk1LDIzLjY1NCwxLjE5NXMxNS44MzgtMC40MjcsMjMuNjU0LTEuMTk1DQoJCQljMi45ODctMC4yOSw1Ljg3MS0wLjg3LDguODIzLTEuMjhjNC43NzktMC42NDksOS41NTctMS4yNDYsMTQuMjY4LTIuMTg1YzMuNDEzLTAuNjgzLDYuODI3LTEuNzA3LDEwLjI0LTIuNDc1DQoJCQljNC4wOTYtMS4wMDcsOC4yMjYtMS45NDYsMTIuMjU0LTMuMTU3YzMuNTY3LTEuMDkyLDcuMDE0LTIuNDIzLDEwLjQ5Ni0zLjY1MmMzLjQ4Mi0xLjIyOSw3LjQ0MS0yLjU2LDExLjA3Ni00LjA2Mg0KCQkJczcuMjAyLTMuMjYsMTAuNzg2LTQuOTQ5YzMuMjc3LTEuNTUzLDYuNTcxLTMuMDIxLDkuNzk2LTQuNzI3YzMuODA2LTIuMDMxLDcuNDc1LTQuMjY3LDExLjE2Mi02LjQ4NQ0KCQkJYzIuNzgyLTEuNzA3LDUuNTgxLTMuMjYsOC4yOTQtNS4xMmMzLjk5NC0yLjYyOCw3LjgxNy01LjQ3OCwxMS42MzktOC4zMjljMi4yMTktMS43MDcsNC40NzEtMy4yNDMsNi42MzktNC45ODMNCgkJCWM0LjA0NS0zLjI0Myw3Ljg4NS02LjY5LDExLjcyNS0xMC4yNGMxLjM5OS0xLjI4LDIuOTAxLTIuNDA2LDQuMjg0LTMuNzM4YzAuMTM2LTAuMTE5LDAuMTg4LTAuMzI0LDAuMzI0LTAuNDYxDQoJCQlDNDk5LjY0NCwzMTkuNzk4LDUwMi44ODEsMTY4LjczMiw0MTEuNzAzLDczLjU2MXogTTM3My4zNDQsMzkzLjEwN2MtMy4xMDYsMi43MzEtNi4zMTUsNS4zMjUtOS41NTcsNy44MzQNCgkJCWMtMS45MTEsMS40NjgtMy44MjMsMi45MTgtNS43ODYsNC4zMThjLTMuMDg5LDIuMjM2LTYuMjI5LDQuMzUyLTkuNDIxLDYuMzgzYy0yLjMyMSwxLjQ4NS00LjY5MywyLjkxOC03LjA4Myw0LjMxOA0KCQkJYy0zLjAwNCwxLjcwNy02LjA1OSwzLjQxMy05LjE0OCw1LjEyYy0yLjczMSwxLjM5OS01LjUxMywyLjcxNC04LjMxMSw0LjAxMXMtNS44ODgsMi42NzktOC45MDksMy44OTENCgkJCWMtMy4wMjEsMS4yMTItNi4yMjksMi4zNTUtOS4zODcsMy40MTNjLTIuODg0LDAuOTktNS43NjgsMi4wMTQtOC42ODcsMi44ODRjLTMuNDEzLDEuMDI0LTYuOTgsMS44Ni0xMC41MTMsMi43MTQNCgkJCWMtMi43NjUsMC42NDgtNS40OTUsMS4zODItOC4yOTQsMS45MjljLTQuMDQ1LDAuNzg1LTguMTc1LDEuMzMxLTEyLjMyMiwxLjg5NGMtMi4zNTUsMC4zMDctNC42OTMsMC43MzQtNy4wNjYsMC45NzMNCgkJCWMtNi41NTQsMC42MzEtMTMuMTkzLDEuMDA3LTE5LjksMS4wMDdzLTEzLjM0Ni0wLjM3NS0xOS45LTEuMDA3Yy0yLjM3Mi0wLjIzOS00LjcxLTAuNjY2LTcuMDY2LTAuOTczDQoJCQljLTQuMTQ3LTAuNTYzLTguMjc3LTEuMTA5LTEyLjMyMi0xLjg5NGMtMi43OTktMC41NDYtNS41My0xLjI4LTguMjk0LTEuOTI5Yy0zLjUzMy0wLjg1My03LjA0OS0xLjcwNy0xMC41MTMtMi43MTQNCgkJCWMtMi45MTgtMC44Ny01LjgwMy0xLjg5NC04LjY4Ny0yLjg4NGMtMy4xNTctMS4wOTItNi4zMTUtMi4yMDItOS4zODctMy40MTNjLTMuMDcyLTEuMjEyLTUuOTczLTIuNTQzLTguOTA5LTMuODkxDQoJCQlzLTUuNTgxLTIuNjExLTguMzExLTQuMDExYy0zLjA4OS0xLjYwNC02LjE0NC0zLjI5NC05LjE0OC01LjEyYy0yLjM4OS0xLjM5OS00Ljc2Mi0yLjgzMy03LjA4My00LjMxOA0KCQkJYy0zLjE5MS0yLjAzMS02LjMzMi00LjE0Ny05LjQyMS02LjM4M2MtMS45NjMtMS4zOTktMy44NzQtMi44NS01Ljc4Ni00LjMxOGMtMy4yNDMtMi41MDktNi40NTEtNS4xMi05LjU1Ny03LjgzNA0KCQkJYy0wLjc1MS0wLjU2My0xLjQzNC0xLjI4LTIuMTY3LTEuOTI5YzAuNzYzLTU4LjA1NywzOC4wNi0xMDkuMzIxLDkzLjA2NS0xMjcuOTE1YzI3LjUwMywxMy4wODMsNTkuNDM1LDEzLjA4Myw4Ni45MzgsMA0KCQkJYzU1LjAwNCwxOC41OTQsOTIuMzAxLDY5Ljg1Nyw5My4wNjUsMTI3LjkxNUMzNzQuNzYsMzkxLjgyNywzNzQuMDc3LDM5Mi40NzYsMzczLjM0NCwzOTMuMTA3eiBNMTc5LjQzLDEzNi44NDkNCgkJCWMxOC40NzktMzIuODY0LDYwLjEtNDQuNTI1LDkyLjk2NC0yNi4wNDZzNDQuNTI1LDYwLjEsMjYuMDQ2LDkyLjk2NGMtNi4xMzEsMTAuOTA0LTE1LjE0MSwxOS45MTQtMjYuMDQ2LDI2LjA0Ng0KCQkJYy0wLjA4NSwwLTAuMTg4LDAtMC4yOSwwLjEwMmMtNC41MjYsMi41MTktOS4zMDksNC41NDUtMTQuMjY4LDYuMDQyYy0wLjg4NywwLjI1Ni0xLjcwNywwLjU5Ny0yLjY0NSwwLjgxOQ0KCQkJYy0xLjcwNywwLjQ0NC0zLjQ5OSwwLjc1MS01LjI1NywxLjA1OGMtMy4zMSwwLjU3OS02LjY1OSwwLjkxNS0xMC4wMTgsMS4wMDdoLTEuOTQ2Yy0zLjM1OS0wLjA5Mi02LjcwOC0wLjQyOC0xMC4wMTgtMS4wMDcNCgkJCWMtMS43MDctMC4zMDctMy41MTYtMC42MTQtNS4yNTYtMS4wNThjLTAuOTA1LTAuMjIyLTEuNzA3LTAuNTYzLTIuNjQ1LTAuODE5Yy00Ljk1OS0xLjQ5Ny05Ljc0Mi0zLjUyMi0xNC4yNjgtNi4wNDJsLTAuMzA3LTAuMTAyDQoJCQlDMTcyLjYxMiwyMTEuMzM0LDE2MC45NTEsMTY5LjcxMywxNzkuNDMsMTM2Ljg0OXogTTQwNS43NTMsMzU3LjMzNkw0MDUuNzUzLDM1Ny4zMzZjLTEwLjk1Mi01MS4wODMtNDQuNTktOTQuMzktOTEuMzc1LTExNy42NA0KCQkJYzM4LjI0NS00MS42NjEsMzUuNDc1LTEwNi40MzgtNi4xODYtMTQ0LjY4M2MtNDEuNjYxLTM4LjI0NS0xMDYuNDM4LTM1LjQ3NS0xNDQuNjgzLDYuMTg2DQoJCQljLTM1Ljk1NCwzOS4xNjYtMzUuOTU0LDk5LjMzMiwwLDEzOC40OTdjLTQ2Ljc4NSwyMy4yNTEtODAuNDIzLDY2LjU1Ny05MS4zNzUsMTE3LjY0QzYuNjksMjY1LjE1MywyOC4zNjYsMTM3LjM3MSwxMjAuNTQ5LDcxLjkyNw0KCQkJczIxOS45NjUtNDMuNzY4LDI4NS40MDksNDguNDE1YzI0LjYwMSwzNC42NTMsMzcuODA3LDc2LjEwNCwzNy43ODYsMTE4LjYwMkM0NDMuNzQ0LDI4MS40MDUsNDMwLjQ2LDMyMi44MDIsNDA1Ljc1MywzNTcuMzM2eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
    //         </strong>

    //         <h2>Melhores entregadores</h2>

    //         <div class="feed-entregadores">
    //         <ul>
    //           <li>
    //           <img id="imgUser2" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDc4LjAyNCA0NzguMDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzguMDI0IDQ3OC4wMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDExLjcwMyw3My41NjFjLTQ1LjExNy00Ny4wOTMtMTA3LjU0Mi03My42Ny0xNzIuNzYtNzMuNTVDMTA3LjE0NS0wLjE1NSwwLjE2NiwxMDYuNTU0LDAsMjM4LjM1Mw0KCQkJYy0wLjA4Miw2NS4xNywyNi40OTIsMTI3LjUzOCw3My41NSwxNzIuNjIzYzAuMTM3LDAuMTM2LDAuMTg4LDAuMzQxLDAuMzI0LDAuNDYxYzEuMzgyLDEuMzMxLDIuODg0LDIuNDU4LDQuMjg0LDMuNzM4DQoJCQljMy44NCwzLjQxMyw3LjY4LDYuOTQ2LDExLjcyNSwxMC4yNGMyLjE2NywxLjcwNyw0LjQyLDMuNDEzLDYuNjM5LDQuOTgzYzMuODIzLDIuODUsNy42NDYsNS43LDExLjYzOSw4LjMyOQ0KCQkJYzIuNzE0LDEuNzA3LDUuNTEzLDMuNDEzLDguMjk0LDUuMTJjMy42ODYsMi4yMTksNy4zNTYsNC40NTQsMTEuMTYyLDYuNDg1YzMuMjI2LDEuNzA3LDYuNTE5LDMuMTc0LDkuNzk2LDQuNzI3DQoJCQljMy41ODQsMS43MDcsNy4xMTcsMy40MTMsMTAuNzg2LDQuOTQ5YzMuNjY5LDEuNTM2LDcuMzU2LDIuNzMxLDExLjA3Niw0LjA2MnM2LjkyOSwyLjU2LDEwLjQ5NiwzLjY1Mg0KCQkJYzQuMDI4LDEuMjEyLDguMTU4LDIuMTUsMTIuMjU0LDMuMTU3YzMuNDEzLDAuODM2LDYuNzI0LDEuNzkyLDEwLjI0LDIuNDc1YzQuNzEsMC45MzksOS40ODksMS41MzYsMTQuMjY4LDIuMTg1DQoJCQljMi45NTMsMC40MSw1LjgzNywwLjk5LDguODIzLDEuMjhjNy44MTcsMC43NjgsMTUuNzAxLDEuMTk1LDIzLjY1NCwxLjE5NXMxNS44MzgtMC40MjcsMjMuNjU0LTEuMTk1DQoJCQljMi45ODctMC4yOSw1Ljg3MS0wLjg3LDguODIzLTEuMjhjNC43NzktMC42NDksOS41NTctMS4yNDYsMTQuMjY4LTIuMTg1YzMuNDEzLTAuNjgzLDYuODI3LTEuNzA3LDEwLjI0LTIuNDc1DQoJCQljNC4wOTYtMS4wMDcsOC4yMjYtMS45NDYsMTIuMjU0LTMuMTU3YzMuNTY3LTEuMDkyLDcuMDE0LTIuNDIzLDEwLjQ5Ni0zLjY1MmMzLjQ4Mi0xLjIyOSw3LjQ0MS0yLjU2LDExLjA3Ni00LjA2Mg0KCQkJczcuMjAyLTMuMjYsMTAuNzg2LTQuOTQ5YzMuMjc3LTEuNTUzLDYuNTcxLTMuMDIxLDkuNzk2LTQuNzI3YzMuODA2LTIuMDMxLDcuNDc1LTQuMjY3LDExLjE2Mi02LjQ4NQ0KCQkJYzIuNzgyLTEuNzA3LDUuNTgxLTMuMjYsOC4yOTQtNS4xMmMzLjk5NC0yLjYyOCw3LjgxNy01LjQ3OCwxMS42MzktOC4zMjljMi4yMTktMS43MDcsNC40NzEtMy4yNDMsNi42MzktNC45ODMNCgkJCWM0LjA0NS0zLjI0Myw3Ljg4NS02LjY5LDExLjcyNS0xMC4yNGMxLjM5OS0xLjI4LDIuOTAxLTIuNDA2LDQuMjg0LTMuNzM4YzAuMTM2LTAuMTE5LDAuMTg4LTAuMzI0LDAuMzI0LTAuNDYxDQoJCQlDNDk5LjY0NCwzMTkuNzk4LDUwMi44ODEsMTY4LjczMiw0MTEuNzAzLDczLjU2MXogTTM3My4zNDQsMzkzLjEwN2MtMy4xMDYsMi43MzEtNi4zMTUsNS4zMjUtOS41NTcsNy44MzQNCgkJCWMtMS45MTEsMS40NjgtMy44MjMsMi45MTgtNS43ODYsNC4zMThjLTMuMDg5LDIuMjM2LTYuMjI5LDQuMzUyLTkuNDIxLDYuMzgzYy0yLjMyMSwxLjQ4NS00LjY5MywyLjkxOC03LjA4Myw0LjMxOA0KCQkJYy0zLjAwNCwxLjcwNy02LjA1OSwzLjQxMy05LjE0OCw1LjEyYy0yLjczMSwxLjM5OS01LjUxMywyLjcxNC04LjMxMSw0LjAxMXMtNS44ODgsMi42NzktOC45MDksMy44OTENCgkJCWMtMy4wMjEsMS4yMTItNi4yMjksMi4zNTUtOS4zODcsMy40MTNjLTIuODg0LDAuOTktNS43NjgsMi4wMTQtOC42ODcsMi44ODRjLTMuNDEzLDEuMDI0LTYuOTgsMS44Ni0xMC41MTMsMi43MTQNCgkJCWMtMi43NjUsMC42NDgtNS40OTUsMS4zODItOC4yOTQsMS45MjljLTQuMDQ1LDAuNzg1LTguMTc1LDEuMzMxLTEyLjMyMiwxLjg5NGMtMi4zNTUsMC4zMDctNC42OTMsMC43MzQtNy4wNjYsMC45NzMNCgkJCWMtNi41NTQsMC42MzEtMTMuMTkzLDEuMDA3LTE5LjksMS4wMDdzLTEzLjM0Ni0wLjM3NS0xOS45LTEuMDA3Yy0yLjM3Mi0wLjIzOS00LjcxLTAuNjY2LTcuMDY2LTAuOTczDQoJCQljLTQuMTQ3LTAuNTYzLTguMjc3LTEuMTA5LTEyLjMyMi0xLjg5NGMtMi43OTktMC41NDYtNS41My0xLjI4LTguMjk0LTEuOTI5Yy0zLjUzMy0wLjg1My03LjA0OS0xLjcwNy0xMC41MTMtMi43MTQNCgkJCWMtMi45MTgtMC44Ny01LjgwMy0xLjg5NC04LjY4Ny0yLjg4NGMtMy4xNTctMS4wOTItNi4zMTUtMi4yMDItOS4zODctMy40MTNjLTMuMDcyLTEuMjEyLTUuOTczLTIuNTQzLTguOTA5LTMuODkxDQoJCQlzLTUuNTgxLTIuNjExLTguMzExLTQuMDExYy0zLjA4OS0xLjYwNC02LjE0NC0zLjI5NC05LjE0OC01LjEyYy0yLjM4OS0xLjM5OS00Ljc2Mi0yLjgzMy03LjA4My00LjMxOA0KCQkJYy0zLjE5MS0yLjAzMS02LjMzMi00LjE0Ny05LjQyMS02LjM4M2MtMS45NjMtMS4zOTktMy44NzQtMi44NS01Ljc4Ni00LjMxOGMtMy4yNDMtMi41MDktNi40NTEtNS4xMi05LjU1Ny03LjgzNA0KCQkJYy0wLjc1MS0wLjU2My0xLjQzNC0xLjI4LTIuMTY3LTEuOTI5YzAuNzYzLTU4LjA1NywzOC4wNi0xMDkuMzIxLDkzLjA2NS0xMjcuOTE1YzI3LjUwMywxMy4wODMsNTkuNDM1LDEzLjA4Myw4Ni45MzgsMA0KCQkJYzU1LjAwNCwxOC41OTQsOTIuMzAxLDY5Ljg1Nyw5My4wNjUsMTI3LjkxNUMzNzQuNzYsMzkxLjgyNywzNzQuMDc3LDM5Mi40NzYsMzczLjM0NCwzOTMuMTA3eiBNMTc5LjQzLDEzNi44NDkNCgkJCWMxOC40NzktMzIuODY0LDYwLjEtNDQuNTI1LDkyLjk2NC0yNi4wNDZzNDQuNTI1LDYwLjEsMjYuMDQ2LDkyLjk2NGMtNi4xMzEsMTAuOTA0LTE1LjE0MSwxOS45MTQtMjYuMDQ2LDI2LjA0Ng0KCQkJYy0wLjA4NSwwLTAuMTg4LDAtMC4yOSwwLjEwMmMtNC41MjYsMi41MTktOS4zMDksNC41NDUtMTQuMjY4LDYuMDQyYy0wLjg4NywwLjI1Ni0xLjcwNywwLjU5Ny0yLjY0NSwwLjgxOQ0KCQkJYy0xLjcwNywwLjQ0NC0zLjQ5OSwwLjc1MS01LjI1NywxLjA1OGMtMy4zMSwwLjU3OS02LjY1OSwwLjkxNS0xMC4wMTgsMS4wMDdoLTEuOTQ2Yy0zLjM1OS0wLjA5Mi02LjcwOC0wLjQyOC0xMC4wMTgtMS4wMDcNCgkJCWMtMS43MDctMC4zMDctMy41MTYtMC42MTQtNS4yNTYtMS4wNThjLTAuOTA1LTAuMjIyLTEuNzA3LTAuNTYzLTIuNjQ1LTAuODE5Yy00Ljk1OS0xLjQ5Ny05Ljc0Mi0zLjUyMi0xNC4yNjgtNi4wNDJsLTAuMzA3LTAuMTAyDQoJCQlDMTcyLjYxMiwyMTEuMzM0LDE2MC45NTEsMTY5LjcxMywxNzkuNDMsMTM2Ljg0OXogTTQwNS43NTMsMzU3LjMzNkw0MDUuNzUzLDM1Ny4zMzZjLTEwLjk1Mi01MS4wODMtNDQuNTktOTQuMzktOTEuMzc1LTExNy42NA0KCQkJYzM4LjI0NS00MS42NjEsMzUuNDc1LTEwNi40MzgtNi4xODYtMTQ0LjY4M2MtNDEuNjYxLTM4LjI0NS0xMDYuNDM4LTM1LjQ3NS0xNDQuNjgzLDYuMTg2DQoJCQljLTM1Ljk1NCwzOS4xNjYtMzUuOTU0LDk5LjMzMiwwLDEzOC40OTdjLTQ2Ljc4NSwyMy4yNTEtODAuNDIzLDY2LjU1Ny05MS4zNzUsMTE3LjY0QzYuNjksMjY1LjE1MywyOC4zNjYsMTM3LjM3MSwxMjAuNTQ5LDcxLjkyNw0KCQkJczIxOS45NjUtNDMuNzY4LDI4NS40MDksNDguNDE1YzI0LjYwMSwzNC42NTMsMzcuODA3LDc2LjEwNCwzNy43ODYsMTE4LjYwMkM0NDMuNzQ0LDI4MS40MDUsNDMwLjQ2LDMyMi44MDIsNDA1Ljc1MywzNTcuMzM2eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
              
    //           <div class="info">
    //           <strong>Maria Machado</strong> </br>
    //           <img id="imgRun" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMi4xNDkgNTEyLjE0OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEpIj4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNNTA0LjQyNywxMTEuNDRsLTEuMjUzLTEuMjU0Yy0xMS43NzYtMTEuNzc2LTMwLjk2Ny0xMS44MDItNDIuODE0LDAuMDM1bC00Ni4wODksNDYuNTc0ICAgICBjLTIuNDI4LDIuNDM2LTYuMzEyLDIuNTM0LTguODQ1LDAuMjAzbC02NC42MTgtNTkuNjU3Yy02LjI3Ni01LjgtMTQuNDQyLTguOTg3LTIyLjk5Ni04Ljk4N2gtOTYuMTI0ICAgICBjLTIuMjY5LDAtNC40NCwwLjg2NS02LjA4MiwyLjQxOWwtODEuNDcsNzcuMzU2Yy0xMS45MzUsMTEuOTQ0LTEyLjc1NiwzMS4xOTctMS44MTgsNDIuOTIgICAgIGM1Ljg0NCw2LjI2OCwxMy43MzYsOS43MTksMjIuMjE5LDkuNzE5aDAuMTVjOC40MTMtMC4wNDQsMTYuNDk5LTMuNjE5LDIyLjA4Ny05LjcyOGw1Ny41MzgtNjAuODkzaDIwLjU5NUwxMjAuNjMsMzAwLjIxOEgzNy44MSAgICAgYy0xOS42MzMsMC0zNS43NzgsMTQuNjgtMzYuNzU4LDMzLjQyMWMtMC41MjEsOS43OSwyLjkwNCwxOS4wOTQsOS42NCwyNi4xOTFjNi42MzgsNywxNS45NjksMTEuMDA4LDI1LjYxOCwxMS4wMDhoMTIzLjU4NiAgICAgYzIuNDM2LDAsNC43NjctMS4wMDYsNi40NDQtMi43OThsNjMuMzItNjcuNTkzbDUzLjI0OCw1NS42ODRsLTE2LjA3NSwxMDIuNzM1Yy00LjA1MiwxNy4wMiw0LjExNCwzNC4zNTcsMTkuNDEyLDQxLjE5OCAgICAgYzQuNzE0LDIuMTE5LDkuNzE5LDMuMTc4LDE0LjY5OCwzLjE3OGM1LjM1OCwwLDEwLjY5LTEuMjI3LDE1LjU5OC0zLjY1NWM5LjQ4MS00LjY5NiwxNi4yOTYtMTMuMjg1LDE4Ljc3Ni0yMy45NjcgICAgIGwyNy40NjMtMTQ3LjMwNmMwLjUzLTIuODYtMC4zOC01LjgwOS0yLjQ0NS03Ljg2NWwtNzMuMjk1LTczLjE5OGw1OC4yMjctNTguMTM4bDQwLjU4OSw0MC41OCAgICAgYzExLjMzNSwxMS4zMzUsMzEuMDkxLDExLjMzNSw0Mi40MTcsMGw3Ni4xNTYtNzYuMTQ3YzUuNjIzLTUuNjIzLDguNzIyLTEzLjEwOSw4LjcyMi0yMS4wNTQgICAgIEM1MTMuMTQ5LDEyNC41NCw1MTAuMDUsMTE3LjA2Myw1MDQuNDI3LDExMS40NHoiIGZpbGw9IiMzNWM0ZjAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCQkJPHBhdGggZD0iTTQwNy4wNjUsMTE0LjgzN2MyOS4yMTEsMCw1Mi45NjYtMjMuNzU1LDUyLjk2Ni01Mi45NjZjMC0yOS4yMTEtMjMuNzU1LTUyLjk2Ni01Mi45NjYtNTIuOTY2ICAgICBjLTI5LjIxLDAtNTIuOTY2LDIzLjc1NS01Mi45NjYsNTIuOTY2QzM1NC4xLDkxLjA4MiwzNzcuODU1LDExNC44MzcsNDA3LjA2NSwxMTQuODM3eiIgZmlsbD0iIzM1YzRmMCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJCTwvZz4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+" />
    //           </div>

    //           <div class="local-info">
    //           <strong >Local mais frequente:</strong> </br>
    //           <p>Mercado</p>
    //           </div>

    //           </li>
    //            </ul>
    //       </div>
    //   `,
    //   width: 650,
    //     })
    // }

    }

    const favoritos = () => {
        Swal.fire({
            title:`A tela será implementada futuramente :/`,
            icon: 'info',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#F09435',
            preConfirm: () => {
                return;
              }
        })
    }

    let timerInterval = () => {
    Swal.fire({
    title: 'Seu entregador já sairá para entrega!',
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
        <div className="background">
            <div className="container-consumidor">
                <header>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <span> Bem-vindo, {String(usuario.nomeCompleto).split(" ")[0]} <FaRegUserCircle size={30} /> </span>
                </header>

                <div className="navBar">

                    <FaBars size={30} />
                    <strong>Menu</strong>
                    <input type="text" placeholder="Procurar um item na loja..." onChange={e => encontrarEntregadorEspecifico(e)} />
                    <button type="submit" onChange={encontrarEntregadorEspecifico}>Buscar <FaSearch size={20} /></button>
                </div>

                <div className="models">
                    <ul>
                        <li>
                            <img src={btnVeja} onClick={melhoresEnt} id="btn" alt="botão veja os melhores entregadores da sua área" />
                        </li>


                        <li>
                            <img src={btnFavoritos} onClick={favoritos} id="btn" alt="botão seus entregadores favoritos" />
                        </li>
                    </ul>
                </div>


                <div id="posts">
                    {
                        posts.length === 0 ?
                            <div className="feed">
                                <ul>
                                    <li onClick={timerInterval}>
                                        <FaRegUserCircle id="iconFeed" size={60} />
                                        <strong>Sem posts no momento</strong>
                                    </li>
                                </ul>
                            </div>
                            :
                           
                            posts.map(item => (
                                <div className="feed" key={item.idUsuario}>
                                    <ul>
                                        <li onClick={timerInterval}>
                                            <FaRegUserCircle id="iconFeed" size={60} />
                                            <strong>{item.nomeCompleto}</strong>
                                            <span><FaRegStar color="yellow" /> 4,7</span>
                                            <p>{`${item.post.descricao} - ${item.post.localTarefa} - em ${item.post.tempoEstimadoRealizacao} minutos`}</p>

                                            <strong> {`aceita - até ${item.post.limitePesoEntrega}Kg(s) e/ou ${item.post.limiteQuantidadeItens} item(s)`}</strong>
                                            <p>{`Taxa de entrega: R$ ${item.post.taxaEntrega}`}</p>
                                        </li>
                                    </ul>
                                </div>
                            ))


                    }
                </div>
                <div id="map" >
                    <MapChart usuario={JSON.parse(sessionStorage.getItem('usuario')).data} ></MapChart>
                </div>


            </div>
        </div>
    )
}