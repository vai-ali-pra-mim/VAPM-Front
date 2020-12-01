import React, { useEffect, useState } from 'react';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import ReactTooltip from 'react-tooltip';
import api from '../../services/api'
import './style.css';

export default function Login() {

    var narracaoAtivada = false;
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function acionarReconhecimentoVoz() {
        console.log("narracao ativada")
        let frase = new SpeechSynthesisUtterance("Narração ativada");

        speechSynthesis.speak(frase);
        frase = new SpeechSynthesisUtterance("Aperte TAB, e depois digite seu usuário");
        speechSynthesis.speak(frase);
        narracaoAtivada = true;
    }

    async function fazerLogin() {
        let data = {
            email,
            senha
        }

        let response = await api.post("/usuarios/login", data);
        console.log(response)
        if(response.status ==200){
            
            sessionStorage.setItem('usuario',JSON.stringify(response))
            console.log(response)
            var tipoPerfil = response.data.tipoPerfil;
            window.location.href = `http://localhost:3000/${tipoPerfil}`
            console.log("Login com sucesso")
        }
        else{
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
        <div className="container">

            <div className="barra-lateral" id="barraLateral" onKeyUp={acionarReconhecimentoVozPorTecla}
                onClick={acionarReconhecimentoVoz} tabIndex="0">
                {/* <img src="../../assets/loginPage/microphone.png" alt=""> */}
            </div>
        </div>

        <div className="login-container">
            <div className="login-container-items">
                <div className="login-label" htmlFor="">Login</div>
                <div className="login-credenciais-label">E-mail:</div>

                <input className="input" onChange={e => setEmail(e.target.value)} id="input-email" type="text" onKeyDown={falarFraseEmail}
                    onFocus={falarFraseEmailOnFocus} placeholder="Insira seu email aqui..." />
                <div className="login-credenciais-label">Senha:</div>

                <input className="input" onChange={e => setSenha(e.target.value)} id="input-password" type="password" onKeyDown={falarFraseSenha}
                    onFocus={falarFraseSenhaOnFocus} placeholder="Insira sua senha aqui..." />

                <button id="btn-entrar" onKeyDown={pressionarEnter} onClick={fazerLogin}>
                    Entrar
                    </button>

                {/* <img className="formas forma-central" src="../../assets/loginPage/forma-central.jpg" alt="">
            <img className="formas forma-sudeste" src="../../assets/loginPage/forma-sudeste.png" alt="">
            <img className="formas forma-sudoeste" src="../../assets/loginPage/forma-sudoeste.png" alt=""> */}


            </div>

        </div>


    </div>


)
}















