import { makeStyles } from '@material-ui/core/styles';

const appColor = '#f12a43';

const styles = makeStyles((theme) => ({
   layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
         width: 600,
         marginLeft: 'auto',
         marginRight: 'auto',
      },
   },
   paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
         marginTop: theme.spacing(6),
         marginBottom: theme.spacing(6),
         padding: theme.spacing(3),
      },
   },
   stepper: {
      padding: theme.spacing(3, 0, 5),
      '& .MuiStepIcon-active, .MuiStepIcon-completed': {
         color: appColor,
      },
   },
   divider: {
      margin: '20px 0',
   },
   spinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
}));

export default styles;
