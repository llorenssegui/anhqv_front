import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
    textAlign: 'center',
  },
  media: {
    height: 140,
    width: 325,
    textAlign: 'center',
  },
};

class Character extends React.Component {

    onClickCharacter = () => {
        this.props.onClickCharacter(this.props.character.id);
    };

    render() {
        const { classes } = this.props;
        return (
            <Card 
            className={classes.card}
            onClick={this.onClickCharacter}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={this.props.character.url_picture}
                    title={this.props.character.name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.character.name}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

Character.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Character);