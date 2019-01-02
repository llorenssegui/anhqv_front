import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import Menu from './components/Bottom/Menu.js';
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
        this.state = {
            menuSection: 0,
        }
    }

    onChangeMenuSection = (value) => {
        this.setState({menuSection: value});
    };

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <Header></Header>
                <Main></Main>
                <Menu onChange={this.onChangeMenuSection}></Menu>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

module.hot.accept();
