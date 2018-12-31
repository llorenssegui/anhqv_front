import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Body from '../Body/Body.js';

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                  <Route path='/personajes' component={Body} />
                  <Route path="*" component={Body}/> 
               </Switch>
            </BrowserRouter>
        );
    }
}

export default Main;