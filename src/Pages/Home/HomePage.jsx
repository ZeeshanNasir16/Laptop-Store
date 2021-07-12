import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles, Grid } from '@material-ui/core';
import styles from './homePageStyles.jsx';
import { Redirect } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Product from '../../components/Product/Product';

const Home = (props) => {
   const { classes } = props;
   let error = false;
   const getProducts = useSelector((state) => state.products);
   const { loading } = getProducts;

   if (getProducts.error) {
      error = true;
   }

   if (loading)
      return (
         <div className={classes.root}>
            <Loading />;
         </div>
      );
   else if (error) return <Redirect to='/404' />;
   else {
      const { products } = getProducts;
      return (
         <div className={classes.root}>
            <h2>Laptops</h2>

            <div style={{ width: '90%', margin: 'auto' }}>
               <Grid container spacing={2}>
                  {products.map((p) => (
                     <Grid
                        item
                        key={p.id}
                        xs={12}
                        sm={4}
                        md={3}
                        lg={3}
                     >
                        <Product
                           pId={p.id}
                           pName={p.name}
                           pPrice={p.price.formatted_with_symbol}
                           pCategories={p.categories}
                           pAssets={p.assets}
                           pDesc={p.description}
                        />
                     </Grid>
                  ))}
               </Grid>
            </div>
         </div>
      );
   }
};

export default withStyles(styles)(Home);
