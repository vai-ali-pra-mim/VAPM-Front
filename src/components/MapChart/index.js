import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import star from '../../assets/star.png'
import icons from './customObjects/index'
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import './style.css'

import coordenadasAPI from '../../services/APIs/GeoMatchingAPI'

export default function MapChart({ usuario }) {
    const [entregadores, setEntregadores] = useState([])
    const [posts, setPosts] = useState([])
    const [solicitante, setSolicitante] = useState({ coordenadas: '0,0' })
    const [coordenadasSolicitante, setCoordenadasSolicitante] = useState([-23.5039837, -46.71006])

    useEffect(() => {
        //console.log(usuario)
        setSolicitante(usuario);
        setCoordenadasSolicitante(String(usuario.coordenadas).split(',').map(item => Number(item)))
        // console.log(String(usuario.coordenadas).split(', ').map(item => Number(item)))

        setTimeout(() => { getEntregadores() }, 1000)
    }, [])

    function getEntregadores() {
        coordenadasAPI.get(`/coordenadas/${usuario.coordenadas}`).then(item => {
            // console.log(item.data)
            sessionStorage.setItem('entregadores', JSON.stringify(item.data))
            setEntregadores(item.data)
            setPosts(JSON.parse(sessionStorage.getItem('posts')))
        })
    }

    function openModalSolicitarEntregador(post, nomeEntregador) {
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
            preConfirm: () => {

                return;
            }
        })
    }

    return (
        <div id="container">
            <MapContainer id="mapid" center={String(usuario.coordenadas).split(',').map(item => Number(item))} zoom={14} >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">Open5treetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {
                    entregadores != null ?
                        entregadores.length > 0 ?
                            entregadores.map(item => (
                                <Marker key={uuidv4()} riseOnHover={true} position={item.coordenadas.split(', ').map(item => Number(item))} zoom={15}>
                                    <Popup maxWidth={110} className="popup" >

                                        {posts != null ?
                                            posts.length > 0 ?
                                                posts.map(itemPost => (
                                                    itemPost.entregador_id == item.idUsuario ?
                                                        <>
                                                            <h3 key={uuidv4()} >{itemPost.titulo}</h3>
                                                            {itemPost.descricao.length < 37 ? itemPost.descricao : `${itemPost.descricao.substring(0, 37)}...`}

                                                            < button onClick={() => openModalSolicitarEntregador(itemPost, item.nomeCompleto)}>Ver mais</button>
                                                        </>
                                                        : null
                                                ))
                                                : null
                                            : null
                                        }
                                    </Popup>
                                </Marker>
                            ))
                            :
                            null
                        : null
                }
                {
                    <Marker key={solicitante.idUsuario} riseOnHover={true} position={coordenadasSolicitante} icon={icons.oldManIcon} zoom={15}>
                        <Popup>
                            {solicitante.nomeCompleto}
                        </Popup>
                    </Marker>
                }

            </MapContainer>
        </div >
    )
}