import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
   Typography,
   List,
   ListItem,
   ListItemText,
   Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   reviewContainer: {
      marginBottom: theme.spacing(3),
   },
   listItem: {
      padding: theme.spacing(1, 0),
   },
   total: {
      fontWeight: 700,
   },
   title: {
      marginTop: theme.spacing(2),
   },
}));

export default function Review({ checkoutToken }) {
   const classes = useStyles();
   return (
      <div className={classes.reviewContainer}>
         <Typography variant='h6' gutterBottom align='center'>
            Order summary
         </Typography>
         <List disablePadding>
            {checkoutToken.live.line_items.map((product) => (
               <ListItem
                  className={classes.listItem}
                  key={product.name}
               >
                  <ListItemText
                     primary={product.name}
                     secondary={`Quantity : ${product.quantity}`}
                  />
                  <Typography variant='body2'>
                     {product.line_total.formatted_with_symbol}
                  </Typography>
               </ListItem>
            ))}

            <Divider />
            <ListItem className={classes.listItem}>
               <ListItemText primary='Total' />
               <Typography
                  variant='subtitle1'
                  className={classes.total}
               >
                  {checkoutToken.live.subtotal.formatted_with_symbol}
               </Typography>
            </ListItem>
         </List>
         <Divider />
      </div>
   );
}
