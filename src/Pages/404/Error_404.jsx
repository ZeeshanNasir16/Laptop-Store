import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './errorStyles.jsx';

function Error_404(props) {
   const { classes } = props;
   return <div className={classes.root} />;
}

export default withStyles(styles)(Error_404);
