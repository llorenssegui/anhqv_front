import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import ReCAPTCHA from "react-google-recaptcha";
import CircularProgress from '@material-ui/core/CircularProgress';

const TEST_SITE_KEY = process.env.RECAPTCHA_SITE_KEY || "";
const DELAY = 1500;

class Recaptcha extends React.Component {

  constructor(props) {
      super(props);
      this._reCaptchaRef = React.createRef();
      this.state = {
        callback: "not fired",
        value: "[empty]",
        load: false,
        expired: "false"
      };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ load: true });
    }, DELAY);
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleRecaptchaChange = value => {
    this.setState({ value: value });
    if (value === null) { 
      this.setState({ expired: "true" });
      return;
    }
    this.props.onSubmit();
  };

  asyncScriptOnLoad = () => {
    this.setState({ callback: "called!" });
  };

  render () {
    return (
        <div>
          <Dialog
            open={this.props.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
                {this.state.load === true &&
                <ReCAPTCHA
                    theme="dark"
                    size="compact"
                    ref={this._reCaptchaRef}
                    sitekey={TEST_SITE_KEY}
                    onChange={this.handleRecaptchaChange}
                    asyncScriptOnLoad={this.asyncScriptOnLoad}
                />
                }
                {this.state.load === false &&
                  <CircularProgress />
                }
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
  };
  
}

Recaptcha.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(Recaptcha);