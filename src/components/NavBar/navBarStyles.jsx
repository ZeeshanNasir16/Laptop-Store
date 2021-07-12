const styles = {
   root: {
      width: '100%',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.4)',
      padding: '5px 15px',
   },

   prilogo: {
      width: '100px',
      height: '65px',
      //   backgroundImage: `url(${logo})`,
      backgroundImage: `url('https://i.ibb.co/kgwtKvb/newBold.png')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      cursor: 'pointer',
   },

   cart: {
      color: '#333e48',
      '&:hover': {
         color: '#f12a43bf',
         cursor: 'pointer',
      },

      '& .MuiBadge-badge': {
         color: 'white',
         backgroundColor: '#f12a43',
      },
   },
};

export default styles;
