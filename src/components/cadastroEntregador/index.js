import React, { useState, useEffect, useMemo } from 'react'
import './style.css'
import camera from "../../assets/camera.png"

export default function CadastroEntregador(props) {

    const [RG, setRG] = useState('')
    const [thumbnailRG, setThumbnailRG] = useState('')
    const [thumbnailPerfil, setThumbnailPerfil] = useState('')

    function sendData(e) {
        let value = e.target.value
        setRG(value)
    }

    const previewRG = useMemo(
        () => {
            if (thumbnailRG) {
                //console.log(URL.createObjectURL(thumbnailRG))
                return URL.createObjectURL(thumbnailRG)
            }
            return null;
        }, [thumbnailRG]
    )

    const previewPerfil = useMemo(
        () => {
            if (thumbnailPerfil) {
               // console.log(URL.createObjectURL(thumbnailPerfil))
                return URL.createObjectURL(thumbnailPerfil)
            }
            return null;
        }, [thumbnailPerfil]
    )

    function cadastrar() {
        if (RG!=''&
            thumbnailPerfil != '' &
            thumbnailRG != '') 
        {
            //console.log(props)
            props.parentCallback([document.getElementById("inputRG").value, previewPerfil, previewRG]);
            document.getElementById("inputRG").value ="";
            setThumbnailPerfil(null);
            setThumbnailRG(null);
        }
    }

    return (
        <>
            <div className="header">
                Insira os seguintes dados para se tornar entregador
        </div>

            <div className="lbl-rg">
                <div> RG </div >
                <input placeholder="xx.xxx.xxx-xx" maxLength="12" id="inputRG" onChange={e => sendData(e)}></input>
            </div>

            <div>
                <div className="container-lbl-frase">
                    <div className="lbl-foto-rg"> Insira uma foto do seu documento (RG)</div >
                    <div className="lbl-foto-rg"> Insira sua foto de perfil</div >
                </div>


                <div className="container-geral">
                    <div className="container-foto-rg">
                        <div id="div-anexar-foto-rg" className="div-anexar-foto-rg">
                            <label id='thumbnail'
                                style={{ backgroundImage: `url(${previewRG})` }}
                                className={thumbnailRG ? 'has-thumbnailRG' : ''}>

                                <input type="file"
                                    onChange={event => setThumbnailRG(event.target.files[0])} />
                                <img src={camera} alt="Select file" className="foto-logo" />
                            </label>
                        </div>
                     
                        <div className="container-btn-anexar">
                            <div className="frase-btn-anexar">
                                Anexar foto
                            </div>

                        </div>
                    </div>


                    <div className="container-foto-rg">
                        <div id="div-anexar-foto-rg" className="div-anexar-foto-rg">
                            <label id='thumbnail'
                                style={{ backgroundImage: `url(${previewPerfil})` }}
                                className={thumbnailPerfil ? 'has-thumbnailPerfil' : ''}>

                                <input type="file"
                                    onChange={event => setThumbnailPerfil(event.target.files[0])} />
                                <img src={camera} alt="Select file" className="foto-logo" />
                            </label>
                        </div>
                    
                        <div className="container-btn-anexar">
                            <div className="frase-btn-anexar">
                                Anexar foto
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div id="btn-cadastrar-entregador">
                <div onClick={cadastrar}>
                    Cadastre-se como entregador
                </div>
            </div>
        </>
    )
}