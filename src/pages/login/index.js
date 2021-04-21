import React, { useState } from 'react';

import APIUsuarios from '../../services/APIs/MainAPIUsuarios'
import frontendURL from '../../services/Frontend-URL/index'

import './style.css';
import Logo from '../../assets/logo.png';
import Microphone from '../../assets/microphone.png';

export default function Login(props) {

    let [narracaoAtivada, setNarracaoAtivada] = useState(false)
    let [email, setEmail] = useState('')
    let [senha, setSenha] = useState('')

    function acionarReconhecimentoVoz() {
        console.log("narracao ativada")
        let frase = new SpeechSynthesisUtterance("Narração ativada");
        speechSynthesis.speak(frase);
        frase = new SpeechSynthesisUtterance("Aperte TAB, e depois digite seu usuário");
        speechSynthesis.speak(frase);
        setNarracaoAtivada(true);
    }

    async function fazerLogin() {
        let data = {
            email,
            senha
        }

        let response = await APIUsuarios.post("/usuarios/login", data);
        //console.log(response)
        if (response.status === 200) {

            sessionStorage.setItem('usuario', JSON.stringify(response))
            sessionStorage.setItem('qtdPaginaRenderizada', 0)
            var tipoPerfil = response.data.ehConsumidor ==0 ? "consumidor" : "entregador";
            window.location.href = `${frontendURL}/${tipoPerfil}`
        }
        else {
            console.log("Senha/Usuário incorretas")
        }
    }

    function acionarReconhecimentoVozPorTecla(e) {
        if (e.charCode === 13) {
            document.getElementById("barraLateral").click();
        }
    }

    function falarFraseEmail(e) {
        if (e.charCode === 13) {
            if (narracaoAtivada) {
                let frase = new SpeechSynthesisUtterance("Assim que digitar seu usuário, aperte TAB e digite sua senha");
                speechSynthesis.speak(frase);
            }
        }
    }

    function falarFraseEmailOnFocus() {
        if (narracaoAtivada) {
            let frase = new SpeechSynthesisUtterance("Assim que digitar seu usuário, aperte TAB e digite sua senha");
            speechSynthesis.speak(frase);
        }
    }

    function falarFraseSenha(e) {
        if (e.charCode === 13) {
            if (narracaoAtivada) {
                let frase = new SpeechSynthesisUtterance("Após digitar sua senha, aperte TAB e depois 'Enter' para se logar");
                speechSynthesis.speak(frase);
            }
        }
    }

    function falarFraseSenhaOnFocus() {
        if (narracaoAtivada) {
            let frase = new SpeechSynthesisUtterance("Após digitar sua senha, aperte TAB e depois 'Enter' para se logar");
            speechSynthesis.speak(frase);
        }
    }

    function pressionarEnter(e) {
        if (e.charCode === 13) {
            document.getElementById("barraLateral").click();
        }
    }

    return (
        <div className="container-parent">
            <img src={Logo} id="logoVAPM" alt="" />

            <div className="login-container">
                <div className="login-container-items">
                    <div className="login-label" htmlFor="">Login</div>
                    <div className="login-credenciais-label">E-mail:</div>

                    <input className="input" onChange={e => setEmail(e.target.value)} id="input-email" type="text" onKeyDown={falarFraseEmail}
                        onFocus={falarFraseEmailOnFocus} placeholder="Insira seu email aqui..." />
                    <div className="login-credenciais-label">Senha:</div>

                    <input className="input" onChange={e => setSenha(e.target.value)} id="input-password" type="password" onKeyDown={falarFraseSenha}
                        onFocus={falarFraseSenhaOnFocus} placeholder="Insira sua senha aqui..." />

                    <div className="container-btn-entrar">
                        <button id="btn-entrar" onKeyDown={pressionarEnter} onClick={fazerLogin}>
                            Entrar
                    </button>
                    </div>

                </div>

            </div>
            <div className="barra-lateral" id="barraLateral" onKeyUp={acionarReconhecimentoVozPorTecla}
                onClick={acionarReconhecimentoVoz} tabIndex="0">
                <img src={Microphone} alt="" />
            </div>
        </div>
    )
}