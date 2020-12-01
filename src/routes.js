import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cadastro from './pages/cadastro';
import Consumidor from './pages/dashConsumidor';
import Entregador from './pages/dashEntregador';
import Login from './pages/login';


export default function Routes() {
    return(
        <BrowserRouter>
        <Switch>
        <Route path="/" exact>
            <h1>Espaço reservado ao nosso site institucional</h1>
        </Route>
            <Route path="/cadastro"component={Cadastro} />
            <Route path="/consumidor"  component={Consumidor} />
            <Route path="/entregador"  component={Entregador} />
            <Route path="/login"  component={Login} />
        </Switch>
        </BrowserRouter>
    )
}