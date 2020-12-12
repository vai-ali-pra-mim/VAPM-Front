import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Cadastro from './pages/cadastro';
import Consumidor from './pages/dashConsumidor';
import Entregador from './pages/dashEntregador';
import Login from './pages/login';

export default function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/cadastro" component={Cadastro} />

                <Route path="/consumidor" >

                    {sessionStorage.getItem('usuario')
                        ?
                        JSON.parse(sessionStorage.getItem('usuario')).data.ehConsumidor == 1
                            ? <Consumidor />
                            : <Redirect to="/entregador" />
                        : <Redirect to="/login" />
                    }

                </Route>

                <Route path="/entregador">

                    {sessionStorage.getItem('usuario')
                        ?
                        JSON.parse(sessionStorage.getItem('usuario')).data.ehConsumidor == 0
                            ? <Entregador />
                            : <Redirect to="/consumidor" />

                        : <Redirect to="/login" />
                    }
                </Route>

                <Route path="/" component={Login} />

            </Switch>
        </BrowserRouter>
    )
}