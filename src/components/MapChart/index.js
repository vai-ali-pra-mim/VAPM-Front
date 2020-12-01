import React, { useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import icons from './customObjects/index'
import './style.css'

import api from '../../services/api'

export default function MapChart({usuario}) {
    const [entregadores, setEntregadores] = useState([])
    const [solicitante, setSolicitante] = useState({ coordenadas: '0,0' })
    const [coordenadasSolicitante, setCoordenadasSolicitante] = useState([-23.5039837,-46.71006])
   // const [CEPAtual, setCEPAtual] = useState('')
    //const [numeroCEP, setNumeroCEP] = useState('')

    useEffect(() => {
        console.log(usuario)
        setSolicitante(usuario);
        setCoordenadasSolicitante(String(usuario.coordenadas).split(',').map(item =>Number(item)))
        console.log(String(usuario.coordenadas).split(', ').map(item =>Number(item)))

        setTimeout(() => { getEntregadores() }, 1000)
    }, [])

    function getEntregadores() {
        api.get(`/usuarios/entregadores/${usuario.coordenadas}`).then(item => {
            setEntregadores(item.data)
        })


    }

    //Formulario de criação de novos posts
    // async function handleAddPosicao() {
    //     let enderecoJson = await api.get(`https://viacep.com.br/ws/${CEPAtual}/json/`);
    //     // console.log(enderecoJson.data)

    //     let enderecoLogradouro = String(`${enderecoJson.data.logradouro}%2C%20${numeroCEP}&format=json`).replace(" ", "%20")
    //     console.log(enderecoLogradouro)
    //     if (!enderecoJson.data.logradouro)
    //         throw new Error("Endereço não tem logradouro")
    //     else {
    //         //console.log(enderecoLogradouro)
    //         let novaCoordenadas = await api.get(`https://us1.locationiq.com/v1/search.php?key=pk.98f58b5cb4882f50ba1c5f0974552f24&q=${enderecoLogradouro}&format=json`)
    //         //console.log(novaCoordenadas)

    //         let data = { latitude: novaCoordenadas.data[0].lat, longitude: novaCoordenadas.data[0].lon }
    //         //console.log(data)
    //         await api.post('/', data)
    //     }
    // }

    return (
        <div id="container">
            <MapContainer id="mapid" center={coordenadasSolicitante} zoom={14} >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">Open5treetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {
                    entregadores.length > 0 ?
                        entregadores.map(item => (
                            <Marker key={item.idUsuario} riseOnHover={true} position={item.coordenadas.split(', ').map(item => Number(item))} zoom={15}>
                                <Popup maxWidth={130} className="popup" >


                                    <h3>{item.post != null ? String(item.post.titulo) : ""}</h3>
                                    {item.post != null ? String(item.post.descricao).length < 37 ? item.post.descricao : `${item.post.descricao.substring(0, 37)}...` : ""}
                                    <button>Ver mais</button>
                                </Popup>
                            </Marker>
                        ))
                        :
                        null
                }

                {
                    <Marker key={solicitante.idUsuario} riseOnHover={true} position={coordenadasSolicitante} icon={icons.boyIcon} zoom={15}>
                        <Popup>
                            {solicitante.nomeCompleto}
                        </Popup>
                    </Marker>
                }

            </MapContainer>
        
        </div>
    )
}