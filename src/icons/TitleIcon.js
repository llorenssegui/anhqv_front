import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

class TitleIcon extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <IconButton aria-label="Delete">
                <SvgIcon>
                <path fill="#000000" d="M5,4V7H10.5V19H13.5V7H19V4H5Z" />
                </SvgIcon>
            </IconButton>
        );
    };

}

export default TitleIcon;