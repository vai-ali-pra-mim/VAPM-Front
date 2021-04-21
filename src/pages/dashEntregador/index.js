import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { Menu, MenuItem, withStyles, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FaRegStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import moment from 'moment'
import { BiExit } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';

import vouAliModal from '../dashEntregador/components/vouAliModal'
import entregasFeitasModal from '../dashEntregador/components/entregasFeitasModal'
import informacoesSolicitanteModal from '../dashEntregador/components/informacoesSolicitanteModal'
import extratoModal from '../dashEntregador/components/extrato'
import respostaSolicitacao from '../dashEntregador/components/respostaSolicitacao'
import btnHistorico from '../../assets/btn-historico.png';
import btnExtrato from '../../assets/btn-extrato.png';
import APIUsuarios from '../../services/APIs/MainAPIUsuarios'
import frontendURL from '../../services/Frontend-URL/index'
import requestApi from '../../services/APIs/MainAPIUsuarios'
import './style.css';


export default function Entregador() {

  const [posts, setPosts] = useState([])
  const [entregador, setEntregador] = useState({})
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    //console.log(JSON.parse(sessionStorage.getItem('usuario')).data)
    setEntregador(JSON.parse(sessionStorage.getItem('usuario')).data)
  }, [])

  useEffect(async () => {
    let user = JSON.parse(sessionStorage.getItem('usuario')).data
    //console.log(user.idUsuario);
    let usuarioPostsResponse = await APIUsuarios.get(`/posts/usuario/${user.idUsuario}`)
    setPosts(usuarioPostsResponse.data)
    //console.log(usuarioPostsResponse.data);
  }, [])

  let logout = () => {
    setEntregador({})
    setPosts({})
    sessionStorage.clear()
    window.location.href = `${frontendURL}/login`
  }

  const vouAli = (idUsuario) => {
    vouAliModal(idUsuario)
  }

  const historico = () => {
    entregasFeitasModal()
  }

  const extrato = () => {
    extratoModal(entregador.saldo)
  }

  async function openModalInfoSolicitante(solicitanteId) {
    let solicitanteResponse = await APIUsuarios.get(`usuarios/${solicitanteId}`)
    //console.log(solicitanteResponse);
    let cepSolicitante = solicitanteResponse.data.cep
    let endereco = await requestApi.get(`https://viacep.com.br/ws/${cepSolicitante}/json/`)
    //console.log(endereco);

    informacoesSolicitanteModal(solicitanteResponse.data, endereco.data.logradouro)
  }

  async function openModalRespostaPost(post) {
    let solicitanteResponse = await APIUsuarios.get(`usuarios/${post.solicitanteId}`)
    //console.log(solicitanteResponse);
    let cepSolicitante = solicitanteResponse.data.cep
    let endereco = await requestApi.get(`https://viacep.com.br/ws/${cepSolicitante}/json/`)

    respostaSolicitacao(solicitanteResponse.data, endereco.data.logradouro, post.idPost)
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

  return (
    <div className="container-DashEntregador">
      <header>
        <Link to="/">
          <img src={logo} alt="logo" id="logoVAPM" />
        </Link>
        <div>
          <button onClick={escolherItemMenu} id="botao-menu"> <FiMenu size={35} /> Menu </button>

          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={tornarNuloItemMenu}
          >
            <StyledMenuItem onClick={() => { logout() }}>
              <ListItemIcon>
                <BiExit className="icon-logout" fontSize="small" />
              </ListItemIcon>
              <ListItemText className="item-logout" primary="Sair" />
            </StyledMenuItem>
          </StyledMenu>
        </div>
      </header>

      <aside>
        <img src={btnHistorico} onClick={historico} alt="Veja o historico de entregas" />
        <img src={btnExtrato} onClick={extrato} alt="Extrato" />
      </aside>

      <div className="user">
        <span id="nomeUser">{String(entregador.nomeCompleto).split(" ")[0]} <FaRegUserCircle size={60} /> R${String(entregador.saldo)}</span>
        <button type="submit" onClick={() => vouAli(entregador.idUsuario)}>VOU ALI</button>

        <div className="feed">
          <ul>
            <h1>Entregas pendentes</h1>

            {
              posts.length == 0 ?
                <h3>Você não tem nenhuma entrega agendada</h3>
                :
                posts.map(item => (
                  <li key={uuidv4()}  >

                    <div onClick={timerInterval}>
                      <FaRegUserCircle id="iconFeed" size={60} />
                      <strong>{item.titulo}</strong>
                      <span><FaRegStar color="yellow" /> 4,7</span>
                      <p> <b>Data e horário de realizacao</b> - {String(moment(item.dataHoraRealizacao.split("T")[0]).format("DD/MM/YYYY"))} ás {item.dataHoraRealizacao.split("T")[1]} </p>
                      <p> <b>Descrição - </b> {item.descricao} - {item.localTarefa} </p>
                      <p> <b>Tempo estimado de realização -</b> {item.tempoEstimadoRealizacao} hrs/mins </p>
                      <p><b>Aceita - até:  </b>  {item.limitePesoEntrega}Kg e {item.limiteQuantidadeItens} itens</p>
                      <p> <b>Taxa de entrega:  </b> R$ {item.taxaEntrega}</p>
                    </div>
                    {
                      item.solicitanteId !== null ?
                        item.estaEmEspera === 0 ?

                          <button className="btn-modal-info-solicitante" onClick={() => openModalInfoSolicitante(item.solicitanteId)}>Ver dados do solicitante</button>
                          :
                          <button className="btn-modal-resposta-post" onClick={() => openModalRespostaPost(item)}> Aceitar/Recusar pedido</button>
                        :
                        <span className="sem-solicitacao-messagem">Sem solicitações</span>

                    }
                  </li>
                ))
            }
          </ul>

        </div>
      </div>
    </div>
  )
}