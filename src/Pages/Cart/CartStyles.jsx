import sizes from '../../components/sizes';
import empCart from '../../empty-cart.png';

const appColor = '#f12a43';

const styles = {
   shoppingCart: {
      width: 750,
      height: 'auto',
      margin: '5em auto',
      background: '#a2a2a20d',
      boxShadow: '1px 2px 3px 0px rgba(0,0,0,0.10)',
      borderRadius: '0.5em',
      display: 'flex',
      flexDirection: 'column',
      [sizes.down('xs')]: {
         width: '100%',
      },
      [sizes.down('sm')]: {
         width: '100%',
         heigth: 'auto',
         overflow: 'hidden',
      },
   },

   cartBtn: {
      // ? Move button styles to constants
      padding: '5px 15px',
      fontSize: 14,
      color: 'white',
      backgroundColor: appColor,
      borderRadius: 10,
      margin: '0 10px',

      '& a': {
         textDecoration: 'none',
         color: 'white',
      },

      '&:hover': {
         backgroundColor: appColor,
      },
   },
   cartBtnContainer: {
      marginTop: '3rem',
      marginBottom: '2rem',
      textAlign: 'center',
   },

   // ? Empty Cart styles
   empContainer: {
      width: '90%',
      margin: 'auto',
      display: 'flex',
      minHeight: '82vh',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
   },
   empBg: {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${empCart})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
   },

   totalPrice: {
      textAlign: 'right',
      padding: 10,
      marginRight: 15,
      color: '#43484D',
      fontSize: '1.3em',
      fontWeight: '600',
      fontFamily: 'Microsoft Sans Serif',
   },
};

export default styles;
