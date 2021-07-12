import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './footerStyles';

function Footer(props) {
   const { classes } = props;
   return (
      <div className={classes.root}>
         <span className={classes.footerRem}>
            &copy; Zeeshan Nasir | {new Date().getFullYear()}
         </span>
      </div>
   );
}

export default withStyles(styles)(Footer);
