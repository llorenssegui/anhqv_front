import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header.js';
import Body from './components/Body/Body.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: orange,
    },
});

class App extends React.Component {
    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <Header></Header>
                <Body></Body>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

module.hot.accept();
