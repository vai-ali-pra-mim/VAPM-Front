import React, { useEffect, useState } from 'react';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import ReactTooltip from 'react-tooltip';

import MenCar from '../../assets/men-cart.png'
import logo from '../../assets/logo.svg'
import './style.css';

import APIUsuarios from '../../services/APIs/MainAPIUsuarios'
import frontendURL from '../../services/Frontend-URL/index'
import requestApi from '../../services/APIs/MainAPIUsuarios'
import ExtensaoCadastro from '../../components/cadastroEntregador/index'

export default function Cadastro() {

    const [nome, setNome] = useState('  ')
    const [sobrenome, setSobrenome] = useState('   ')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [dataNascimento, setdataNascimento] = useState('')
    const [idade, setIdade] = useState(19)
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [CEP, setCEP] = useState('')
    const [CPF, setCPF] = useState('')
    const [complemento, setComplemento] = useState('')
    const [pontoReferencia, setPontoReferencia] = useState('')
    const [mostrarExtensaoCadastroSolicitante, setMostrarExtensaoCadastroSolicitante] = useState(true)
    const [RG, setRG] = useState('')
    const [thumbnailRG, setThumbnailRG] = useState('')
    const [thumbnailPerfil, setThumbnailPerfil] = useState('')

    function callbackChildFunction(childData) {
        sessionStorage.setItem('rg', childData[0])
        setRG(childData[0])
        setThumbnailRG(childData[1])
        setThumbnailPerfil(childData[2])
        enviarRequisicaoPost(0)
        document.getElementById("extensaoCadastro").style.display = "none";
        window.location.href = `${frontendURL}/login`
    }

    useEffect(() => {
        document.getElementById("extensaoCadastro").style.display = "none"
    }, [])

    useEffect(() => {
        let input = document.getElementById("dataNascimento")
        let date = new Date();
        let dataAtual = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        let dataNasc = new Date(dataNascimento)
        setIdade(dataAtual.getFullYear() - dataNasc.getFullYear())

        if (dataNasc < dataAtual && idade < 18 || idade < 18) {
            input.style.border = "2px solid red"
            //console.log("menor: " + idade)
        }
        else {
            input.style.border = "1px solid black"
        }

    }, [dataNascimento])

    useEffect(async () => {
        let rua = document.querySelector("#rua")
        let estado = document.querySelector("#estado")
        let cidade = document.querySelector("#cidade")

        if (CEP.length == 8 ||CEP.length == 9 && CEP != "        ") {
            let localidade = await requestApi.get(`https://viacep.com.br/ws/${CEP}/json/`)
            //console.log(localidade)
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

    async function buscarCoordenadas() {
        let enderecoJson = await requestApi.get(`https://viacep.com.br/ws/${CEP}/json/`);
        // console.log(enderecoJson.data)
        let enderecoLogradouro = String(`${enderecoJson.data.logradouro}%2C%20${CEP}`).replace(" ", "%20")
        //console.log(enderecoLogradouro)
        if (!enderecoJson.data.logradouro)
            throw new Error("Endereço não tem logradouro")
        else {
            // console.log(enderecoLogradouro)
            requestApi.get(`https://us1.locationiq.com/v1/search.php?key=pk.98f58b5cb4882f50ba1c5f0974552f24&q=${enderecoLogradouro}&format=json`)
                .then(item => {
                    let data = item.data[0]
                    sessionStorage.setItem('coordenadas', `${data.lat}, ${data.lon}`)
                })
        }
    }

    async function enviarRequisicaoPost(ehConsumidor) {
        buscarCoordenadas()
       // console.log('ehConsumidor: ');
        //console.log(ehConsumidor)
        let corpoRequisicao = {
            nomeCompleto: `${nome} ${sobrenome}`,
            dataNascimento,
            complemento,
            telefone,
            email,
            senha,
            coordenadas: sessionStorage.getItem('coordenadas'),
            saldo: 0,
            cpf: CPF,
            cep: CEP,
            ehConsumidor: ehConsumidor,
            rg: sessionStorage.getItem('rg'),
            pontoReferencia: pontoReferencia
        }
        try {
           // console.log(corpoRequisicao)
            let requisicao = await APIUsuarios.post("/usuarios", corpoRequisicao);
            sessionStorage.setItem('requisicao', JSON.stringify(requisicao))
            //console.log(requisicao)
            window.location.href = `${frontendURL}/login`
        }
        catch (er) {
            console.log("Requisicao não foi feita")
            console.log(er)
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
    }

    function mostrarExtensaoCadastro() {
        if (mostrarExtensaoCadastroSolicitante) {
            let botaoEntregador = document.getElementById("buttonE")
            document.getElementById("extensaoCadastro").style.display = "block"
            setMostrarExtensaoCadastroSolicitante(false)          
            botaoEntregador.style.display = "none"
            document.getElementById("buttonC").innerHTML = "Terminar cadastro como consumidor"
        } else {
            let botaoEntregador = document.getElementById("buttonE")
            botaoEntregador.style.display = "block"
            document.getElementById("buttonC").innerHTML = "Finalizar cadastro como consumidor"
            setMostrarExtensaoCadastroSolicitante(true)
        }
    }

    return (
        <div className="cadastro-container">
            <img id="logoVAPM" src={logo} alt="logo" />
            <h2>Cadastrar-se como Consumidor</h2>
            <form onSubmit={handleSubmit}>
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
                        <input id="nome" minLength="3" maxLength="30" required placeholder="Digite seu nome..." onChange={e => setNome(e.target.value)} />
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
                        <input id="sobrenome" minLength="3" maxLength="30" required placeholder="Digite seu sobrenome..." onChange={e => setSobrenome(e.target.value)} />
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
                        <input id="telefone" minLength="11" maxLength="11" required placeholder="(xx)x xxxx-xxxx" onChange={e => setTelefone(e.target.value)} />
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
                        <input minLength="11" maxLength="11" id="cpf" required placeholder="000.000.000-00" onChange={e => setCPF(e.target.value)} />
                    </li>

                    <li>
                        <strong>Email</strong>
                        <input minLength="7" maxLength="65" id="email" required type="email" placeholder="digite seu email..." onChange={e => setEmail(e.target.value)} />
                    </li>
                    <li>
                        <strong>Data de Nascimento</strong>
                        <input id="dataNascimento" type="date" max="2001-00-00" required onChange={e => setdataNascimento(e.target.value)} />
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
                        <input id="senha" minLength="7" maxLength="15" required placeholder="digite uma senha..." type="password" onChange={e => setSenha(e.target.value)} />
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
                        <input id="confirmarSenha" minLength="7" maxLength="15" required placeholder="confirme sua senha..." type="password" onChange={e => setConfirmarSenha(e.target.value)} />
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
                            <input id="estado" disabled={true} placeholder="ex:São Paulo" />
                        </li>

                        <li>
                            <strong>Cidade</strong>
                            <input id="cidade" disabled={true} placeholder="ex:São Bernado do Campo" />
                        </li>

                        <li>
                            <strong>Rua</strong>
                            <input id="rua" disabled={true} placeholder="ex:Rua Gabriel Garcia" />
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
                            <input id="cep" minLength="8" maxLength="9" required placeholder="00000-000" onChange={e => setCEP(e.target.value)} />
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
                            <input id="complemento" minLength="3" maxLength="20" required placeholder="Apto/Casa/Logradouro" onChange={e => setComplemento(e.target.value)} />
                        </li>

                        <li>
                            <strong>Ponto de Referência</strong>
                            <textarea id="pontoReferencia" placeholder="ex: ao lado do posto de gasolina" maxLength={90} wrap={true} required onChange={e => setPontoReferencia(e.target.value)} />
                        </li>

                    </ul>
                </div>
                <h4>Para cadastrar-se como consumidor clique no botão abaixo</h4>

                <button type="submit" onClick={()=>enviarRequisicaoPost(1)} className="buttonC" id="buttonC">Finalizar cadastro como consumidor</button>

            </form>

            <div className="container-entregador">
                <h3>Deseja ser um entregador?</h3>

                <h4>Entenda os benefícios de ser entregador</h4>

                <p>Ao se tornar um entregador além de conhecer as pessoas que moram proximas,
                você irá ajudar aqueles que necessitam e ainda sim será remunerado por desempenhar essas tarefas.</p>

                <img src={MenCar} className="mencar" alt="Imagem de Homem com carrinho" />

                <h4>Quer fazer parte dessa missão?</h4>

                <button className="buttonE" id="buttonE" onClick={mostrarExtensaoCadastro}>Quero ser entregador</button>

                <div id="extensaoCadastro">
                    <ExtensaoCadastro parentCallback={callbackChildFunction} />

                </div>
            </div>
        </div>
    )
}