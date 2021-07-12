const styles = {
   root: {
      width: '100%',
      height: '7vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 1)',
      padding: '5px 15px',
      bottom: '0',
      userSelect: 'none',
      backgroundColor: '#f5f5f5',
   },
   footerLogo: {
      width: '100px',
      height: '65px',
      //   backgroundImage: `url(${logo})`,
      backgroundImage: `url('https://i.ibb.co/kgwtKvb/newBold.png')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      cursor: 'pointer',
   },
   footerRem: {
      fontFamily: 'Archivo,sans-serif',
      fontSize: '0.9rem',
      fontWeight: '600',
   },
};

export default styles;
