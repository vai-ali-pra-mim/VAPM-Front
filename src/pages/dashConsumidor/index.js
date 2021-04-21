import React, { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { Menu, MenuItem, withStyles, ListItemIcon, ListItemText } from '@material-ui/core';
import { FaSearch, FaRegStar, FaAngleDoubleLeft, FaRegBell, FaRegUserCircle } from 'react-icons/fa';
import { BiExit } from 'react-icons/bi';
import Swal from 'sweetalert2';
import moment from 'moment'
import { Link } from 'react-router-dom';

import './style.css';
import logo from '../../assets/logo.svg';
import btnVeja from '../../assets/btn-veja.png';
import btnFavoritos from '../../assets/btn-favoritos.png';
import btnSoliticitacao from '../../assets/btn-solicitacoes.png';
import APIUsuarios from '../../services/APIs/MainAPIUsuarios'
import frontendURL from '../../services/Frontend-URL/index'
import coordenadasAPI from '../../services/APIs/GeoMatchingAPI'
import pedidosSolicitantesModal from '../dashConsumidor/components/pedidosSolicitantesModal'
import MapChart from '../../components/MapChart'
import solicitarEntregadorModal from './components/solicitarEntregadorModal'

export default function Consumidor() {
    let [mostrarMapa, setMostrarMapa] = useState(false);
    let [usuario, setUsuario] = useState({})
    let [entregadores, setEntregadores] = useState([])
    let [posts, setPosts] = useState([])
    let [postsSemResposta, setPostsSemResposta] = useState(0)
    let [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        var user = JSON.parse(sessionStorage.getItem('usuario')).data;
        setUsuario(user)
    }, [])

    useEffect(() => {
        document.getElementById("map").style.display = "none";
    }, [])

    useEffect(async () => {
        let user = JSON.parse(sessionStorage.getItem('usuario')).data;

        let usuariosProximos = await coordenadasAPI.get(`/coordenadas/${user.coordenadas}`)
        //console.log('setEntregadores');
        setEntregadores(usuariosProximos.data)

        let idUsuarios = ""
        if (usuariosProximos.data.length > 0) {
            usuariosProximos.data.map(item => {
                idUsuarios += `${item.idUsuario},`
            });
            //console.log(idUsuarios);
            let postsResponse = await APIUsuarios.get(`/posts/usuarios/${idUsuarios}`)
            setPosts(postsResponse.data)
            // console.log('Posts');
            // console.log(postsResponse.data);

            sessionStorage.setItem('posts', JSON.stringify(postsResponse.data))
        }
        else {
            setPosts([]);
            sessionStorage.setItem('posts', JSON.stringify([]))
            setEntregadores([])
            console.log('N]ap twm nada');
        }
    }, [])

    useEffect(async () => {
        let user = JSON.parse(sessionStorage.getItem('usuario')).data;
        let posts = await APIUsuarios.get(`/posts/consumidor/${user.idUsuario}`)
        //console.log(posts);
        if (posts.data.length > 0) {
            //let postAceitos = posts.data.filter(post => post.estaEmEspera == 0)
            //setPostsSemResposta(postAceitos.length)
            //console.log('posts aceitos');
            //console.log(postAceitos);
        }
    }, [usuario])

    const showMapChart = () => {
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
    }

    const entregadoresFavoritos = () => {
        Swal.fire({
            title: `A tela será implementada futuramente :/`,
            icon: 'info',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#F09435',
            preConfirm: () => {
                return;
            }
        })
    }

    let timerInterval = () => {
        // Swal.fire({
        //     title: 'Seu entregador já sairá para entrega!',
        //     timer: 2500,
        //     timerProgressBar: true,
        //     willOpen: () => {
        //         Swal.showLoading()
        //         timerInterval = setInterval(() => {
        //         }, 100)
        //     }
        // })
    }

    let logout = () => {
        setMostrarMapa(false)
        setUsuario([])
        setPosts([])
        sessionStorage.clear()
        window.location.href = `${frontendURL}/login`
    }

    let recarregarPagina = () => {
        sessionStorage.setItem('qtdPaginaRenderizada', 1)
        setTimeout(() => {
            window.location.reload()
        }, 550)
    }

    function openModalSolicitarEntregador(post, nomeEntregador) {
        solicitarEntregadorModal(post, nomeEntregador, usuario)
    }

    async function buscarPedidosSolicitadosModal() {
        let user = JSON.parse(sessionStorage.getItem('usuario')).data;
        try {
            let solicitacoes = await APIUsuarios.get(`/posts/consumidor/${user.idUsuario}`)
            console.log(solicitacoes.data)
            pedidosSolicitantesModal(solicitacoes.data, entregadores)
        }
        catch (Error) {
            Swal.fire({
                title: "Nenhuma solicitação feita",
                icon: "info",
            })
        }
    }

    const StyledMenu = withStyles({
        paper: {
            border: '1px solid #d3d4d5',
        },
    })((props) => (
        <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            {...props}
        />
    ));

    const StyledMenuItem = withStyles((theme) => ({
        root: {
            '&:focus': {
                backgroundColor: theme.palette.primary.main,
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: theme.palette.common.white,
                },
            },
        },
    }))(MenuItem);


    const escolherItemMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const tornarNuloItemMenu = () => {
        setAnchorEl(null);
    };

    const open = () => {
        document.getElementById("sideNot").style.width = "300px";
    }

    const close = () => {
        document.getElementById("sideNot").style.width = "0";
    }

    return (
        <div className="background">
            <div className="container-consumidor">
                <header>
                    <Link to="/">
                        <img src={logo} alt="logo" id="logoVAPM" />
                    </Link>
                    <span> Bem-vindo, {String(usuario.nomeCompleto).split(" ")[0]} <FaRegUserCircle size={30} /> </span>
                </header>

                <div className="navBar">

                    <div className="btn-menu">
                        <button onClick={escolherItemMenu} id="botao-menu"><FiMenu className="fi-menu" /> Menu</button>

                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={tornarNuloItemMenu}>
                            {/* <StyledMenuItem>
                                <ListItemText primary="Sent mail" />
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemText primary="Drafts" />
                            </StyledMenuItem> */}

                            <StyledMenuItem onClick={() => { logout() }}>
                                <ListItemIcon>
                                    <BiExit className="icon-logout" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText className="item-logout" primary="Sair" />
                            </StyledMenuItem>
                        </StyledMenu>
                    </div>

                    <div id="sideNot" className="sidebar">
                        <FaAngleDoubleLeft color="white" className="closebtn" onClick={close} />
                        <strong>Notificações</strong>
                        <div className="not">
                            <h4>TESTE</h4>
                            <h5>PARABÉNS!</h5>
                            <p>sua solicitação foi aceita</p>
                        </div>
                    </div>

                    <FaRegBell id="sino" onClick={open} size={35} />
                    <p>{postsSemResposta}</p>

                    <div id="sideLocal">
                    </div>

                    <input type="text" placeholder="Procurar um item na loja..." />
                    <button id="buscar" type="submit" >Buscar <FaSearch size={20} /></button>
                </div>

                <div className="models">
                    <ul>
                        <li>
                            <img src={btnVeja} onClick={showMapChart} id="btn" alt="botão veja os melhores entregadores da sua área" />
                        </li>
                        <li>
                            <img src={btnFavoritos} onClick={entregadoresFavoritos} id="btn" alt="botão seus entregadores favoritos" />
                        </li>

                        <li>
                            <img src={btnSoliticitacao} onClick={buscarPedidosSolicitadosModal} id="btn" alt="Pedidos Solicitados" />
                        </li>
                    </ul>
                </div>

                {console.log('posts:1')}
                {console.log(posts)}
                {console.log('entregadores:1')}
                {console.log(entregadores)}

                <div id="posts">
                    {
                        posts != null ?

                            posts.length === 0 ?
                                Number(sessionStorage.getItem('qtdPaginaRenderizada')) === 0 ?
                                    recarregarPagina()
                                    :
                                    <div className="feed">
                                        <ul>
                                            <li onClick={timerInterval}>
                                                <FaRegUserCircle id="iconFeed" size={60} />
                                                <strong>Sem posts no momento</strong>
                                            </li>
                                        </ul>
                                    </div>
                                :
                                entregadores != null ?
                                    entregadores.length > 0 ?

                                        posts.map(post => (
                                            <div className="feedCons" key={uuidv4()}>
                                                <ul>
                                                    <li onClick={() => { openModalSolicitarEntregador(post, entregadores.filter(itemFilter => itemFilter.idUsuario === post.entregadorId)[0].nomeCompleto) }}>
                                                    <FaRegUserCircle id="iconFeed" size={60} />
                                                        <strong>{ entregadores.filter(itemFilter => itemFilter.idUsuario === post.entregadorId)[0].nomeCompleto}</strong>
                                                    
                                                        <span><FaRegStar color="yellow" /> 4,7</span>
                                                        <p> <b>Data e horário de realizacao</b> - {String(moment(post.dataHoraRealizacao.split("T")[0]).format("DD/MM/YYYY"))} ás {post.dataHoraRealizacao.split("T")[1]} </p>
                                                        <p> {post.descricao} - {post.localTarefa} </p>
                                                        <p> <b>Tempo estimado de realização -</b> {post.tempoEstimadoRealizacao} hrs/mins </p>

                                                        <strong> {`aceita - até ${post.limitePesoEntrega}Kg(s) e/ou ${post.limiteQuantidadeItens} item(s)`}</strong>
                                                        <p>{`Taxa de entrega: R$ ${post.taxaEntrega}`}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))
                                        :
                                        null
                                    : null
                            : null
                    }
                </div>
                <div id="map" >
                    <MapChart usuario={JSON.parse(sessionStorage.getItem('usuario')).data} ></MapChart>
                </div>
            </div>
        </div>
    )
}