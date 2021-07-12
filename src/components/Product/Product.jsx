import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import useStyles from './productStyles';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../../store/actions/cartActions';

const Product = (props) => {
   const classes = useStyles();
   const dispatch = useDispatch();

   const { pId, pName, pPrice, pDesc, pAssets, pCategories } = props;

   // ? Extract data from <p> tag, as data comes in such format
   let temp = pDesc.match(/<p>(.*?)<\/p>/g).map(function (val) {
      return val.replace(/<\/?p>/g, '');
   });

   // ? Based on extracted info, make sure to remove extra tags
   const newDesc = temp.map((t) => t.replace(/<[^>]*>/g, ''));

   // ?  Convert info to array on basis of type of info
   const getSpecificDesc = newDesc.map((ele) => ele.split(':'));
   //console.log(getSpecificDesc);

   // ? Add To cart
   const handleAddToCart = () => {
      //   onAddToCart(pId, 1);
      //   if (cart.total_items !== 0) {
      //      const itemExists = cart.line_items.find(
      //         (item) => item.product_id === pId
      //      );
      //  console.log(itemExists);
      //   }

      dispatch(addToCart(pId));
   };

   const desc = getSpecificDesc.filter((ele) => {
      return (
         ele[0].toLowerCase() === 'processor' ||
         ele[0].toLowerCase() === 'ram' ||
         ele[0].toLowerCase() === 'hdd'
      );
   });

   //    const newDesc = pDesc.match(/(<p[^>]+?>|<p>|<\/p>)/gim);
   return (
      <>
         <Card className={classes.productBox}>
            <CardMedia
               className={classes.productThumb}
               component='img'
               alt={pAssets[0].filename}
               //    height='250'
               // image='https://i.dell.com/is/image/DellContent//content/dam/global-asset-library/Products/Notebooks/XPS/15_7590_non-touch/xp7590nt_cnb_00055lf110_gy.psd?fmt=pjpg&pscan=auto&scl=1&hei=402&wid=665&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0&size=665,402'
               image={pAssets[0].url}
               title={pName}
            />

            <span className={`${classes.productButtons}`}>
               <VisibilityIcon />
            </span>

            <CardContent className={classes.productInfo}>
               <div className={` ${classes.prodCategory}`}>
                  <div
                     className={classes.actionlink}
                     style={{ textTransform: 'uppercase' }}
                  >
                     {pCategories.map((cat) => {
                        return `${cat.name} `;
                     })}
                  </div>
               </div>

               <div
                  className={`${classes.actionlink} ${classes.productTitle}`}
               >
                  {pName}
               </div>

               <div
                  className={` ${classes.productDesc}`}
                  //    dangerouslySetInnerHTML={{ __html: pDesc }}
               >
                  {desc.map((ele, i) => {
                     return (
                        <div
                           style={{ marginBottom: '10px' }}
                           key={ele[1]}
                        >
                           {ele[1]}
                           {i < desc.length - 1 && <br />}
                        </div>
                     );
                  })}
               </div>
               <div className={classes.productPrice}>{pPrice}</div>

               <div
                  className={`${classes.cartButton}`}
                  onClick={handleAddToCart}
               >
                  <AddShoppingCart />
               </div>
            </CardContent>
         </Card>
      </>
   );
};

export default Product;
