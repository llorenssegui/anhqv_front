import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import Menu from './components/Bottom/Menu.js';
import ClipForm from './components/Clips/ClipForm.js';
import FloatingActionButton from './components/FloatingActionButtons/FloatingActionButton.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { orange, red } from '@material-ui/core/colors';
import createHistory from 'history/createBrowserHistory';
import MySnackbar from './components/Snackbar/MySnackbar.js';

const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: orange,
        error: red
    },
    typography: {
        fontFamily: 'Architects Daughter',
    },
});

const SUCCESS_CLIP_FORM_MESSAGE = "Clip creado correctamente! Una vez validado se publicará en el portal.";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuSection: 0,
            showClipForm: false
        };
        this.history = createHistory();
    }

    componentWillMount = () => {
        if(this.history.location.pathname.indexOf("busqueda") !== -1) {
            this.setState({menuSection: 1});
        }
    }

    onChangeMenuSection = (value) => {
        this.setState({menuSection: value});
        if(value === 0) {
            this.history.push("/personajes");
        } else if(value === 1) {
            this.history.push("/busqueda");
        }
        location.reload();
    };

    deployClip = () => {
        this.setState({showClipForm: true});
    };

    unshowClipForm = () => {
        this.setState({showClipForm: false});
    };

    onSubmitClipForm = () => {
        this.setState({ isFormSucces: true });
        setTimeout(function(){ this.setState({ isFormSucces: false }); }, 3000);
        this.unshowClipForm();
    };

    onCloseSnackbar = () => {
        this.setState({ isFormSucces: false });
    };

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <Header></Header>
                <Main></Main>
                <Menu onChange={this.onChangeMenuSection} menuSection={this.state.menuSection}></Menu>
                <FloatingActionButton onClickButton={this.deployClip}></FloatingActionButton>
                <ClipForm   
                    open={this.state.showClipForm}
                    handleClose={this.unshowClipForm}
                    onSubmit={this.onSubmitClipForm}
                />  
                <MySnackbar 
                    open={this.state.isFormSucces} 
                    text={SUCCESS_CLIP_FORM_MESSAGE}
                    onClose={this.onCloseSnackbar}
                />  
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

module.hot.accept();
