import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom'; 
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: orange,
    },
});

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <Header></Header>
                <Main></Main>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

module.hot.accept();
