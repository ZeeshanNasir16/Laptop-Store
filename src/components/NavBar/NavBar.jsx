import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { withStyles, IconButton, Badge } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import styles from './navBarStyles';

function NavBar(props) {
   const { classes } = props;

   const total_items = useSelector((state) => state.cart.totalItems);
   return (
      <div className={classes.root}>
         <Link to='/'>
            <div className={classes.prilogo} />
         </Link>

         <IconButton aria-label='Show Cart Items'>
            <Link to='/cart' className={classes.cart}>
               <Badge badgeContent={`${total_items}`}>
                  <ShoppingCart />
               </Badge>
            </Link>
         </IconButton>
      </div>
   );
}

export default withStyles(styles)(React.memo(NavBar));
