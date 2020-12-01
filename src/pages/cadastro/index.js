import React, { useEffect, useState } from 'react';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import api from '../../services/api'
import MenCar from '../../assets/men-cart.png'
import logo from '../../assets/logo.svg'
import './style.css';
import ExtensaoCadastro from '../../components/cadastroEntregador/index'

export default function Cadastro() {

    const [nome, setNome] = useState('  ')
    const [sobrenome, setSobrenome] = useState('   ')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [dataNascimento, setdataNascimento] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [CEP, setCEP] = useState('')
    const [CPF, setCPF] = useState('')
    const [complemento, setComplemento] = useState('')
    const [pontoReferencia, setPontoReferencia] = useState('')
    const [requisicaoPronta, setRequisicaoPronta] = useState([])
    const [mostrarExtensaoCadastroSolicitante, setMostrarExtensaoCadastroSolicitante] = useState(true)
    const [RG, setRG] = useState('')
    const [thumbnailRG, setThumbnailRG] = useState('')
    const [thumbnailPerfil, setThumbnailPerfil] = useState('')


    function validation(idProcurado, valor, lengthMin, lengthMax) {
        let input = document.getElementById(`${idProcurado}`)
        if (valor.length < lengthMin || valor.length > lengthMax) {
            input.style.border = "2px solid red"

        }
        else {
            input.style.border = "1px solid black"
            return true
        }
    }

    function callbackChildFunction(childData) {
        console.log(childData)
        setRG(childData[0])
        setThumbnailRG(childData[1])
        setThumbnailPerfil(childData[2])
        enviarRequisicaoPost()
        document.getElementById("extensaoCadastro").style.display="none";

    }

    useEffect(() => {
        validation("nome", nome, 3, 20)
    }, [nome])

    useEffect(() => {
        validation("sobrenome", sobrenome, 3, 30)
    }, [sobrenome])

    useEffect(() => {
        validation("telefone", telefone, 10, 11)
    }, [telefone])

    useEffect(() => {
        validation("cpf", CPF, 11, 11)
    }, [CPF])

    useEffect(() => {
        validation("email", email, 7, 65)
    }, [email])

    useEffect(() => {
        validation("senha", senha, 7, 15)
    }, [senha])

    useEffect(() => {
        validation("confirmarSenha", confirmarSenha, 7, 15)
        let input = document.getElementById("confirmarSenha")
        if (confirmarSenha != senha)
            input.style.border = "2px solid red"
        else
            input.style.border = "1px solid black"

    }, [confirmarSenha])

    useEffect(() => {
        validation("cep", CEP, 8, 9)
    }, [CEP])

    useEffect(() => {
        validation("complemento", complemento, 3, 30)
    }, [complemento])

    useEffect(() => {
        let input = document.getElementById("dataNascimento")
        let date = new Date();
        let dataAtual = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        let dataNasc = new Date(dataNascimento)

        if (dataNasc < dataAtual && dataAtual.getFullYear() - dataNasc.getFullYear() < 18)
            input.style.border = "2px solid red"
        else
            input.style.border = "1px solid black"
    }, [dataNascimento])

    useEffect(() => {
        document.getElementById("extensaoCadastro").style.display = "none"
    }, [])

    useEffect(async () => {
        let rua = document.querySelector("#rua")
        let estado = document.querySelector("#estado")
        let cidade = document.querySelector("#cidade")

        if (CEP.length == 8 && CEP != "        ") {
            let localidade = await api.get(`https://viacep.com.br/ws/${CEP}/json/`)
            console.log(localidade)
            rua.value = localidade.data.logradouro;
            estado.value = localidade.data.uf;
            cidade.value = localidade.data.localidade;
        }
        else if (CEP.length < 8) {
            rua.value = "";
            estado.value = "";
            cidade.value = "";
        }
    }, [CEP])

    async function enviarRequisicaoPost() {
        let corpoRequisicao = {
            nomeCompleto: `${nome} ${sobrenome}`,
            dataNascimento: dataNascimento,
            complemento: complemento,
            telefone: telefone,
            email: email,
            senha: senha,
            coordenadas: null,
            saldo: null,
            cpf: CPF,
            cep: CEP,
            rg: RG
        }
        try {
            console.log(requisicaoPronta)
            if (document.getElementById("cpf").style.border == "1px solid black" && document.getElementById("cep").style.border == "1px solid black" &&
                document.getElementById("senha").style.border == "1px solid black" && document.getElementById("email").style.border == "1px solid black" &&
                document.getElementById("telefone").style.border == "1px solid black" && document.getElementById("complemento").style.border == "1px solid black" &&
                document.getElementById("dataNascimento").style.border == "1px solid black" && document.getElementById("nome").style.border == "1px solid black") {
                let requisicao = await api.post("http://localhost:8888/usuarios", corpoRequisicao);
                console.log(requisicao)
                window.location.href="http://localhost:3000/login"
            }
        }
        catch (er) {
            console.log("Requisicao não foi feita")
            console.log(er)
        }
    }

    function mostrarExtensaoCadastro() {
        if (mostrarExtensaoCadastroSolicitante) {
            document.getElementById("extensaoCadastro").style.display = "block"
            setMostrarExtensaoCadastroSolicitante(false)

            var botaoEntregador = document.getElementById("buttonE")
            botaoEntregador.style.display = "none"

            var botaoConsumidor = document.getElementById("buttonC").innerHTML = "Terminar cadastro como consumidor"
        } else {
            var botaoEntregador = document.getElementById("buttonE")
            botaoEntregador.style.display = "block"
            var botaoConsumidor = document.getElementById("buttonC").innerHTML = "Finalizar cadastro como consumidor"
            // document.getElementById("extensaoCadastro").style.display="none"
            setMostrarExtensaoCadastroSolicitante(true)
        }
    }

    return (
        <div className="cadastro-container">
            <img className="logo" src={logo} alt="logo" />
            <h2>Cadastrar-se como Consumidor</h2>
            <form >
                <h3>Dados Pessoais</h3>
                <ul>

                    <li>
                        <strong>Nome
                        {nome.length < 3 || nome.length > 20 ? <>
                                <IoIosInformationCircleOutline size={18} data-tip data-for="tamanhoNome" />
                                <ReactTooltip id="tamanhoNome" place="right" type="dark" effect="solid">
                                    <p>
                                        Nome deve ter no mínimo 3 <br />
                                         no máximo  letras 20
                                    </p>
                                </ReactTooltip>
                            </>
                                :
                                null
                            }
                        </strong>
                        <input id="nome" minLength="3" maxLength="30" placeholder="Digite seu nome..." onChange={e => setNome(e.target.value)} />
                    </li>

                    <li>
                        <strong>Sobrenome
                        {sobrenome.length < 3 || sobrenome.length > 30 ? <>
                                <IoIosInformationCircleOutline size={18} data-tip data-for="tamanhoSobrenome" />
                                <ReactTooltip id="tamanhoSobrenome" place="right" type="dark" effect="solid">
                                    <p>
                                        Sobrenome deve ter no minimo 3 <br />
                                        no maximo 30 letras
                                    </p>
                                </ReactTooltip>
                            </>
                                :
                                null
                            }
                        </strong>
                        <input id="sobrenome" minLength="3" maxLength="30" placeholder="Digite seu sobrenome..." onChange={e => setSobrenome(e.target.value)} />
                    </li>

                    <li>
                        <strong>Telefone
                        {telefone.length < 10 || telefone.length > 11 ? <>
                                <IoIosInformationCircleOutline size={18} data-tip data-for="tamanhoTelefone" />
                                <ReactTooltip id="tamanhoTelefone" place="right" type="dark" effect="solid">
                                    <p>
                                        Telefone fixo deve conter 10 digitos <br />
                                        Celular deve conter 11 digitos
                                    </p>
                                </ReactTooltip>
                            </>
                                :
                                null
                            }
                        </strong>
                        <input id="telefone" minLength="11" maxLength="11" placeholder="(xx)x xxxx-xxxx" onChange={e => setTelefone(e.target.value)} />
                    </li>

                    <li>
                        <strong>CPF
                        {CPF.length < 11 || CPF.length > 11 ? <>
                                <IoIosInformationCircleOutline size={18} data-tip data-for="tamanhoCpf" />
                                <ReactTooltip id="tamanhoCpf" place="right" type="dark" effect="solid">
                                    <p>
                                        O CPF deve conter 11 digitos <br />
                                        Não deve conter caracter especial
                                    </p>
                                </ReactTooltip>
                            </>
                                :
                                null
                            }
                        </strong>
                        <input minLength="11" maxLength="11" id="cpf" placeholder="000.000.000-00" onChange={e => setCPF(e.target.value)} />
                    </li>

                    <li>
                        <strong>Email</strong>
                        <input minLength="7" maxLength="65" id="email" type="email" placeholder="digite seu email..." onChange={e => setEmail(e.target.value)} />
                    </li>
                    <li>
                        <strong>Data de Nascimento</strong>
                        <input id="dataNascimento" type="date" max="2001-00-00" onChange={e => setdataNascimento(e.target.value)} />
                    </li>

                    <li>
                        <div className="container-senha">
                            <strong>Senha</strong>
                            <IoIosInformationCircleOutline size={16} data-tip data-for="detalhes" />
                            <ReactTooltip id="detalhes" place="right" type="dark" effect="solid">
                                <p>
                                    Insira uma senha que contenha: <br />
                                    no minimo 6 caracter <br />
                                    1 letra MAIUSCULA <br />
                                    1 numero
                                 </p>
                            </ReactTooltip>
                        </div>
                        <input id="senha" minLength="7" maxLength="15" placeholder="digite uma senha..." type="password" onChange={e => setSenha(e.target.value)} />
                    </li>

                    <li>
                        <strong>Confirme a senha
                         {confirmarSenha != senha ? <>
                                <IoIosInformationCircleOutline size={18} data-tip data-for="confSenha" />
                                <ReactTooltip id="confSenha" place="right" type="dark" effect="solid">
                                    <p>
                                        Senhas divergentes
                                    </p>
                                </ReactTooltip>
                            </>
                                :
                                null
                            }

                        </strong>
                        <input id="confirmarSenha" minLength="7" maxLength="15" placeholder="confirme sua senha..." type="password" onChange={e => setConfirmarSenha(e.target.value)} />
                    </li>

                </ul>

                <div className="dados-endereco">
                    <h3>Dados de endereço
                    <IoIosInformationCircleOutline size={16} data-tip data-for="i" />
                        <ReactTooltip id="i" place="right" type="dark" effect="solid">
                            <p>
                                Inserir apenas o CEP
                    </p>
                        </ReactTooltip>
                    </h3>


                    <ul>

                        <li>
                            <strong>Estado</strong>
                            <input id="estado" disabled="true" placeholder="ex:São Paulo" />
                        </li>

                        <li>
                            <strong>Cidade</strong>
                            <input id="cidade" disabled="true" placeholder="ex:São Bernado do Campo" />
                        </li>

                        <li>
                            <strong>Rua</strong>
                            <input id="rua" disabled="true" placeholder="ex:Rua Gabriel Garcia" />
                        </li>

                        <li>
                            <strong>CEP
                            {CEP.length < 8 || CEP.length > 8 ? <>
                                    <IoIosInformationCircleOutline size={18} data-tip data-for="confSenha" />
                                    <ReactTooltip id="confSenha" place="right" type="dark" effect="solid">
                                        <p>
                                            O cep deve conter 8 números <br />
                                         Sem caracter especial
                                    </p>
                                    </ReactTooltip>
                                </>
                                    :
                                    null
                                }
                            </strong>
                            <input id="cep" minLength="8" maxLength="9" placeholder="00000-000" onChange={e => setCEP(e.target.value)} />
                        </li>

                        <li>
                            <strong>Complemento
                            {complemento < 3 || complemento > 20 ? <>
                                    <IoIosInformationCircleOutline size={18} data-tip data-for="tamanhoComplemto" />
                                    <ReactTooltip id="tamanhoComplemto" place="right" type="dark" effect="solid">
                                        <p>
                                            O complemento deve conter no mínimo 3 <br />
                                         no máximo 20 letras
                                    </p>
                                    </ReactTooltip>
                                </>
                                    :
                                    null
                                }
                            </strong>
                            <input id="complemento" minLength="3" maxLength="20" placeholder="Apto/Casa/Logradouro" onChange={e => setComplemento(e.target.value)} />
                        </li>

                        <li>
                            <strong>Ponto de Referência</strong>
                            <textarea id="pontoReferencia" placeholder="ex: ao lado do posto de gasolina" onChange={e => setPontoReferencia(e.target.value)} />
                        </li>

                    </ul>
                </div>
            </form>

            <div className="container-entregador">
                <h3>Deseja ser um entregador?</h3>

                <h4>Entenda os benefícios de ser entregador</h4>

                <p>Ao se tornar um entregador além de conhecer as pessoas que moram proximas,
                você irá ajudar aqueles que necessitam e ainda sim será remunerado por desempenhar essas tarefas.</p>

                <img src={MenCar} className="mencar" alt="Imagem de Homem com carrinho" />

                <h4>Quer fazer parte dessa missão?</h4>


                <button type="submit" className="buttonE" id="buttonE" onClick={mostrarExtensaoCadastro}>Quero ser entregador</button>


                <h4>Para cadastrar - se somente como consumidor clique no botão a baixo</h4>


                <button type="submit" onClick={enviarRequisicaoPost} className="buttonC" id="buttonC">Finalizar cadastro como consumidor</button>

                
                <div id="extensaoCadastro">

                    <ExtensaoCadastro parentCallback={callbackChildFunction}>
                        <p>{console.log(RG)}</p>

                    </ExtensaoCadastro>
                </div>
            </div>
        </div>
    )
}