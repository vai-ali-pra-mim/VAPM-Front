import React from 'react';
import Swal from 'sweetalert2';
import APIUsuarios from '../../../services/APIs/MainAPIUsuarios'

import star from '../../../assets/star.png'

export default function solicitarEntregadorModal(post, nomeEntregador, usuario) {
    Swal.fire({
        title: `Post`,
        html: ` <div className="feed" key={item.idUsuario}>

            <div onClick={timerInterval}>
               
                 <strong>${nomeEntregador}</strong>
                <img src=${star} id="yellow" width="30" /> 4,7
                <p>${post.descricao} - ${post.localTarefa} - em ${post.tempoEstimadoRealizacao} minutos</p>

                <strong> aceita - até ${post.limitePesoEntrega}Kg(s) e/ou ${post.limiteQuantidadeItens} item(s)</strong>
                <p>Taxa de entrega: R$ ${post.taxaEntrega}</p>
            </div>

    </div> `,
        icon: 'info',
        confirmButtonText: 'Solicitar',
        confirmButtonColor: '#F09435',
        showCancelButton: true,
        cancelButtonText: "Voltar",
        denyButtonColor: "#d6d5d2",

    }).then(async (result) => {
        if (result.isConfirmed) {
            //  mudar o idSolicitante do post
            try {
                let status = await APIUsuarios.put(`/posts/status-aceite/${post.idPost}/${usuario.idUsuario}/consumidor`)
                let statusEspera = await APIUsuarios.put(`/posts/status-espera/${post.idPost}/consumidor`)
                // console.log(status);
                // console.log(statusEspera)
                setTimeout(()=>{
                    window.location.reload();
                },250)               
            }
            catch (Error) {
                Swal.fire({
                    title: "Solicitação já feita . \n Espere a resposta",
                    icon: "info",
                })
            }
        }
    })
}