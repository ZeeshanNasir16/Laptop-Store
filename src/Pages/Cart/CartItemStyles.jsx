import sizes from '../../components/sizes';

const appColor = '#f12a43';

const styles = {
   item: {
      padding: '1.25em 1.75em',
      height: '9em',
      display: 'flex',

      '&:nth-child(3)': {
         borderTop: '1px solid #E1E8EE',
         borderBottom: '1px solid #E1E8EE',
      },

      [sizes.down('sm')]: {
         height: 'auto',
         flexWrap: 'wrap',
         justifyContent: 'end',
      },

      [sizes.down('xs')]: {
         justifyContent: 'center',
      },
   },
   buttons: {
      width: '5%',
      position: 'relative',
      paddingTop: '2.5em',
      cursor: 'pointer',

      '& svg': {
         color: '#737272',

         '&:hover': {
            color: appColor,
         },
      },
      [sizes.down('xs')]: {
         margin: '0 10px',
         padding: 10,
         width: 'auto',
      },
   },

   image: {
      width: '25%',
      textAlign: 'center',
      '& img': {
         width: '130px',
      },
      [sizes.down('sm')]: {
         width: '39%',
         '& img': {
            width: '60%',
         },
      },
      [sizes.down('xs')]: {
         width: '100%',
         textAlign: 'center',
         margin: '6px 0',
         '& img': {
            width: '50%',
         },
      },
   },
   description: {
      padding: '10px 10px 0',
      width: '40%',

      '& span': {
         display: 'block',
         fontSize: '1em',
         color: '#43484D',
         fontWeight: 400,
      },

      [sizes.down('sm')]: {
         width: '52%',
         margin: '6px 0',
      },

      [sizes.down('xs')]: {
         width: '100%',
         textAlign: 'center',
         margin: '6px 0',
      },
   },

   quantity: {
      paddingTop: 35,
      width: '15%',

      '& button': {
         cursor: 'pointer',
      },

      [sizes.down('sm')]: {
         width: '50%',
         margin: '10px 0',
         textAlign: 'center',
      },

      [sizes.down('xs')]: {
         width: '100%',
         textAlign: 'center',
         margin: '6px 0',
      },
   },

   totalPrice: {
      width: '15%',
      paddingTop: 35,
      fontSize: '1.4em',
      color: '#43484D',
      fontWeight: 600,
      textAlign: 'right',
      fontFamily: 'Microsoft Sans Serif',

      [sizes.down('sm')]: {
         width: '50%',
         margin: '10px 0',
         textAlign: 'center',
      },
   },

   quantityBtn: {
      color: 'white',
      backgroundColor: appColor,
      border: 'none',
      padding: '1px 3px',
      borderRadius: 20,

      '& svg': {
         marginTop: '2px',
      },

      '&:hover': {
         opacity: '0.9',
         cursor: 'pointer',
      },
   },

   quantityNo: {
      padding: '0 9px',
      fontSize: 20,
   },
};

export default styles;
