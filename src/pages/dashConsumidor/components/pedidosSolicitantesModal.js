import React from 'react';
import Swal from 'sweetalert2';
import moment from 'moment'

export default function PedidosSolicitantesModal(solicitacoes, entregadores) {
    Swal.fire({
        title: `Pedidos solicitados`,
        html: `
    <style>
    
      .feed ul{
      width: 500px;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      list-style: none;
      justify-content: center;
      cursor: pointer;
      margin: 0 auto;   
    }

    #messagemEmEspera{
        color: orange;
        font-size: x-large;
    }

    #messagemConfirmacao{
        color: limegreen;
        font-size: x-large;
    }
    
    .feed li {
      background: linear-gradient(180deg, rgba(248, 85, 42, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #FFFEFE;;
      padding: 24px;
      border-radius: 8px;
      position: relative;
      text-align: left;
      margin-bottom: 20px;
    }
      .feed ul li strong {
        margin-left: 20%;
      }
    
      .feed ul li p {
        color: #737380;
        line-height: 21px;
        font-size: 16px;
        margin-left: 20%;
        margin-top: 5px;
        margin-bottom: 5px;
      }
    
      .feed ul li #iconFeed{
          position: absolute;
      }
    
      .swal2-popup {
          border-radius: 80px !important;
      }
    
      #swal2-content {
          list-style: none;
      }
       
      @media only screen and (max-device-width: 900px) {
        #btn{width: 20vw;}   
    }
    </style> 

    <div className="feed" key={item.entregador_id + Math.random() * 5}>
        <ul>
        ${solicitacoes.map(solicitacao => (

            `
                <li>
                <FaRegUserCircle id="iconFeed" size={60} />
                ${solicitacao.estaEmEspera == 1 ? `<div id="messagemEmEspera"> Aguardando confirmação </br> </div>` : `<div id="messagemConfirmacao"> Solicitação aceita </br> </div>`}
                <strong>${entregadores.filter(itemFilter => itemFilter.idUsuario === solicitacao.entregador_id) ?

                entregadores.filter(itemFilter => itemFilter.idUsuario === solicitacao.entregador_id)[0].nomeCompleto
                : null
            }</strong>
                <span><FaRegStar color="yellow" /> 4,7</span>
                <p> <b>Data e horário de realizacao</b> - ${String(moment(solicitacao.dataHoraRealizacao.split("T")[0]).format("DD/MM/YYYY"))} ás ${solicitacao.dataHoraRealizacao.split("T")[1]} </p>
                <p><b>Descrição</b>: ${solicitacao.descricao} - ${solicitacao.localTarefa} </p>
                <p> <b>Tempo estimado de conclusão: </b> ${solicitacao.tempoEstimadoRealizacao} minutos</p>
                <p> <b>Aceita até : </b> ${solicitacao.limitePesoEntrega}Kg(s) e / ou ${solicitacao.limiteQuantidadeItens} item(s)</strong>
                <p><b>Taxa de entrega:</b> R$ ${solicitacao.taxaEntrega}</p>
            </li>               
                `
        ))
            }  
        </ul>
    </div>

    `,
        width: 700,
        scrollbarPadding: 4.0,
        confirmButtonColor: '#F09435',
    })
}