import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/login';
import Principal from '../pages/principal'
import Registro from '../pages/registro'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/principal" component={Principal}/>
                <Route exact path="/registro" component={Registro}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;