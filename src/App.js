import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap.css';


// Containers
import Homepage from './views/Homepage';


export default class App extends Component {

    render() {
        return (<>
            <HashRouter>
                <Switch>
                    <Route path="/" name="Homepage" component={Homepage} />
                </Switch>
            </HashRouter>
        </>
        );
    }

};
