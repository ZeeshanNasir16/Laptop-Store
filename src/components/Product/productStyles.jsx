import { makeStyles } from '@material-ui/core/styles';

const appColor = '#f12a43';

export default makeStyles(() => ({
   productBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #e6e6e6',
      padding: '1rem 0.5rem',
      fontWeight: '500',
      backgroundColor: 'white',
      position: 'relative',
      marginBottom: 30,
      height: '100%',
      cursor: 'pointer',
      userSelect: 'none',
      transition: '0.5s ease-in',
      '&:hover': {
         boxShadow: `0px 3px 7px ${appColor}`,
      },
   },
   productThumb: {
      position: 'relative',
      overflow: 'hidden',
      objectFit: 'contain',
      height: '110px',
      '& img': {
         width: '100%',
         verticalAlign: 'middle',
      },
   },

   productButtons: {
      position: 'absolute',
      zIndex: 2,
      top: 0,
      right: 0,
      padding: '0.5rem',
      borderBottomLeftRadius: 23,
      backgroundColor: appColor,
      color: 'white',
      opacity: '0.6',
      '&:hover': {
         backgroundColor: appColor,
         padding: '0.6rem',
         cursor: 'pointer',
         opacity: '1',
      },
   },
   productInfo: {
      paddingTop: '2rem',
      width: '100%',
   },
   prodCategory: {
      color: '#aaaaaa',
      display: 'inline-block',
      width: '100%',
      margin: '0px 0 15px',
      fontSize: 15,
      fontWeight: '400',
      letterSpacing: '1px',
      textTransform: 'uppercase',
   },
   productTitle: {
      fontSize: 'inherit',
      fontWeight: 800,
      minHeight: 25,
      textTransform: 'uppercase',
      marginBottom: '15px',
   },
   productDesc: {
      fontSize: '15',
      fontWeight: 400,
   },

   productPrice: {
      fontWeight: 'bold',
      color: appColor,
      fontSize: '1.2rem',
      fontFamily: 'system-ui',
      position: 'absolute',
      bottom: '1.5rem',
   },
   cartButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 0,
      height: 42,
      width: 42,
      borderRadius: '50%',
      background: '#eeeeee',
      color: '#888888',
      float: 'right',
      textAlign: 'center',
      lineHeight: 44,
      bottom: '1rem',
      right: '1rem',
      position: 'absolute',

      '&:hover': {
         color: 'white',
         backgroundColor: appColor,
         cursor: 'pointer',
      },
   },
   actionlink: {
      cursor: 'pointer',
      '&:hover': {
         color: appColor,
      },
   },
}));
