import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Body from '../Body/Body.js';
import CharacterClips from '../CharacterClips/CharacterClips.js';
import Search from '../Search/Search.js';
import NotFound from '../NotFound/NotFound.js';
import ClipPlayer from '../ClipPlayer/ClipPlayer.js';

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                  <Route exact path='/' component={Body} />
                  <Route exact path='/personajes' component={Body} />
                  <Route exact path='/personajes/:characterId/clips' component={CharacterClips} />
                  <Route exact path='/clips/:clipId' component={ClipPlayer} />
                  <Route exact path='/busqueda' component={Search} />
                  <Route exact path='/error' component={NotFound}/> 
                  <Route component={NotFound}/> 
               </Switch>
            </BrowserRouter>
        );
    }
}

export default Main;