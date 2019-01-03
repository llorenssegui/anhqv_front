import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import Menu from './components/Bottom/Menu.js';
import ClipForm from './components/Clips/ClipForm.js';
import FloatingActionButton from './components/FloatingActionButtons/FloatingActionButton.js';
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
            showClipForm: false
        };
    }

    onChangeMenuSection = (value) => {
        this.setState({menuSection: value});
    };

    deployClip = () => {
        this.setState({showClipForm: true});
    };

    unshowClipForm = () => {
        this.setState({showClipForm: false});
    };

    submitForm = () => {

    };

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <Header></Header>
                <Main></Main>
                <Menu onChange={this.onChangeMenuSection}></Menu>
                <FloatingActionButton onClickButton={this.deployClip}></FloatingActionButton>
                <ClipForm   
                    open={this.state.showClipForm}
                    handleClose={this.unshowClipForm}
                    submitForm={this.submitForm}>
                </ClipForm>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

module.hot.accept();
